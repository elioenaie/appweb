import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import {AutentificacionProvider} from '../autentificacion/autentificacion';
import { AngularFireAuth } from 'angularfire2/auth';
import { moveEmbeddedView } from '@angular/core/src/view';
import 'rxjs/add/operator/filter';
@Injectable()
export class DatabaseProvider {
  af: AngularFireList<any>;
  user: any;
  public listares : Array<any>;
  datasCollection: Array<Object>;
  constructor(public http: Http,public afDB: AngularFireDatabase, public auth: AutentificacionProvider,public fAuth: AngularFireAuth,) {
    console.log('Hello DatabaseProvider Provider');
 /*  this.afDB.list('productos/',ref=>ref.orderByChild('uid').equalTo(this.auth.getUser())).valueChanges().subscribe((dato: any)=>{
    this.listares=[];
    dato.forEach(f=>{
      this.listares.push(f);
    })
    //console.log(this.listares)
   });   */


   let films : any = [];
        firebase.database().ref(`productos/`).orderByChild('uid').equalTo(this.auth.getUser()).once('value', (items : any) =>
        {
           items.forEach((item) =>
           {
              films.push({
               id        : item.key,
                nombre     : item.val().nombre,
               lugarproduccion      : item.val().lugarproduccion,
               certificado :item.val().certificado,
               numcertificado:item.val().numcertificado,
               nombreCientifico  : item.val().nombreCientifico,
               proveedor    : item.val().proveedor,
               image     : item.val().image,
               descripcion   : item.val().descripcion
            });
           });
           console.log(films)
          
        });
  }
 
  obtenerDatos(){
    return this.afDB.list('favoritos/'+this.auth.getUser()).valueChanges();
  }

  
  renderMovies() : Observable<any>
  {
     return new Observable(observer =>
     {     
        let films : any = [];
        firebase.database().ref(`productos/`).orderByChild('uid').equalTo(this.auth.getUser()).once('value', (items : any) =>
        {
           items.forEach((item) =>
           {
              films.push({
               id        : item.key,
               nombre     : item.val().nombre,
               lugarproduccion      : item.val().lugarproduccion,
               certificado :item.val().certificado,
               numcertificado:item.val().numcertificado,
               nombreCientifico  : item.val().nombreCientifico,
               proveedor    : item.val().proveedor,
               image     : item.val().image,
               descripcion   : item.val().descripcion
            });
           });
           console.log(films)
           films.reverse();
           observer.next(films);

           observer.complete();
        },
        (error) =>
        {
           console.log("Observer error: ", error);
           console.dir(error);
           observer.error(error)
        });

     });
  }
  renderProve(prove) : Observable<any>
  {
     return new Observable(observer =>
     {     
        let films : any = [];
        firebase.database().ref(`proveedor/`).orderByChild('nombreprove').equalTo(prove).once('value', (items : any) =>
        {
           items.forEach((item) =>
           {
              films.push({
               id        : item.key,
               nombreprove     : item.val().nombreprove,
               nombreCientifico   : item.val().nombreCientifico,
               metodouso: item.val().metodouso,
               pageweb    : item.val().pageweb,
               image     : item.val().image,
               descripcion   : item.val().descripcion
            });
           });
           console.log(films)
           films.reverse();
           observer.next(films);

           observer.complete();
        },
        (error) =>
        {
           console.log("Observer error: ", error);
           console.dir(error);
           observer.error(error)
        });

     });
  }

  deleteMovie(id) : Promise<any>
  {
     return new Promise((resolve) =>
     {
        let ref = firebase.database().ref(`productos/`).child(id);
        ref.remove();
        resolve(true);
     });
  }



  addToDatabase(movieObj) : Promise<any>
  {
     return new Promise((resolve) =>
     {
       let nuevoUsuario = firebase.database().ref('productos/').push(); 
                nuevoUsuario.set
                 ({ nombre:movieObj.nombre, 
                    image: movieObj.image,
                    lugarproduccion: movieObj.lugarproduccion, 
                    certificado :movieObj.certificado,
                    numcertificado:movieObj.numcertificado,
                    descripcion: movieObj.descripcion,
                    nombreCientifico:movieObj.nombreCientifico,
                    proveedor:movieObj.proveedor,
                    uid: this.auth.getUser()})
        resolve(true);
     });
  }
  


  updateDatabase(id, moviesObj) : Promise<any>
  {
     return new Promise((resolve) =>
     {
       //firebase.database().ref(`productosres/${moviesObj.id}`).child(id).set(moviesObj);
        console.log(id)
        var updateRef = firebase.database().ref(`productos/`).child(id);
      //  firebase.database().ref(`productosres/`).child(id).set(moviesObj);
       updateRef.update(moviesObj);
      // console.log(updateRef)
     
        resolve(true);
     });
  }


  uploadImage(imageString) : Promise<any>
  {
     let image       : string  = 'movie-' + new Date().getTime() + '.jpg',
         storageRef  : any,
         parseUpload : any;

     return new Promise((resolve, reject) =>
     {
        storageRef       = firebase.storage().ref('productos/' + image);
        parseUpload      = storageRef.putString(imageString, 'data_url');

        parseUpload.on('state_changed', (_snapshot) =>
        {
           // We could log the progress here IF necessary
           // console.log('snapshot progess ' + _snapshot);
        },
        (_err) =>
        {
           reject(_err);
        },
        (success) =>
        {
           resolve(parseUpload.snapshot);
        });
     });
  }


  


}
