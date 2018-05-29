import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class  UsuarioProvider {

  constructor(public afBD: AngularFireDatabase) {
    console.log('Hello UsuarioProvider Provider');
  }

  public getUsuarios() {
    return this.afBD.list('/usuarios');
  }

  public getUsuario(id) {
    return this.afBD.object('/usuarios/' + id);
  }

  public getUsuarioFromFieldValue(field, value) {
    return this.afBD.list('usuarios', (records) =>
      records.orderByChild(field).equalTo(value))
      .query.once('value')
      .then(snapshot => snapshot.val())
      .then((response) => {
        let records = [];
        if (response) {
          let keys = Object.keys(response);
          keys.forEach(element => {
            response[element].key = element;
            records.push(response[element])
          });
        }
        return records;
      })
  }

  public createOrUpdateUsuario(usuario) {
    return this.afBD.database.ref('/usuarios/' + usuario.id).set(usuario);
  }

  public eliminarUsuario(usuario) {
    return this.afBD.database.ref('/usuarios/'+ usuario.id).remove();
  }

}
