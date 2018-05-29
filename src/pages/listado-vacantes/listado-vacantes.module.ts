import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoVacantesPage } from './listado-vacantes';

@NgModule({
  declarations: [
    ListadoVacantesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoVacantesPage),
  ],
})
export class ListadoVacantesPageModule {}
