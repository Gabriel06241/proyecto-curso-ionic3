import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsEstudiantesPage } from './tabs-estudiantes';

@NgModule({
  declarations: [
    TabsEstudiantesPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsEstudiantesPage),
  ],
})
export class TabsEstudiantesPageModule {}
