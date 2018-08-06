import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { ProveedordatabaseProvider } from '../../providers/proveedordatabase/proveedordatabase';
import * as firebase from 'firebase';
/**
 * Generated class for the ModalproveedorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modalproveedor',
  templateUrl: 'modalproveedor.html',
})
export class ModalproveedorPage {
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

  constructor(public navCtrl: NavController,
    public params         : NavParams,
    private _FB 	        : FormBuilder,
    private _IMG          : ImageProvider,
    public viewCtrl       : ViewController,
    private _LOADER       : PreloaderProvider,
    private _DB           : ProveedordatabaseProvider) {

      this.form 		= _FB.group({
        'descripcion' 		: ['', Validators.minLength(10)],
        'metodouso' 		: ['', Validators.minLength(10)],
        'nombreCientifico'		: ['', Validators.required],
        'image'		: ['', Validators.required],
        'pageweb' 		: ['', Validators.required]
     });
  
     this.movies = firebase.database().ref('proveedor/');
  
  
     if(params.get('isEdited'))
     {
         let movie 		    = params.get('movie'),
             k;
         this.movieDuration	= movie.nombreCientifico;
         this.movieSummary   	= movie.descripcion;
         //this.movieRating   	= movie.rating;
         this.provepageweb =movie.pageweb;
         this.movieYear    	=   movie.metodouso;
         this.movieImage       = movie.image;
         this.filmImage        = movie.image;
         this.movieId          = movie.id;
  
         this.isEditable      = true;
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalproveedorPage');
  }

  saveMovie(val)
  {
     this._LOADER.displayPreloader();

     let pageweb 	: string 		= this.form.controls["pageweb"].value,
     descripcion 	: string 		= this.form.controls["descripcion"].value,
       nombreCientifico 	: string		= this.form.controls["nombreCientifico"].value,
       metodouso    	: string		= this.form.controls["metodouso"].value,
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
               pageweb  :   pageweb,
               descripcion  : descripcion,
               //rating   : rating,
               nombreCientifico : nombreCientifico,
               image    : uploadedImage,
             //  proveedor   : types,
              // actors   : people,
              metodouso     : metodouso
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
            pageweb : pageweb,
            descripcion  : descripcion,
           nombreCientifico : nombreCientifico,
          metodouso     : metodouso
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
            pageweb : pageweb,
            image    : uploadedImage,
            descripcion  : descripcion,
            //rating   : rating,
            nombreCientifico : nombreCientifico,
            metodouso     : metodouso
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
