import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';
import {AutentificacionProvider} from '../autentificacion/autentificacion';
/*
  Generated class for the TiendadatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TiendadatabaseProvider {

  constructor(public http: Http, public autentificacion:AutentificacionProvider) {
    console.log('Hello TiendadatabaseProvider Provider');
  }

  renderMovies() : Observable<any>
  {

     return new Observable(observer =>
     {
        let films : any = [];
        firebase.database().ref('tiendas').orderByChild('uid').equalTo(this.autentificacion.getUser()).once('value', (items : any) =>
        {
           items.forEach((item) =>
           {
              films.push({
               id        : item.key,
               nombretienda     : item.val().nombretienda,
               longitud : item.val().longitud,
               latitud  : item.val().latitud,
               image     : item.val().image

               
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
        let ref = firebase.database().ref('tiendas').child(id);
        ref.remove();
        resolve(true);
     });
  }



  addToDatabase(movieObj) : Promise<any>
  {
     return new Promise((resolve) =>
     {
       // let addRef = firebase.database().ref('tiendas');
        //addRef.push(movieObj);
        let nuevoUsuario = firebase.database().ref('tiendas/').push(); 
      nuevoUsuario.set
       ({ nombretienda:movieObj.nombretienda, 
          image: movieObj.image,
          longitud: movieObj.longitud, 
          latitud: movieObj.latitud,
          uid: this.autentificacion.getUser()})
        resolve(true);
     });
  }



  updateDatabase(id, moviesObj) : Promise<any>
  {
     return new Promise((resolve) =>
     {
        var updateRef = firebase.database().ref('tiendas').child(id);
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
        storageRef       = firebase.storage().ref('tiendas/' + image);
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
