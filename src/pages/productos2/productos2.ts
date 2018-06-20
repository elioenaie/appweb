import { Component,OnInit} from '@angular/core';

import { NavController, NavParams, ViewController,ModalController ,Platform, Searchbar,AlertController,ToastController,MenuController} from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import {CartPage} from '../cart/cart';

import { FirebaseListObservable} from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';

import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth.service';

import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { ModalsPage } from '../modals/modals';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../../models/user-model';
import {AutentificacionProvider} from '../../providers/autentificacion/autentificacion';
import { PopoverController } from 'ionic-angular';
import{PopoverPage} from '../popover/popover';
/**
 * Generated class for the Productos2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-productos2',
  templateUrl: 'productos2.html',
  providers: [CartService,AuthService]
})
export class Productos2Page {
  objectKeys = Object.keys;
  // create FirebaseListObservable reference  

  title = 'Grocery List';
  newItem: string = ''; 
  products: FirebaseListObservable<any>;

  //private auth     : any;
  public movies    : any;
  private email    : string ;
  private pass     : string ;
  public listares : Array<any>;
  public listares3 : Object;
  listaprod: AngularFireList<any>;
  public listares1 : Array<any>;
  tasksRef: AngularFireList<any>;
  
  tasks: Observable<any[]>;
  clients:any;
  userModel: UserModel;
   listaresprueba = null;
   user: any ;
   datasCollection: Array<Object>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private viewCtrl: ViewController,
              //afAuth: AngularFireAuth,
    public cartService: CartService,
    public authService: AuthService,
    private platform     : Platform,
    private modalCtrl    : ModalController,
    private _IMG         : ImageProvider,
    private _LOADER      : PreloaderProvider,
    private _DB          : DatabaseProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public auth:AutentificacionProvider,
    public fAuth: AngularFireAuth,
    public toast:ToastController,
    public popoverCtrl: PopoverController,public menu:MenuController) {
      this.userModel =new UserModel();
      
      this.listaprod=this.db.list('productos/');
      this.listaprod.snapshotChanges().subscribe(rs=>{
        this.listares=[];
      rs.forEach(f=>{
         this.listares.push({
          nombre:f.payload.val().nombre,
          image: f.payload.val().image,
          lugarproduccion: f.payload.val().lugarproduccion,
          descripcion:f.payload.val().descripcion,
          nombreCientifico: f.payload.val().nombreCientifico,
          proveedor: f.payload.val().proveedor
        })
      })
      this.listares.reverse();
  }) 
    this.tasksRef=this.db.list('favoritos/');
    this.tasks =this.tasksRef.snapshotChanges().map(changes=>{
      return changes.map(c=>({key: c.payload.key,nombre: c.payload.val(),image: c.payload.val()}));
    });
  }

  

  
  getListares(){
    return this.db.list('productos');
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
                    this.db.database.ref(`favoritos/${this.auth.getUser()}/${product.id}`).set(product);
                    
                    this.presentToast();
                  }
                }
              ]
            });
            newTaskModal.present( newTaskModal ); 
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Agregado a favoritos',
      duration: 3000
    });
    toast.present();
  }
  
  ionViewDidEnter()
  {
     this._LOADER.displayPreloader();
     this.platform.ready()
     .then(() =>
     {
        //firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
     
           this.loadAndParseMovies();

     });
  }
  loadAndParseMovies()
  {
     this.movies = this._DB.renderMovies();
     console.log(this.movies)
     //this.listares=this.movies;
     this._LOADER.hidePreloader(); 
  }


  
  showDetails(product)  : void  {
    this.navCtrl.push(ProductDetailsPage,product);
  }

  addToCart(product)  : void  {
    this.cartService.addCartItem(this.authService.getLoggedUID(), product);
  }

  openCart() : void {
    this.navCtrl.push(CartPage);
  }

  getItems(event) : void{
    // TODO : search
    
  }

  applyCategoryFilter(event) : void{
    // TODO : filter
  }


  ionViewDidLoad() {
    this.menu.swipeEnable(false);
  }

}
