
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { InsumodatabaseProvider } from '../../providers/insumodatabase/insumodatabase';
import * as firebase from 'firebase';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the ModalinsumoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modalinsumo',
  templateUrl: 'modalinsumo.html',
})
export class ModalinsumoPage {
  public form             : any;
  public filmImage  	    : any;
  public movies           : any;
  public insumo           : Array<{nombre:string}>;
  public movieName        : any     = '';
  public movieImage       : any     = '';
  public movieGenres      : any     = [];
  public movieDuration    : any     = '';
  public movieSummary     : any     = '';
  public movieActors      : any     = [];
  public movieYear        : any     = '';
  public movieRating      : any     = '';
  public movieId          : string  = '';
  public isEditable       : boolean = false;
  public listRef: AngularFireList<any>;

  constructor(public navCtrl        : NavController,
    public params         : NavParams,
    private _FB 	        : FormBuilder,
    private _IMG          : ImageProvider,
    public viewCtrl       : ViewController,
    private _LOADER       : PreloaderProvider,
    private _DB           : InsumodatabaseProvider,
    private db: AngularFireDatabase) {

      this.form 		= _FB.group({
        'descripcion' 		: ['', Validators.minLength(10)],
        'metodouso' 		: ['', Validators.minLength(10)],
        'name' 		: ['', Validators.required],
        'nombreCientifico'		: ['', Validators.required],
        'image'		: ['', Validators.required],
        //'rating'		: ['', Validators.required],
        'proveedor' 		: ['', Validators.required],
        //'actors' 		: ['', Validators.required]
     });
  
     this.movies = firebase.database().ref('productos/');
     
       //codigo nuevo
   this.listRef = this.db.list('proveedor/');
   this.listRef.snapshotChanges().subscribe(rs=>{
     this.insumo = [];
     rs.forEach(f=>{
       this.insumo.push({
         nombre: f.payload.val().nombreprove 
       })
       console.log(f.payload.val().nombreprove)
     })
   })
  
     if(params.get('isEdited'))
     {
         let movie 		    = params.get('movie'),
             k;
  
         this.movieName	    = movie.nombre;
         this.movieDuration	= movie.nombreCientifico;
         this.movieSummary   	= movie.descripcion;
         //this.movieRating   	= movie.rating;
         this.movieYear    	=   movie.metodouso;
         this.movieImage       = movie.image;
         this.filmImage        = movie.image;
         this.movieId          = movie.id;
  
  
      
  
        /* for(k in movie.actors)
         {
            this.movieActors.push(movie.actors[k].name);
         }*/
  
         this.isEditable      = true;
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalinsumoPage');
  }

  saveMovie(val)
  {
     this._LOADER.displayPreloader();

     let nombre	    : string		= this.form.controls["name"].value,
     descripcion 	: string 		= this.form.controls["descripcion"].value,
       //rating  	: number		= this.form.controls["rating"].value,
       proveedor  	: any		    = this.form.controls["proveedor"].value,
       //actors  	: any		    = this.form.controls["actors"].value,
       nombreCientifico 	: string		= this.form.controls["nombreCientifico"].value,
       metodouso    	: string		= this.form.controls["metodouso"].value,
       image     : string        = this.filmImage,
       types     : any           = [],
       people    : any           = [],
       k         : any;


     

/*
     for(k in actors)
     {
        people.push({
           "name" : actors[k]
        });
     }
*/

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
               nombre    : nombre,
               descripcion  : descripcion,
               //rating   : rating,
               nombreCientifico : nombreCientifico,
               image    : uploadedImage,
               proveedor   : proveedor,
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
            nombre    : nombre,
            descripcion  : descripcion,
           //rating   : rating,
           nombreCientifico : nombreCientifico,
           proveedor   : proveedor,
          // actors   : people,
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
            nombre    : nombre,
            image    : uploadedImage,
            descripcion  : descripcion,
            //rating   : rating,
            nombreCientifico : nombreCientifico,
            proveedor   : proveedor,
          //  actors   : people,
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
