import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMapsAnimation, GoogleMapsEvent } from "@ionic-native/google-maps";

/**
 * Generated class for the UbicationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@Component({
  selector: 'page-ubications',
  templateUrl: 'ubications.html',
})
export class UbicationsPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  ubicationList = [];
  infoWindowList: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public geolocation: Geolocation, 
    public googleMaps: GoogleMaps,
    public http: Http
  ) {
    this.ubicationList = navParams.get('empresaList');
    console.log(this.ubicationList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbicationsPage');
    this.getPosition();
  }

  getPosition(): any {
    this.geolocation.getCurrentPosition()
    .then((geoposition) => {
      this.displayGoogleMap(geoposition);
      // this.loadMap(geoposition);
    }).catch(error => { console.log(error); });
  }

  displayGoogleMap(geoposition: Geoposition) {
    // let latLng = new google.maps.LatLng(28.6117993, 77.2194934);
    let latitude = geoposition.coords.latitude;
    let longitude = geoposition.coords.longitude;
    // let myLatLng = { lat: latitude, lng: longitude }
    let myLatLng = new google.maps.LatLng(latitude, longitude);
    console.log('#1', myLatLng);

    let mapOptions = {
      // center: latLng,
      center: myLatLng,
      disableDefaultUI: true,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }


    console.log('#2', myLatLng);
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    this.map.setCenter(myLatLng);
    this.getMarkers();
  }

  getMarkers() {
    console.log('#3')
    for (let _i = 0; _i < this.ubicationList.length; _i++) {
      if(_i > 0 ) {
        this.addMarkersToMap(this.ubicationList[_i]);
      }
    }
  }

  addMarkersToMap(ubication) {

    const marker = this.addMarker(ubication);
    // marker.setAnimation(google.maps.Animation.BOUNCE);

    marker.addListener('click', () => {
      this.closeAllInfoWindow();
      // console.log(marker)
      // console.log('-----------------')
      // console.log(this.marker)
      // let currentData = marker.data;
      // var contentString = '<div id="content"><h5 id="firstHeading" class="firstHeading">' 
      // + currentData.nombre
      // + '</h5>\n<p>'
      // + currentData.direccion
      // +'</p></div>';
      
      // let infowindow = new google.maps.InfoWindow({
      //   content: contentString,
      //   maxWidth: 200
      // });
      // infowindow.open(this.map, marker);
      marker.infowindow.open(this.map, marker);
    });
  }

  addMarker(ubication) {
    let position = { lat: ubication.latitude, lng: ubication.longitude };

    // let currentData = marker.data;
    var contentString = '<div id="content"><h5 id="firstHeading" class="firstHeading">' 
    + ubication.nombre
    + '</h5>\n<p>'
    + ubication.direccion
    +'</p></div>';
    
    let infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });
    this.infoWindowList.push(infowindow);

    return new google.maps.Marker({
      position: position,
      map: this.map,
      // data: ubication,
      infowindow: infowindow
      // snippet: "This plugin is awesome!",
      // animation: GoogleMapsAnimation.BOUNCE
    })
  }

  closeAllInfoWindow(){
    for(var i=0; i < this.infoWindowList.length; ++i) {
      this.infoWindowList[i].close();
    }
  }

}
