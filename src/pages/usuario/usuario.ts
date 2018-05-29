import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  semestres: any = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  usuario: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth,
    private servicioUsuario: UsuarioProvider,
    private utils: UtilsProvider
  ) {
    console.log('contructor -> ', this.navParams.data.usuario)
    this.usuario = this.navParams.data.usuario;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioPage');
  }

  async createOrUpdateUsuario(usuario) {
    if (this.utils.validateDatosUsuario(usuario)) {
      this.utils.showToast("Por favor complete todos los campos.");
      return this.utils.showAlert("Error campos vacíos","Por favor complete todos los campos.");
    }

    console.log(usuario)

    if (!usuario.id) {
      // try {

      await this.servicioUsuario.getUsuarioFromFieldValue('cedula', usuario.cedula)
      .then((response) => {
        if (response.length) {
          return this.utils.showAlert("Error usuario registrado","El usuario con cedula " + usuario.cedula + " ya se encuentra registrado!");
        }
      });
      // }catch(err){
      //   console.log(err)
      // }

      try {
        console.log('try');
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(usuario.correo, this.utils.getHashMd5(usuario.cedula))
        // const result = await this.afAuth.auth.createUserWithEmailAndPassword(usuario.correo, usuario.cedula)
        console.log('retuls -> ', result);
        if (result) {
          usuario.id = result.uid;
          this.servicioUsuario.createOrUpdateUsuario(usuario);
          this.navCtrl.pop()
        }
      } catch (error) {
        console.log('error', error.message);
        this.utils.showToast(error.message);
      }
    }else {
      console.log('#2');
      this.servicioUsuario.createOrUpdateUsuario(usuario);
      this.utils.showToast('Usuario actualizado exitosamente!');
      this.navCtrl.pop();
      // this.navCtrl.setRoot()
    }
  }

}
