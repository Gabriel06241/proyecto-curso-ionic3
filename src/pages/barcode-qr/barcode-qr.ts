import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner";

/**
 * Generated class for the BarcodeQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-barcode-qr',
  templateUrl: 'barcode-qr.html',
})
export class BarcodeQrPage {

  data: any = {};
  codeQR: string;
  encodeData: {};
  option: BarcodeScannerOptions;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public barcodeScanner: BarcodeScanner
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarcodeQrPage');
  }

  scanCodeQR() {
    this.option = {
      prompt: "Por favor escanear su código."
    }

    this.barcodeScanner.scan(this.option).then((barcodeData) => {
      // Lectura del codigo de barra
      console.log(barcodeData);
      this.data = barcodeData;
    })
    .catch(err => console.log('Error generating barcodeScanner ->', err))
    // , (err) => {
    //   console.log('Error generating barcodeScanner ->', err);
    // };
  }


  encodeQR() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.codeQR)
    .then((response) => {
      console.log(response);
      this.encodeData = response;
    })
    .catch(err => console.log('Error generating barcodeScanner ->', err))
    // , (err) => {
    //   console.log('Error trying to generate codeQR encode.', err)
    // });
  }

}
