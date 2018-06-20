import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
  listaregistros: AngularFireList<any>;
  registro: Observable<any[]>;
  constructor(public firebaseAuth: AngularFireAuth,public db: AngularFireDatabase) {
    this.listaregistros=this.db.list('usuarios/');
   
  }

  signup(email: string, password: string,roles:string,nombreusuario:string) {
   return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(()=>{
     let usernew= firebase.database().ref('usuarios/').push();
        usernew.set({
            password:password,
            email:email,
            roles:roles,
            nombreusuario:nombreusuario,
            key:usernew.key
            
     })
   })

    
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

  isLoggedIn(){
    if(this.firebaseAuth.auth.currentUser != null){
      return true;
    }else{
      return false;;
    }
  }

  getLoggedUID() : string{
    return this.firebaseAuth.auth.currentUser.uid;
  }
  
  recover(email):void{
    this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }

}