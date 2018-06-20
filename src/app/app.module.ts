import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

 import { IntroSlidesPage } from '../pages/intro-slides/intro-slides';

import { LoginPage } from '../pages/login/login';
import {LogoutPage} from  '../pages/logout/logout';
import { RegisterPage } from '../pages/register/register';
import { ForgotPassPage } from '../pages/forgot-pass/forgot-pass';
import {OperadorPage} from '../pages/operador/operador';
import {UsuarioPage} from '../pages/usuario/usuario';
import { ProductsPage } from '../pages/products/products';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import {InsumodetallesPage} from '../pages/insumodetalles/insumodetalles'
import { CartPage } from '../pages/cart/cart';
import { OrdersPage } from '../pages/orders/orders';
import { AddprodPage } from '../pages/addprod/addprod';
import{FavoritosPage} from '../pages/favoritos/favoritos';
import {LocalizacionPage} from '../pages/localizacion/localizacion';
import {InsumosPage} from '../pages/insumos/insumos';
import {AltainsumoPage} from '../pages/altainsumo/altainsumo';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BillingPage } from '../pages/billing/billing';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
//import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireDatabase } from 'angularfire2/database';
// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AngularFireAuth } from 'angularfire2/auth';
import { ModalsPage } from '../pages/modals/modals';
import {ModalinsumoPage} from '../pages/modalinsumo/modalinsumo'; 
import {ModalproveedorPage} from '../pages/modalproveedor/modalproveedor'; 
import { ImageProvider } from '../providers/image/image';
import { PreloaderProvider } from '../providers/preloader/preloader';
import { DatabaseProvider } from '../providers/database/database';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import { IonicPageModule } from 'ionic-angular';
import {Geolocation }from '@ionic-native/geolocation';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import { InsumodatabaseProvider } from '../providers/insumodatabase/insumodatabase';
import { ProveedordatabaseProvider } from '../providers/proveedordatabase/proveedordatabase';
import {ProveedorPage} from '../pages/proveedor/proveedor';
import {ProveedordetallePage} from '../pages/proveedordetalle/proveedordetalle';
import {ProveedoraltaPage} from '../pages/proveedoralta/proveedoralta';
import {FavoprodPage} from '../pages/favoprod/favoprod';
import { TabsPage } from '../pages/tabs/tabs';
import { AutentificacionProvider } from '../providers/autentificacion/autentificacion';
import {PerfilPage} from '../pages/perfil/perfil';
import { TiendadatabaseProvider } from '../providers/tiendadatabase/tiendadatabase';
import {ModalTiendaPage} from '../pages/modal-tienda/modal-tienda';
import {AltaTiendaPage} from '../pages/alta-tienda/alta-tienda';
import { ImagetiendaProvider } from '../providers/imagetienda/imagetienda';
import {Register2Page} from '../pages/register2/register2';
import {SlidePage} from '../pages/slide/slide';
import {IonicStorageModule} from '@ionic/storage';
import { DatabaseusuariosProvider } from '../providers/databaseusuarios/databaseusuarios';
import { ImageusuariosProvider } from '../providers/imageusuarios/imageusuarios';
import {GetionuserPage} from '../pages/getionuser/getionuser';
import {ModaluserPage}from '../pages/modaluser/modaluser';
import{PopoverPage} from '../pages/popover/popover';
import {Productos2Page} from '../pages/productos2/productos2';

@NgModule({
  declarations: [
    MyApp,
    IntroSlidesPage,
    LoginPage,
    RegisterPage,
    ForgotPassPage,
    ProductsPage,
    ProductDetailsPage,
    CartPage,
    OrdersPage,
    BillingPage,
    LogoutPage,
    ModalsPage,
    AddprodPage,
    FavoritosPage,
    LocalizacionPage,
    InsumosPage,
    ModalinsumoPage,
    AltainsumoPage,
    InsumodetallesPage,
    ProveedorPage,
    ProveedordetallePage,
    ProveedoraltaPage,
    ModalproveedorPage,
    FavoritosPage,
    TabsPage,
    FavoprodPage,
    OperadorPage,
    UsuarioPage,
    PerfilPage,
    ModalTiendaPage,
    AltaTiendaPage,
    Register2Page,
    SlidePage,
    GetionuserPage,
    ModaluserPage,
    PopoverPage,
    Productos2Page
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp({       
      apiKey: "AIzaSyBTk_Nf1EOcqD1FZ0oA1P3bblW2Pd3Hfpo",
      authDomain: "appweb-fba13.firebaseapp.com",
      databaseURL: "https://appweb-fba13.firebaseio.com",
      projectId: "appweb-fba13",
      storageBucket: "appweb-fba13.appspot.com",
      messagingSenderId: "58190515274"
    }),                                       
    AngularFireDatabaseModule,                
    AngularFireAuthModule,
    IonicPageModule.forChild(ModalsPage),                     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   IntroSlidesPage,
    LoginPage,
    RegisterPage,
    ForgotPassPage,
    ProductsPage,
    ProductDetailsPage,
    CartPage,
    OrdersPage,
    BillingPage,
    LogoutPage,
    ModalsPage,
    AddprodPage,
    FavoritosPage,
    LocalizacionPage,
    InsumosPage,
    ModalinsumoPage,
    AltainsumoPage,
    InsumodetallesPage,
    ProveedorPage,
    ProveedordetallePage,
    ProveedoraltaPage,
    ModalproveedorPage,
    FavoritosPage,
    TabsPage,
    FavoprodPage,
    OperadorPage,
    UsuarioPage,
    PerfilPage,
    ModalTiendaPage,
    AltaTiendaPage,
    Register2Page,
    SlidePage,
    GetionuserPage,
    ModaluserPage,
    PopoverPage,
    Productos2Page
  ],
  providers: [
    LocationAccuracy,
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    ImageProvider,
    PreloaderProvider,
    InsumodatabaseProvider,
    ProveedordatabaseProvider,
    AngularFireDatabase,
    AutentificacionProvider,
    TiendadatabaseProvider,
    ImagetiendaProvider,
    DatabaseusuariosProvider,
    ImageusuariosProvider
  ]
})
export class AppModule {}
