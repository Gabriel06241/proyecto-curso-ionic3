import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { FormsModule } from '@angular/forms';     
import { CustomFormsModule } from 'ng2-validation';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http'
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ListadoVacantesPage } from '../pages/listado-vacantes/listado-vacantes';
import { VacantePage } from "../pages/vacante/vacante";
import { ListadoUsuariosPage } from '../pages/listado-usuarios/listado-usuarios';
import { UsuarioPage } from "../pages/usuario/usuario";
import { AboutPage } from '../pages/about/about';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { VacanteProvider } from '../providers/vacante/vacante';
import { UtilsProvider } from '../providers/utils/utils';
import { BuscarVacantePage } from '../pages/buscar-vacante/buscar-vacante';
import { BarcodeQrPage } from '../pages/barcode-qr/barcode-qr';

import { FIREBASE_CONFIG } from "./firebase.credentials";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database"

import { Geolocation } from "@ionic-native/geolocation";
import { GoogleMaps } from "@ionic-native/google-maps";
import { Camera } from "@ionic-native/camera";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import { UbicationsPage } from '../pages/ubications/ubications';
import { UbicationPage } from '../pages/ubication/ubication';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    ListadoUsuariosPage,
    UsuarioPage,
    ListadoVacantesPage,
    VacantePage,
    AboutPage,
    BuscarVacantePage,
    BarcodeQrPage,
    UbicationsPage,
    UbicationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CustomFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    ListadoUsuariosPage,
    UsuarioPage,
    ListadoVacantesPage,
    VacantePage,
    AboutPage,
    BuscarVacantePage,
    BarcodeQrPage,
    UbicationsPage,
    UbicationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    VacanteProvider,
    UtilsProvider,
    Geolocation,
    GoogleMaps,
    Camera,
    BarcodeScanner
  ]
})
export class AppModule {}
