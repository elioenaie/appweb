
import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController ,Platform } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseusuariosProvider } from '../../providers/databaseusuarios/databaseusuarios';
import * as firebase from 'firebase';
import { ModaluserPage } from '../modaluser/modaluser';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { UserModel } from '../../models/user-model';
import { AutentificacionProvider } from '../../providers/autentificacion/autentificacion';

/**
 * Generated class for the GetionuserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-getionuser',
  templateUrl: 'getionuser.html',
})
export class GetionuserPage {

  public movies    : any;
  private email    : string = 'enai04@gmail.com';
  private pass     : string = 'enai041294';
  userModel: UserModel;

  constructor(
    public navCtrl       : NavController,
    private platform     : Platform,
    private modalCtrl    : ModalController,
    private _IMG         : ImageProvider,
    private _LOADER      : PreloaderProvider,
    private _DB          : DatabaseusuariosProvider,
    public authe:AutentificacionProvider) {
      this.userModel=new UserModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetionuserPage');
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

  ionViewDidEnter(userModel:UserModel)
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
   addRecord()
   {
      let modal = this.modalCtrl.create(ModaluserPage);
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
          modal  = this.modalCtrl.create(ModaluserPage, params);

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
