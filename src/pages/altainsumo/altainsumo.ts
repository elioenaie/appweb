import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController ,Platform } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import {InsumodatabaseProvider} from '../../providers/insumodatabase/insumodatabase';
import * as firebase from 'firebase';
import { ModalinsumoPage } from '../modalinsumo/modalinsumo';
import { Http } from '@angular/http';
import 'rxjs/Rx';
/**
 * Generated class for the AltainsumoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-altainsumo',
  templateUrl: 'altainsumo.html',
})
export class AltainsumoPage {
  private auth     : any;
  public movies    : any;
  private email    : string = 'enai04@gmail.com';
  private pass     : string = 'enai041294';
  constructor(public navCtrl       : NavController,
    private platform     : Platform,
    private modalCtrl    : ModalController,
    private _IMG         : ImageProvider,
    private _LOADER      : PreloaderProvider,
  private _DB          : InsumodatabaseProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltainsumoPage');
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
     this._LOADER.hidePreloader();
  }

  addRecord()
  {
     let modal = this.modalCtrl.create(ModalinsumoPage);
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
         modal  = this.modalCtrl.create(ModalinsumoPage, params);

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
