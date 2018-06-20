import { Component } from '@angular/core';

import { NavController, NavParams, ViewController,ModalController ,Platform,AlertController,ToastController} from 'ionic-angular';
import { InsumodetallesPage } from '../insumodetalles/insumodetalles';
import {CartPage} from '../cart/cart';

import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';

//import {CartService} from '../../providers/cart.service';
//import {AuthService} from '../../providers/auth.service';

import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import {InsumodatabaseProvider} from '../../providers/insumodatabase/insumodatabase';
import * as firebase from 'firebase';
import { ModalinsumoPage } from '../modalinsumo/modalinsumo';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { AngularFireList,AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {AutentificacionProvider} from '../../providers/autentificacion/autentificacion';

/**
 * Generated class for the InsumosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-insumos',
  templateUrl: 'insumos.html',
  
})
export class InsumosPage {
  itle = 'Grocery List';
  newItem: string = ''; 
  products: FirebaseListObservable<any>;

 // private auth     : any;
  public movies    : any;
  private email    : string = 'enai04@gmail.com';
  private pass     : string = 'enai041294';
  public listares : Array<any>;
  
  public listares1 : Array<any>;
  favorites: AngularFireList<any>;
  favos: Observable<any[]>;
  listainsumo: AngularFireList<any>;
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
private _DB          : InsumodatabaseProvider,
public alertCtrl: AlertController,
public toastCtrl: ToastController,
public auth:AutentificacionProvider) {

    this.listainsumo=this.db.list('insumos/');
    this.listainsumo.snapshotChanges().subscribe(rs=>{
      this.listares=[];
      rs.forEach(f=>{
         this.listares.push({
          nombre:f.payload.val().nombre,
          image: f.payload.val().image,
          nombreCientifico: f.payload.val().nombreCientifico,
          descripcion:f.payload.val().descripcion,
          metodouso: f.payload.val().metodouso,
          proveedor: f.payload.val().proveedor
        })
      })
      this.listares.reverse();
    })

    

    this.favorites=this.db.list('favoritosinsumo/');
    this.favos=this.favorites.snapshotChanges().map(changes=>{
      return changes.map(c=>({key: c.payload.key,nombre:c.payload.val(),image:c.payload.val()}));
    });
  }

  inicializarItems(): void{
    this.listares1= this.listares;
    
 }
 obtenerItems(ev: any){
  this.inicializarItems();
  
  let q = ev.target.value.trim();
   if(q && q.trim()!=''){
    this.listares=this.listares.filter((item)=>{
      return (item.nombre.toLowerCase().indexOf(q.toLowerCase())>-1);
     
    })
  console.log(this.listares)
   } 
  
}

  favoritos(product: any){
    var favo :any={
      nombre:product.nombre,
      image: product.image
    }
    //comilla `
    let newTaskModal = this.alertCtrl.create({
      title: '¿Guardar en favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            product.id=Date.now();
            this.db.database.ref(`favoritosinsumo/${this.auth.getUser()}/${product.id}`).set(product);
            //this.db.object(`favoritosinsumo/${product.nombre}/`).set(favo);
            this.presentToast();
          }
        }
      ]
    });
    newTaskModal.present( newTaskModal );
    
    //this.tasksRef.push(favo);     
    
}
presentToast() {
let toast = this.toastCtrl.create({
message: 'Agregado a favoritos',
duration: 3000
});
toast.present();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsumosPage');
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
    this.navCtrl.push(InsumodetallesPage,product);
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
