import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserModel } from '../../models/user-model';
import { User } from 'firebase';
import {  AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the AutentificacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutentificacionProvider {
  user : User;
  constructor(public http: Http,public angularFireAuth: AngularFireAuth,
    public db: AngularFireDatabase,
  ) {
    angularFireAuth.authState.subscribe((user:User)=>{
      this.user=user;
    });
    console.log('Hello AutentificacionProvider Provider');
  }

  get authenticated():boolean{
    return this.user != null;
  }
  getUser(){
    return this.angularFireAuth.auth.currentUser.uid;
 }

  signInWithEmailAndPassword(userModel:UserModel):Promise<any>{
    return this.angularFireAuth.auth.signInWithEmailAndPassword(userModel.email,userModel.password);
  }

  createUserWithEmailAndPassword(userModel:UserModel): Promise<any>{
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(userModel.email,userModel.password).then((auth)=>{
       
       firebase.database().ref(`usuarios/${auth.uid}/${this.getUser()}`).set(userModel);
   /* let nuevoUsuario = firebase.database().ref('usuarios/').push(); 
                nuevoUsuario.set
                 ({ nombreuser:userModel.nombreuser, 
                    email: userModel.email,
                    password: userModel.password, 
                    rol: userModel.rol,
                    uid: nuevoUsuario.key })*/
    })
  }
  signOut():Promise<any>{
    return this.angularFireAuth.auth.signOut();
  }

  getLoggedUID() : string{
    return this.angularFireAuth.auth.currentUser.uid;
  }
}
