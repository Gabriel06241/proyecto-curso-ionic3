import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { VacanteProvider } from './../../providers/vacante/vacante';
import { UtilsProvider } from '../../providers/utils/utils';

import { storage } from "firebase";
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the VacantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vacante',
  templateUrl: 'vacante.html',
})
export class VacantePage {

  empresasList: any = [];
  vacante: any = {};
  base64Image: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: Http,
    private camera: Camera,
    private servicioVacante: VacanteProvider,
    private utils: UtilsProvider
  ) {

    this.vacante = this.navParams.data.vacante;

    if(this.vacante.base64Image) {
      this.base64Image = this.vacante.base64Image;
    }

    // if(this.vacante.id)
    this.http.get('assets/data/empresas.json')
    .map(res => res.json())
    .subscribe(data => {
        this.empresasList = data.empresas;
      },
      err => console.log('error -> ', err),
      () => console.log('data -> ', this.empresasList)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VacantePage');
  }

  selectEmpresa(event, empresa) {
    this.vacante.direccion = empresa.direccion;
    this.vacante.latitude = empresa.latitude;
    this.vacante.longitude = empresa.longitude;
  }

  async createOrUpdateVacante(vacante) {
    console.log(vacante)
    if (!vacante.id) {
      await this.servicioVacante.getVacanteFromFieldValue('codigo', vacante.codigo)
      .then((response) => {
        if (response.length) {
          return this.utils.showAlert("Error vacante registrada","La vacante con codigo " + vacante.codigo + " ya se encuentra registrado!");
        }
      // }, (err) => {
      //   console.log(err)
      }).catch((err) => {
        console.log(err)
      });

      try {
        vacante.base64Image = (vacante.base64Image) ? vacante.base64Image : this.base64Image;
        vacante.id = Date.now();
        this.servicioVacante.createOrUpdateVacante(vacante);
        this.navCtrl.pop()
      } catch (error) {
        console.log('error', error.message);
        this.utils.showToast(error.message);
      }
    }else {
      vacante.base64Image = (vacante.base64Image) ? vacante.base64Image : this.base64Image;
      console.log('Vacante Updated');
      this.servicioVacante.createOrUpdateVacante(vacante);
      this.utils.showToast('Vacante actualizado exitosamente!');
      this.navCtrl.pop();
    }
  }

  async takePhoto() {
    try {
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }
      
      const result = await this.camera.getPicture(options);

      console.log('result', result)

      const image = `data:image/jpeg;base64,${result}`;
      this.base64Image = image;

      console.log('image', image)

      const pictures = storage().ref(`${Date.now()}`);

      console.log('pictures #1', pictures)

      pictures.putString(image, 'data_url');

      console.log('pictures #2', pictures)

    } catch (error) {
      console.log(error);
    }
  }

}
