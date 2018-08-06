import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';
import {AutentificacionProvider} from '../autentificacion/autentificacion';

/*
  Generated class for the ProveedordatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProveedordatabaseProvider {

  constructor(public http: Http,public auth: AutentificacionProvider) {
    console.log('Hello ProveedordatabaseProvider Provider');
  }

  renderMovies() : Observable<any>
  {

     return new Observable(observer =>
     {
        let films : any = [];
        firebase.database().ref('proveedor/').orderByChild('uid').equalTo(this.auth.getUser()).once('value', (items : any) =>
        {
           items.forEach((item) =>
           {
              films.push({
               id        : item.key,
            //  actors    : item.val().actors
               pageweb : item.val().pageweb,
               metodouso      : item.val().metodouso,
               nombreCientifico  : item.val().nombreCientifico,
            //   proveedor    : item.val().proveedor,
               image     : item.val().image,
              // rating    : item.val().rating,
               descripcion   : item.val().descripcion
               
            });
           });
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
        let ref = firebase.database().ref('proveedor').child(id);
        ref.remove();
        resolve(true);
     });
  }



  addToDatabase(movieObj) : Promise<any>
  {
     return new Promise((resolve) =>
     {
       // let addRef = firebase.database().ref('proveedor');
        //addRef.push(movieObj);
        let nuevoUsuario = firebase.database().ref('proveedor/').push(); 
      nuevoUsuario.set
       ({
          image: movieObj.image,
          metodouso: movieObj.metodouso, 
          descripcion: movieObj.descripcion,
          nombreCientifico:movieObj.nombreCientifico,
          pageweb:movieObj.pageweb,
          uid: this.auth.getUser()})
        resolve(true);
     });
  }



  updateDatabase(id, moviesObj) : Promise<any>
  {
     return new Promise((resolve) =>
     {
        var updateRef = firebase.database().ref('proveedor').child(id);
       updateRef.update(moviesObj);
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
        storageRef       = firebase.storage().ref('proveedor/' + image);
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
