import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import {AutentificacionProvider} from '../autentificacion/autentificacion';

/*
  Generated class for the DatabaseusuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseusuariosProvider {

  constructor(public http: Http,public afDB: AngularFireDatabase, public auth: AutentificacionProvider) {
    console.log('Hello DatabaseusuariosProvider Provider');
  }

 
obtenerDatos(){
  return this.afDB.list('favoritos/'+this.auth.getUser()).valueChanges();
}

renderMovies() : Observable<any>
{

   return new Observable(observer =>
   {
      let films : any = [];
      firebase.database().ref(`usuarios/${this.auth.getUser()}`).orderByKey().once('value', (items : any) =>
      {
         items.forEach((item) =>
         {
            films.push({
             id   : item.key,
            nombreuser: item.val().nombreuser,
            email: item.val().email,
            password:item.val().password,
            rol: item.val().rol,
            image : item.val().image,             
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
        let ref = firebase.database().ref(`usuarios/${this.auth.getUser()}`).child(id);
        ref.remove();
        resolve(true);
     });
  }




  updateDatabase(id, moviesObj) : Promise<any>
  {
     return new Promise((resolve) =>
     {
        var updateRef = firebase.database().ref(`usuarios/${this.auth.getUser()}`).child(id);
       updateRef.update(moviesObj);
        resolve(true);
     });
  }
  
  addToDatabase(movieObj) : Promise<any>
  {
     return new Promise((resolve) =>
     {
      let add = firebase.database().ref(`productosres/`);
      add.push(movieObj);

        let addRef = firebase.database().ref(`productos/${this.auth.getUser()}`);
        addRef.push(movieObj);
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
        storageRef       = firebase.storage().ref('usuarios/' + image);
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
