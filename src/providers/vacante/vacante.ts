import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from '@angular/core';

/*
  Generated class for the VacanteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VacanteProvider {

  constructor(public afBD: AngularFireDatabase) {
    console.log('Hello VacanteProvider Provider');
  }

  public getVacantes() {
    return this.afBD.list('/vacantes');
  }

  public getVacante(id) {
    return this.afBD.object('/vacantes/' + id);
  }

  public getVacanteFromFieldValue(field, value) {
    return this.afBD.list('vacantes', (records) =>
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

  public createOrUpdateVacante(vacante) {
    return this.afBD.database.ref('/vacantes/' + vacante.id).set(vacante);
  }

  public eliminarVacante(vacante) {
    return this.afBD.database.ref('/vacantes/'+ vacante.id).remove();
  }

}
