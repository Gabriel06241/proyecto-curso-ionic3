import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoUsuariosPage } from './listado-usuarios';

@NgModule({
  declarations: [
    ListadoUsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoUsuariosPage),
  ],
})
export class ListadoUsuariosPageModule {}
