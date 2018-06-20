import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ImagetiendaProvider } from '../../providers/imagetienda/imagetienda';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { TiendadatabaseProvider } from '../../providers/tiendadatabase/tiendadatabase';
import * as firebase from 'firebase';
/**
 * Generated class for the ModalTiendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-tienda',
  templateUrl: 'modal-tienda.html',
})
export class ModalTiendaPage {
  public form             : any;
  public filmImage  	    : any;
  public movies           : any;
  public movieName        : any     = '';
  public movieImage       : any     = '';
  public movieGenres      : any     = [];
  public movieDuration    : any     = '';
  public movieSummary     : any     = '';
  public movieActors      : any     = [];
  public movieYear        : any     = '';
  public provepageweb      : any     = '';
  public movieId          : string  = '';
  public isEditable       : boolean = false;
  constructor(
    public navCtrl        : NavController,
    public params         : NavParams,
    private _FB 	        : FormBuilder,
    private _IMG          : ImagetiendaProvider,
    public viewCtrl       : ViewController,
    private _LOADER       : PreloaderProvider,
    private _DB           : TiendadatabaseProvider
  ) {

    this.form 		= _FB.group({
      'nombretienda' 		: ['', Validators.required],
      'latitud'		: ['', Validators.required],
      'image'		: ['', Validators.required],
      'longitud' 		: ['', Validators.required]
   });

   this.movies = firebase.database().ref('tiendas/');


   if(params.get('isEdited'))
   {
       let movie 		    = params.get('movie'),
           k;

       this.movieName	    = movie.nombretienda;
       this.provepageweb =movie.longitud;
       this.movieDuration	= movie.latitud;
       this.movieImage       = movie.image;
       this.filmImage        = movie.image;
       this.movieId          = movie.id;
       this.isEditable      = true;
   }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalTiendaPage');
  }

  saveMovie(val)
  {
     this._LOADER.displayPreloader();

     let nombretienda	    : string		= this.form.controls["nombretienda"].value,
     longitud 	: string 		= this.form.controls["longitud"].value,
     latitud 	: string		= this.form.controls["latitud"].value,
       image     : string        = this.filmImage,
       types     : any           = [],
       people    : any           = [],
       k         : any;


       if(this.isEditable)
     {

        if(image !== this.movieImage)
        {
           this._DB.uploadImage(image)
           .then((snapshot : any) =>
           {
              let uploadedImage : any = snapshot.downloadURL;

              this._DB.updateDatabase(this.movieId,
              {
                nombretienda    : nombretienda,
                longitud  :   longitud,
                latitud : latitud,
               image    : uploadedImage
            })
              .then((data) =>
              {
                 this._LOADER.hidePreloader();
              });

           });
        }
        else
        {

          this._DB.updateDatabase(this.movieId,
          {
            nombretienda    : nombretienda,
            longitud : longitud,
            latitud : latitud
        })
          .then((data) =>
          {
             this._LOADER.hidePreloader();
          });
      }

     }
     else
     {
        this._DB.uploadImage(image)
        .then((snapshot : any) =>
        {
           let uploadedImage : any = snapshot.downloadURL;

           this._DB.addToDatabase({
            nombretienda    : nombretienda,
            longitud : longitud,
            image    : uploadedImage,
            latitud : latitud
         })
           .then((data) =>
           {
              this._LOADER.hidePreloader();
           });
        });

     }
     this.closeModal(true);
  }

  closeModal(val = null)
  {
     this.viewCtrl.dismiss(val);
  }

  selectImage()
  {
     this._IMG.selectImage()
     .then((data) =>
     {
        this.filmImage = data;
     });
  }


}
