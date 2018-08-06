import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController,Platform } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { ModalsPage } from '../modals/modals';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { UserModel } from '../../models/user-model';
import { AutentificacionProvider } from '../../providers/autentificacion/autentificacion';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-addprod',
  templateUrl: 'addprod.html',
  
})
export class AddprodPage {

  //private auth     : any;
  public movies    : any;
  private email    : string = 'enai04@gmail.com';
  private pass     : string = 'enai041294';
  userModel: UserModel;
  af: AngularFireList<any>;
  user: any;
  public listares : Array<any>;
  datasCollection: Array<Object>;
  datosuser:any;
  constructor(public navCtrl       : NavController,
    private platform     : Platform,
    private modalCtrl    : ModalController,
    private _IMG         : ImageProvider,
    private _LOADER      : PreloaderProvider,
    private _DB          : DatabaseProvider,
    public authe:AutentificacionProvider, public afDB: AngularFireDatabase, public navParams:NavParams,public angularFireDatabase:AngularFireDatabase) {
      
      this.userModel=new UserModel();
      this.datosuser=navParams.get('datosuser');
      console.log(this.datosuser)
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprodPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this._LOADER.displayPreloader();
      this.movies = this._DB.renderMovies();
      this._LOADER.hidePreloader();
      refresher.complete();
    }, 2000);
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
      console.log(this.movies)
      this._LOADER.hidePreloader();
   }

   

   addRecord()
   {
      let modal = this.modalCtrl.create(ModalsPage,{datosuser:this.datosuser});
      modal.onDidDismiss((data) =>
      {
         if(data)
         {
          this.loadAndParseMovies();
         }
      });
      modal.present();
   }

   editMovie(movie)
   {
      let params = { movie: movie, isEdited: true },
          modal  = this.modalCtrl.create(ModalsPage, params);

      modal.onDidDismiss((data) =>
      {
         if(data)
         {
          this.loadAndParseMovies();
         }
      });
      modal.present();
   }
 

   deleteMovie(movie)
   {
      this._DB.deleteMovie(movie.id)
      .then((data) =>
      {
        this.loadAndParseMovies();
      });
   }



}
