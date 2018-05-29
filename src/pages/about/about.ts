import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from "../login/login";

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

  constructor(
  	private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public app: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  ConfirmAlert() {
    let confirmAlert = this.alertCtrl.create({
      title: 'Cerrar Sesion',
      // subTitle: 'Subtitle',
      message: 'Estas seguro que deseas salir?',
      buttons: [{
        text: 'No',
        role: 'Cancel',
        handler: () => {
          // console.log('No puedo, estoy ocupado!');
        }
      }, {
        text: 'Si',
        handler: () => {
          this.logout();
          // console.log('Si puedo, a que horas?');
        }
      }]
    })
    confirmAlert.present();
  }

  logout() {
    console.log('logout');
    // this.storage.clear();
    this.afAuth.auth.signOut();
    this.navCtrl.popToRoot();
    this.app.getRootNav().setRoot(LoginPage);
    // this.navCtrl.setRoot('LoginPage')
    // // this.navigateTo('LoginPage');
  }

}
