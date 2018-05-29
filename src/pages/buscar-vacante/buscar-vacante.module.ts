import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarVacantePage } from './buscar-vacante';

@NgModule({
  declarations: [
    BuscarVacantePage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarVacantePage),
  ],
})
export class BuscarVacantePageModule {}
