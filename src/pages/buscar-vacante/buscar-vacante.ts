import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { UbicationsPage } from '../ubications/ubications';

import { ListadoVacantesPage } from './../listado-vacantes/listado-vacantes';

/**
 * Generated class for the BuscarVacantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar-vacante',
  templateUrl: 'buscar-vacante.html',
})
export class BuscarVacantePage {

  empresaList: any = [];
  filteredEmpresas: any = [];
  isFiltered: boolean

  buscarTipo: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: Http
  ) {
    this.isFiltered = false;
    this.http.get('assets/data/empresas.json')
    .map(res => res.json())
    .subscribe(data => {
        this.empresaList = data.empresas;
      },
      err => console.log("error is "+err), // error
      () => console.log('read company data Complete '+ this.empresaList) // complete
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarVacantePage');
  }

  buscarMaps(event) {
    if(event.target.value.length > 0) {
      var filteredJson = this.empresaList.filter(function (row) {
        if(row.nombre.indexOf(event.target.value) != -1 || row.nombre.indexOf(event.target.value) == '') {
          console.log('true')
          return true
        } else {
          console.log('false')
          return false;
        }
      });

      console.log(filteredJson);

      this.isFiltered = true;
      this.filteredEmpresas = filteredJson;
    } else {
      console.log('menor a 2')
      this.filteredEmpresas = this.empresaList;
    }
  }

  buscarLista(event, empresa) {
    // console.log(event, empresa)
    this.navCtrl.push(ListadoVacantesPage, { empresa: empresa })
    // this.navCtrl.push(MuseumDetailPage, {
    //   empresa: empresa
    // });
  }

  allUbicationsMap(){
    this.navCtrl.push(UbicationsPage, {
       empresaList: this.empresaList
    });
  }

}
