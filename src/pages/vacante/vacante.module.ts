import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacantePage } from './vacante';

@NgModule({
  declarations: [
    VacantePage,
  ],
  imports: [
    IonicPageModule.forChild(VacantePage),
  ],
})
export class VacantePageModule {}
