import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { UsuarioPage } from '../usuario/usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AngularFireAuth } from "angularfire2/auth";
/**
 * Generated class for the ListadoUsuariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listado-usuarios',
  templateUrl: 'listado-usuarios.html',
})
export class ListadoUsuariosPage {

  usuarios: any = [];

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public utils: UtilsProvider,
    public servicioUsuario: UsuarioProvider,
    public afAuth: AngularFireAuth,
  ) {
    this.servicioUsuario.getUsuarios()
    .valueChanges()
    .subscribe((usuariosFB) => {
      this.usuarios = usuariosFB;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoUsuariosPage');
  }

  vistaUsuario(usuario) {
    console.log(usuario)
    if (!usuario) {
      usuario = {}
    }
    this.navCtrl.push(UsuarioPage, { usuario: usuario });
  }

  eliminarUsuario(usuario) {
    console.log('eliminarUsuario');
    this.alertCtrl.create({
      title: 'Borrar registro',
      // subTitle: 'Subtitle',
      message: '¿Seguro que desea borrar el usuario ' + usuario.nombre + '?',
      buttons: [{
        text: 'No',
        role: 'Cancel',
        handler: () => { }
      }, {
        text: 'Si',
        handler: () => {
          this.servicioUsuario.eliminarUsuario(usuario)
          .then(()=>{
            let afUsuario = this.afAuth.auth.currentUser;
            afUsuario.delete().then(() => {
              this.utils.showToast('Usuario borrado exitosamente!')
            }, (error) => {
              console.log(error)
            });
          });
        }
      }]
    }).present();
  }

}
