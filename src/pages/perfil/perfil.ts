import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserModel} from '../../models/user-model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  userModel:UserModel;
  constructor(public navCtrl: NavController, public navParams: NavParams,public fAuth: AngularFireAuth,public db: AngularFireDatabase) {
    this.userModel =new UserModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  crearPerfil():void{
     
  }



}
