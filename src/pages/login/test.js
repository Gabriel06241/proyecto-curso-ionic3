
ion-content {
    background: rgba(299, 227, 223, 0.3);
    #mapa {
      width: 100%;
      height: 100%;
    }
  }

 <div #mapa id="mapa"></div>
  <ion-item>
    <ion-input id="buscador" type="text" placeholer="Buscar"></ion-input>
  </ion-item>


import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker,
  GoogleMapsAnimation
} from "@ionic-native/google-maps";

declare var google: any

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  @ViewChild('mapa') mapRef: ElementRef;
  mapa: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    private googleMaps: GoogleMaps
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    console.log('#0', this.mapRef);
    this.getPosition();
  }

  getPosition(): any {
    this.geolocation.getCurrentPosition()
      .then((geoposition) => {
        console.log('#1', geoposition);
        this.loadMap(geoposition);
      }).catch(error => { console.log(error); });
  }

  loadMap(geoposition: Geoposition) {

    let latitude = geoposition.coords.latitude;
    let longitude = geoposition.coords.longitude;
    let myLatLng = { lat: latitude, lng: longitude }

    this.mapa = GoogleMaps.create('mapa');
    let latlng = new LatLng(latitude, longitude);

    // this.mapa.one(GoogleMapsEvent.MAP_READY)
    //   .then(() => {
    //     console.log('Ready to use!')
    //     let position: CameraPosition<LatLng> = {
    //       target: latlng,
    //       zoom: 10,
    //       tilt: 30
    //     };
    //     this. mapa.classList.add('show-map');
    //   })


    const location = new google.maps.LatLng(latitude, longitude);
    const options = {
      // center: new google.maps.LatLng(latitude, longitude),
      center: location,
      // streetViewControl: false,
      // mapTypeId: 'satelite'
      // mapTypeId: 'hybrid'
      zoom: 16,
      // mapTypeId: 'terrain'
      mapTypeId: google.maps.Map
    }
    // console.log(latitude, longitude);

    // let mapElement: HTMLElement = document.getElementById('mapa')

    const mapa = new google.maps.Map(this.mapRef.nativeElement, options);
    const marker = this.addMarker(location, mapa, 'Title');
    
    
    // const infowindow = new google.maps.InfoWindow();
    // infowindow.setContent();

    // setTimeout(() => {
    //   // mapa.setMapTypeId('satelite')
    //   // mapa.setMapTypeId('terrain')
    //   // mapa.setMapTypeId('ROADMAP')
    // }, 3000);

    // console.log('#3', location);
    // console.log('#4', mapa);

    // this.addMarker(location, mapa, 'Title');

    // google.maps.event.addListener(marker, 'click', (marker) => {
    //   return
    //   // let marker = new google.maps.Marker({
    //   //   map: this.mapa,
    //   //   title: 'Here!'
    //   // });
    //   // mapElement.classList.add('show-map');
    // });
  }

  addMarker(position, map, title) {
    return new google.maps.Marker({
      position,
      map,
      title: "Welecome to \n" +
        "Cordova GoogleMaps plugin for iOS and Android",
      snippet: "This plugin is awesome!",
      animation: GoogleMapsAnimation.BOUNCE
    })
    // .then((marker) => {
    //   marker.on(GoogleMapsEvent.MARKER_CLICK)
    //     .subscribe(() => {
    //       alert('clicked!');
    //     })
    // })
  }

  infoWindow(position, map, title) {
    return new google.maps.Marker({
      position,
      map,
      title: "Welecome to \n" +
        "Cordova GoogleMaps plugin for iOS and Android",
      snippet: "This plugin is awesome!",
      animation: 'DROP'
    })
  }

}