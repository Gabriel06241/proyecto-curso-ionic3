import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeQrPage } from './barcode-qr';

@NgModule({
  declarations: [
    BarcodeQrPage,
  ],
  imports: [
    IonicPageModule.forChild(BarcodeQrPage),
  ],
})
export class BarcodeQrPageModule {}
