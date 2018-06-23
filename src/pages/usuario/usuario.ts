import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,ActionSheetController } from 'ionic-angular';
import{AltainsumoPage} from '../altainsumo/altainsumo';
import {AddprodPage} from '../addprod/addprod';
import {FavoritosPage} from '../favoritos/favoritos';
import {ProductsPage} from '../products/products';
import {InsumosPage} from '../insumos/insumos';
import {UserModel} from '../../models/user-model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import {LoginPage} from '../login/login';
import {AutentificacionProvider} from '../../providers/autentificacion/autentificacion';
import {AltaTiendaPage} from '../alta-tienda/alta-tienda';
import {LocalizacionPage} from '../localizacion/localizacion';
import { TabsPage } from '../../pages/tabs/tabs';
import { FavoprodPage } from '../favoprod/favoprod';
import {GetionuserPage} from '../getionuser/getionuser';
import {ProveedorPage} from '../proveedor/proveedor';
import {Productos2Page}from '../productos2/productos2'; 

@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
  perfil:UserModel;
    datos:AngularFireObject<UserModel>
    public listares : Array<any>;
    tasksRef: AngularFireList<any>;
    user: any ;
    datasCollection: Array<Object>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public fAuth: AngularFireAuth,
    public toast:ToastController,public db: AngularFireDatabase,
    public authService: AutentificacionProvider,public actionSheetCtrl: ActionSheetController) {
      this.tasksRef= this.db.list('usuarios');
  }

  openActionSheet(){
    console.log('opening');
    let actionsheet = this.actionSheetCtrl.create({
    title:"Menú de opciones",
    cssClass: 'action-sheets-groups-page',
    buttons:[{
    text: 'Ver productos',
    icon:'archive',
    cssClass: 'EditionIcon',
    handler: ()=>{
      this.navCtrl.push(Productos2Page);
    }
    },{
    text: 'Ver insumos',
    icon:'paper',
    cssClass: 'EditionIcon',
    handler: ()=>{
      this.navCtrl.push(InsumosPage);
    }
    },{
      text: 'Ver provedores activos',
      icon:'contacts',
      cssClass: 'EditionIcon',
      handler: ()=>{
        this.navCtrl.push(ProveedorPage);
      }
      }
      ,
    {
      text: 'Ver Tiendas',
      icon:'globe',
      cssClass: 'EditionIcon',
      handler: ()=>{
        this.navCtrl.push(LocalizacionPage);
      }
      },
        {
          text: 'Productos favoritos',
          icon:'star',
          handler: ()=>{
            this.navCtrl.push(FavoritosPage);
          }
          },
          {
            text: 'Insumos favoritos',
            icon:'heart',
            handler: ()=>{
              this.navCtrl.push(FavoprodPage);
            }
            },
            {
              text: 'Información perfil',
              icon:'information-circle',
              handler: ()=>{
                this.navCtrl.push(GetionuserPage);
              }
              },
            {
              text: 'Cerrar',
              icon:'close',
              handler: function(){
              let nav=actionsheet.dismiss();
              return false;
              }
              }]
    });
    actionsheet.present();
   }

  cerrar():void{
    this.authService.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    this.fAuth.authState.take(1).subscribe(data=>{
      if(data&&data.email&&data.uid){
        this.toast.create({
          message: `Bienvenido Usuario, ${data.email}`,
          duration:2500
        }).present();
      
        this.db.list(`usuarios/${data.uid}/${this.authService.getUser()}`).valueChanges().subscribe(dato=>{
          this.listares=[];
          dato.forEach(f=>{
            this.listares.push(f);
           
          })
          console.log(this.listares)
          this.datasCollection=[];
          this.user = {
            email: this.listares[0],
            image: this.listares[1],
            nombreuser: this.listares[4]
         };
         this.datasCollection.push(this.user);
         console.log(this.datasCollection)
        //  console.log(this.listares)
        })
      }else{
        this.toast.create({
          message:`No se encontro su usuario`,
          duration:2500
        }).present();
      }
    })
    console.log('ionViewDidLoad OperadorPage');
  }



}
