import { Component } from '@angular/core';
import { NavController,LoadingController, AlertController, Item,MenuController} from 'ionic-angular';
import { OperadorPage } from '../operador/operador';
import {UsuarioPage} from '../usuario/usuario';
import {ProductsPage} from '../products/products';
import {ProveedorPage} from '../proveedor/proveedor';
import { Register2Page } from '../register2/register2';

import { ForgotPassPage } from '../forgot-pass/forgot-pass';
import { AutentificacionProvider } from '../../providers/autentificacion/autentificacion';
import { UserModel } from '../../models/user-model';
import { AngularFireList,AngularFireDatabase} from 'angularfire2/database';
import { assert } from 'ionic-angular/util/util';
import { AngularFireAuth } from 'angularfire2/auth';
import {Storage} from '@ionic/storage';
import { SlidePage } from '../slide/slide';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userModel: UserModel;
  public usuarios: AngularFireList<any>;
  public users: Array<{rol:string}>;
  public datos: Array<any>;

  public type = 'password';
  public showPass = false;
  activeMenu: string;
  constructor(   public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AutentificacionProvider,
    public db: AngularFireDatabase,public fAuth: AngularFireAuth,public storage:Storage,
    public menu: MenuController
  ) {
       
  this.userModel = new UserModel();
  this.usuarios=this.db.list('usuarios/');
  this.usuarios.snapshotChanges().subscribe(rs=>{
    this.users=[];
    rs.forEach( f=>{
      this.users.push({
        rol: f.payload.val().rol
      })
    })
  })
  }

   
  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  
  ionViewDidLoad() {
    this.menu.swipeEnable(false);
    this.storage.get('intro-done').then(done=>{
      if(!done){
        this.storage.set('intro-done',true);
        this.navCtrl.setRoot(SlidePage)
      }
    });
    console.log('ionViewDidLoad SlidePage');
  }



  signIn() {
    let loading = this.loadingCtrl.create({
        content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();   

    this.authService.signInWithEmailAndPassword(this.userModel).then(result => {
        //codigo nuevo 
        this.db.list(`usuarios/${result.uid}/${this.authService.getUser()}`).valueChanges().subscribe(user=>{
          this.datos=[];
          user.forEach(f=>{
           this.datos.push(f);
          })
          //  console.log(this.datos)
            if(this.datos[4]=="Administrador"||this.datos[3]=="Administrador"){
              this.navCtrl.setRoot(ProductsPage);
              loading.dismiss();
            }else if(this.datos[4]=="Operador"||this.datos[3]=="Operador"){
              this.navCtrl.push(OperadorPage);
              loading.dismiss();
            }else if(this.datos[4]=="Usuario"||this.datos[3]=="Usuario"){
              this.navCtrl.push(UsuarioPage);
              loading.dismiss();
            }
        })    
      
    }).catch(error => {
        loading.dismiss();

        console.log(error);
        this.alert('Error al iniciar sesión', 'Su email o contraseña es incorrecta. Por favor intente nuevamente.');
    });
}

public register2() {
  this.navCtrl.push(Register2Page);
}


alert(title: string, message: string) {
  let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK'],
      cssClass: 'custom-alert-danger'
  });
  alert.present();
}

 

}
