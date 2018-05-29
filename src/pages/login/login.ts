import { TabsPage } from './../tabs/tabs';
import { BuscarVacantePage } from './../buscar-vacante/buscar-vacante';
import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { UsuarioProvider } from '../../providers/usuario/usuario';
// import { BarcodeQrPage } from '../barcode-qr/barcode-qr';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any = {}

  constructor(
    public afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private utils: UtilsProvider,
    public servicioUsuario: UsuarioProvider
  ) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user) {

    // console.log(this.utils.getHashMd5('admin123'))
    // 0192023a7bbd73250516f069df18b500

    // process.on('unhandledRejection', (reason, promise) => {
    //   console.log('Unhandled Rejection at:', reason.stack || reason)
    //   // Recommended: send the information to sentry.io
    //   // or whatever crash reporting service you use
    // })

    console.log(user)
    if (this.utils.validateDatosUsuario(user)) {
      this.utils.showToast("Por favor complete todos los campos.");
      return this.utils.showAlert("Error campos vacíos","Por favor complete todos los campos.");
    }

    user.active = false;
    
    try {
      await this.servicioUsuario.getUsuarioFromFieldValue('correo', user.correo)
      .then((response) => {
        if (response.length) {
          user.active = response[0].activo;
          user.profile = response[0].perfil;
        }
      }, (err) => {
        console.log('trying to get getUsuarioFromFieldValue', err)
      });
    }catch(error){
      console.log(error);
    }
    
    if(!user.profile) {
      this.utils.showToast("Correo y/o contraseña incorrectos!");
    }else if(user.active) {
      this.utils.showLoading('Por favor espere...');
      try {
        console.log(this.utils.getHashMd5(user.password));
        const result = await this.afAuth.auth.signInWithEmailAndPassword(user.correo, this.utils.getHashMd5(user.password))
        // const result = await this.afAuth.auth.signInWithEmailAndPassword(user.correo, user.password)
        if (result) {
          if (user.profile == 'Director') {
            this.navCtrl.setRoot(TabsPage);  
          } else {
            // this.navCtrl.setRoot(BarcodeQrPage);
            this.navCtrl.setRoot(BuscarVacantePage);
          }
        }else {
          console.log('result -> ', result)
        }
      } catch (error) {
        console.log('result await -> ', error)
        if(error.message) {
          this.utils.showToast(error.message);
        }
      }
    }else{
      this.utils.showToast("Usuario no se encuentra activo!");
    }
  }

}
