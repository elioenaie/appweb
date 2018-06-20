import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ModalController ,Platform} from 'ionic-angular';
import { ProveedordetallePage } from '../proveedordetalle/proveedordetalle';
import {CartPage} from '../cart/cart';

import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';

//import {CartService} from '../../providers/cart.service';
//import {AuthService} from '../../providers/auth.service';

import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import {ProveedordatabaseProvider} from '../../providers/proveedordatabase/proveedordatabase';
import * as firebase from 'firebase';
import { ModalproveedorPage } from '../modalproveedor/modalproveedor';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ProveedorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-proveedor',
  templateUrl: 'proveedor.html',
})
export class ProveedorPage {

  itle = 'Grocery List';
  newItem: string = ''; 
  products: FirebaseListObservable<any>;

  private auth     : any;
  public movies    : any;
  private email    : string = 'enai04@gmail.com';
  private pass     : string = 'enai041294';
  public listares : Array<any>;
  public listares1 : Array<any>;
  listaprove: AngularFireList<any>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private viewCtrl: ViewController,
    //afAuth: AngularFireAuth,
   // public cartService: CartService,
    //public authService: AuthService,
private platform     : Platform,
private modalCtrl    : ModalController,
private _IMG         : ImageProvider,
private _LOADER      : PreloaderProvider,
private _DB          : ProveedordatabaseProvider) {

  this.listaprove=this.db.list('proveedor/');
  this.listaprove.snapshotChanges().subscribe(rs=>{
    this.listares=[];
    rs.forEach(f=>{
      this.listares.push({
        nombreprove:f.payload.val().nombreprove,
        image:f.payload.val().image,
        descripcion: f.payload.val().descripcion,
        metodouso: f.payload.val().metodouso,
        nombreCientifico: f.payload.val().nombreCientifico,
        pageweb:f.payload.val().pageweb
      })
    })
    this.listares.reverse();
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProveedorPage');
  }
  inicializarItems(): void{
    this.listares1= this.listares;
    
 }
 obtenerItems(ev: any){
  this.inicializarItems();
  
  let q = ev.target.value.trim();

   if(q && q.trim()!=''){
    this.listares=this.listares.filter((item)=>{
      return (item.nombreprove.toLowerCase().indexOf(q.toLowerCase())>-1);
    })
  console.log(this.listares)
   } 
}

  ionViewDidEnter()
  {
     this._LOADER.displayPreloader();
     this.platform.ready()
     .then(() =>
     {
      this.loadAndParseMovies();
     });
  }
  loadAndParseMovies()
  {
     this.movies = this._DB.renderMovies();
     this._LOADER.hidePreloader(); 
  }
  showDetails(product)  : void  {
    this.navCtrl.push(ProveedordetallePage,product);
  }

 /* addToCart(product)  : void  {
    this.cartService.addCartItem(this.authService.getLoggedUID(), product);
  }*/

  openCart() : void {
    this.navCtrl.push(CartPage);
  }

  
  getItems(event) : void{
    // TODO : search
  }

  applyCategoryFilter(event) : void{
    // TODO : filter
  }

}
