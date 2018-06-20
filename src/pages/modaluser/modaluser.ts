import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
//import { DatabaseProvider } from '../../providers/database/database';
import{DatabaseusuariosProvider} from '../../providers/databaseusuarios/databaseusuarios';
import * as firebase from 'firebase';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AutentificacionProvider } from '../../providers/autentificacion/autentificacion';
/**
 * Generated class for the ModaluserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modaluser',
  templateUrl: 'modaluser.html',
})
export class ModaluserPage {
  public form             : any;
  public filmImage  	    : any;
  public movies           : any;
  public prove           : Array<any>;
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
  //db
  public listRef: AngularFireList<any>;
  constructor(
    public navCtrl        : NavController,
    public params         : NavParams,
    private _FB 	        : FormBuilder,
    private _IMG          : ImageProvider,
    public viewCtrl       : ViewController,
    private _LOADER       : PreloaderProvider,
   // private _DB           : DatabaseProvider,
    private _DB  : DatabaseusuariosProvider,
    public authService: AutentificacionProvider,
    private db: AngularFireDatabase) {
      
      this.form 		= _FB.group({
        'nombreuser' 		: ['', Validators.required],
        'email'	: ['', Validators.required],
        'password':['', Validators.required],
        'rol' 		: ['', Validators.required],
        'image'		: ['', Validators.required]   
     });

     this.movies = firebase.database().ref(`usuarios/${this.authService.getUser()}`);

     //codigo nuevo
     this.listRef = this.db.list('usuarios/');
     this.listRef.snapshotChanges().subscribe(rs=>{
       this.prove = [];
       rs.forEach(f=>{
         this.prove.push({
           rol: f.payload.val().rol 
         })
         console.log(f.payload.val().rol )
       })
     })
  
    
  
  
     if(params.get('isEdited'))
     {
         let movie 		    = params.get('movie'),
             k;
  
         this.movieName	    = movie.nombreuser;
         this.movieDuration	= movie.email;
         this.movieSummary   	= movie.password;
         this.movieGenres = movie.rol;
         this.movieImage       = movie.image;
         this.filmImage        = movie.image;
         this.movieId          = movie.id;
    
         this.isEditable      = true;
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModaluserPage');
  }


  saveMovie(val)
  {
     this._LOADER.displayPreloader();

     let nombreuser	    : string		= this.form.controls["nombreuser"].value,
        email 	: string 		= this.form.controls["email"].value,
        password  	: any		    = this.form.controls["password"].value,
        rol  	: any		    = this.form.controls["rol"].value,
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
                nombreuser    : nombreuser,
                email  : email,
                password : password,
                image    : uploadedImage,
                rol   : rol
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
            nombreuser    : nombreuser,
            email  : email,
           password : password,
           rol   : rol,
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
            nombreuser    : nombreuser,
            image    : uploadedImage,
            email  : email,
            password : password,
            rol   : rol,
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
