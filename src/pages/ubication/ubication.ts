import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the UbicationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var google;

@Component({
  selector: 'page-ubication',
  templateUrl: 'ubication.html',
})
export class UbicationPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  vacante: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public geolocation: Geolocation
  ) {
    this.vacante = this.navParams.data.vacante;
    console.log('vacante -->>', this.vacante)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbicationPage');
    this.displayGoogleMap();
  }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(this.vacante.latitude, this.vacante.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    this.addInfoWindow(marker, this.vacante.cargo + this.vacante.empresa);
  }
  
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  aplicarVacante(vacante) {
    // guardar en un nuevo key de tipo array dentro del objeto usuario el listado de vacantes aplicadas
    console.log('aplicarVacante', vacante);
    this.navCtrl.pop();
  }
}
