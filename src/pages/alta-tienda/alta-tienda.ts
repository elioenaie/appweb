import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController ,Platform } from 'ionic-angular';
import { ImagetiendaProvider } from '../../providers/imagetienda/imagetienda';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import {TiendadatabaseProvider} from '../../providers/tiendadatabase/tiendadatabase';
import * as firebase from 'firebase';
import { ModalTiendaPage } from '../modal-tienda/modal-tienda';
import { Http } from '@angular/http';
import 'rxjs/Rx';
/**
 * Generated class for the AltaTiendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-alta-tienda',
  templateUrl: 'alta-tienda.html',
})
export class AltaTiendaPage {
  private auth     : any;
  public movies    : any;
  private email    : string = 'enai04@gmail.com';
  private pass     : string = 'enai041294';

  constructor(public navCtrl: NavController,
    private platform     : Platform,
    private modalCtrl    : ModalController,
    private _IMG         : ImagetiendaProvider,
    private _LOADER      : PreloaderProvider,
  private _DB : TiendadatabaseProvider) {
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
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaTiendaPage');
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

  addRecord()
  {
     let modal = this.modalCtrl.create(ModalTiendaPage);
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
         modal  = this.modalCtrl.create(ModalTiendaPage, params);

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
