import { Component} from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import {AutentificacionProvider} from '../../providers/autentificacion/autentificacion';
import { OperadorPage } from '../operador/operador';
/**
 * Generated class for the FavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})

export class FavoritosPage {
  //public arreglo: any;
 
  datos: any;
  public favoritos: Array<{nombre:string,image:string}>;
  public listRef: AngularFireList<any>;
  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private db: AngularFireDatabase,
    private _DB          : DatabaseProvider,
    public authe:AutentificacionProvider,
    public alertCtrl:AlertController) {
      this.listRef=this.db.list(`favoritos/${this.authe.getUser()}/`);
      this.listRef.snapshotChanges().subscribe(rs=>{
        this.favoritos=[];
        rs.forEach(f=>{
          this.favoritos.push({
            nombre: f.payload.val().nombre,
            image:  f.payload.val().image
          })
          console.log(f.payload.val().nombre)
        })
      })
  }

  ionViewDidLoad() {
    this._DB.obtenerDatos().subscribe(dato=>{
      this.datos=dato;
    })
    console.log('ionViewDidLoad FavoritosPage');
  }
  

  /*borrarSitio(id){

    let alert = this.alertCtrl.create({
      title: 'Confirmar borrado',
      message: '¿Estás seguro de que deseas eliminar este sitio?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Si',
          handler: () => {
               // AquÍ borramos el sitio en firebase
              this._DB.borrarSitio(id);
           }
        }
      ]
    });

    alert.present();

 }*/

}
