import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController,MenuController } from 'ionic-angular';

import { AutentificacionProvider } from '../../providers/autentificacion/autentificacion';
import { UserModel } from '../../models/user-model';
import { LoginPage } from '../login/login';
import { ImageProvider } from '../../providers/image/image';

import firebase from 'firebase';

/**
 * Generated class for the Register2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html',
})

export class Register2Page {
  userModel: UserModel;
  
  

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private _IMG          : ImageProvider,
    public authService: AutentificacionProvider,
    public menu:MenuController
    ) {
      this.userModel=new UserModel();
   
  }


  ionViewDidLoad() {
    this.menu.swipeEnable(false);
  }

  
  signUp() {
    let loading = this.loadingCtrl.create({
        content: 'Creando cuenta. Por favor, espere...'
    });
    loading.present();

    this.authService.createUserWithEmailAndPassword(this.userModel).then(result => {
        loading.dismiss();
        this.navCtrl.push(LoginPage);
    }).catch(error => {
        loading.dismiss();

        console.log(error);
        this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
    });
}

alert(title: string, message: string) {
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
    });
    alert.present();
}


}
