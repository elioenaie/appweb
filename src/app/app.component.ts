import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav,ToastController } from 'ionic-angular';

import { IntroSlidesPage } from '../pages/intro-slides/intro-slides';
import { LoginPage } from '../pages/login/login';
import {LogoutPage} from  '../pages/logout/logout';
import { RegisterPage } from '../pages/register/register';
import { ForgotPassPage } from '../pages/forgot-pass/forgot-pass';
import{FavoritosPage} from '../pages/favoritos/favoritos';
import {LocalizacionPage} from '../pages/localizacion/localizacion';
import {InsumosPage} from '../pages/insumos/insumos';
import {AltainsumoPage} from '../pages/altainsumo/altainsumo';
import {ProveedorPage} from '../pages/proveedor/proveedor';
import {ProveedoraltaPage} from '../pages/proveedoralta/proveedoralta';
import {AltaTiendaPage} from '../pages/alta-tienda/alta-tienda';

import { ProductsPage } from '../pages/products/products';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { CartPage } from '../pages/cart/cart';
import { OrdersPage } from '../pages/orders/orders';
import { BillingPage } from '../pages/billing/billing';
import { AddprodPage } from '../pages/addprod/addprod';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SharedService } from '../providers/shared.service';
import { TabsPage } from '../pages/tabs/tabs';

import {AutentificacionProvider} from '../providers/autentificacion/autentificacion';
import {OperadorPage} from '../pages/operador/operador';
import {UsuarioPage} from '../pages/usuario/usuario';
//import {timer} from 'rxjs/observable/timer';
import { AngularFireAuth } from 'angularfire2/auth';
//import {RegisterPage} from '../pages/register/register';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../models/user-model';
import {SlidePage} from '../pages/slide/slide';
import {GetionuserPage} from '../pages/getionuser/getionuser';

@Component({
  templateUrl: 'app.html',
  providers: [SharedService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any,icon:string}>;
  
  //showSplash=true;
  public listares : Array<any>;
  public listares1 : Array<{name:string}>;
  tasksRef: AngularFireList<any>;
 
  user: any ;
  datasCollection: Array<Object>;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public fAuth: AngularFireAuth,
    public toast:ToastController,
    public db: AngularFireDatabase,
    public authService: AutentificacionProvider
  ) {
  

    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Productos', component: ProductsPage,icon:'archive' },
      { title: 'Insumos', component: InsumosPage,icon:'paper' },
      { title: 'Administrar insumos', component: AltainsumoPage,icon:'briefcase' },
      { title: 'Administrar producto',component:AddprodPage,icon:'beaker'},
      { title: 'Proveedores', component: ProveedorPage,icon:'people' },
      { title: 'Administrar proveedores', component: ProveedoraltaPage,icon:'contacts' },
      { title: 'Administrar Tiendas', component: AltaTiendaPage,icon:'appstore' },
      { title: 'Encontrar lugares',component:LocalizacionPage,icon:'globe'},
      { title: 'Favoritos',component:TabsPage,icon:'star'},
      { title: 'Agregar usuarios',component:RegisterPage,icon:'person-add'},
      { title: 'Información perfil',component:GetionuserPage,icon:'information-circle'},
      { title: 'Cerrar sesión',component:LogoutPage,icon:'log-out'}
    ];
  }

 
 
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      //timer(3000).subscribe(()=>this.showSplash=false)
      
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
    
  }
}
