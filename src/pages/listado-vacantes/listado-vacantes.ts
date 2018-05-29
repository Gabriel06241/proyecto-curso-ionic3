import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UtilsProvider } from './../../providers/utils/utils';
import { VacantePage } from './../vacante/vacante';
import { UbicationPage } from './../ubication/ubication';
import { VacanteProvider } from '../../providers/vacante/vacante';
import { BarcodeQrPage } from './../barcode-qr/barcode-qr';

/**
 * Generated class for the ListadoVacantesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listado-vacantes',
  templateUrl: 'listado-vacantes.html',
})
export class ListadoVacantesPage {

  vacantes: any = [];
  empresa: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public utils: UtilsProvider,
    public servicioVacante: VacanteProvider
  ) {

    this.empresa = this.navParams.data.empresa;

    if(this.empresa) {
      console.log('empresa -> ', this.empresa.nombre);
      this.servicioVacante.getVacanteFromFieldValue('empresa', this.empresa.nombre)
      .then((response) => {
        console.log('response', response)
        this.vacantes = response
        // if (response.length) {
          
        // }
      }, (err) => {
        console.log('trying to get getUsuarioFromFieldValue', err)
      });
    }else {
      console.log('#2')
      this.servicioVacante.getVacantes()
      .valueChanges()
      .subscribe((vacantesFB) => {
        this.vacantes = vacantesFB;
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoVacantesPage');
  }

  vistaVacante(vacante) {
    if (!vacante) {
      vacante = {}
    }
    let pageRedirect = (this.empresa) ? UbicationPage : VacantePage;
    this.navCtrl.push(pageRedirect, { vacante: vacante })
  }

  eliminarVacante(vacante) {
    console.log('eliminarVacante');
    this.alertCtrl.create({
      title: 'Borrar registro',
      // subTitle: 'Subtitle',
      message: '¿Seguro que desea borrar la vacante ' + vacante.cargo + '?',
      buttons: [{
        text: 'No',
        role: 'Cancel',
        handler: () => { }
      }, {
        text: 'Si',
        handler: () => {
          this.servicioVacante.eliminarVacante(vacante)
          .then(()=>{
            this.utils.showToast('Vacante borrada exitosamente!') 
          }, (error) => {
            console.log(error)
          });
        }
      }]
    }).present();
  }

  barCode() {
    this.navCtrl.push(BarcodeQrPage, {});
  }
}
