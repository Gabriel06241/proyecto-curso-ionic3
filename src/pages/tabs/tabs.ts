import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListadoUsuariosPage } from '../listado-usuarios/listado-usuarios';
import { ListadoVacantesPage } from '../listado-vacantes/listado-vacantes';
import { AboutPage } from './../about/about';
// import { BuscarVacantePage } from '../buscar-vacante/buscar-vacante'

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = ListadoUsuariosPage;
  tab2Root = ListadoVacantesPage;
  // tab3Root = BuscarVacantePage;
  tab3Root = AboutPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
