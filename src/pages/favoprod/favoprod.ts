import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import {AutentificacionProvider} from '../../providers/autentificacion/autentificacion';
/**
 * Generated class for the FavoprodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favoprod',
  templateUrl: 'favoprod.html',
})
export class FavoprodPage {
  public favoritos: Array<{nombre:string,image:string}>;
  public listRef: AngularFireList<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private db: AngularFireDatabase,public authe:AutentificacionProvider) {
      this.listRef=this.db.list(`favoritosinsumo/${this.authe.getUser()}/`);
      this.listRef.snapshotChanges().subscribe(rs=>{
        this.favoritos=[];
        rs.forEach(f=>{
          this.favoritos.push({
            nombre: f.payload.val().nombre,
            image: f.payload.val().image

          })
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoprodPage');
  }

}
