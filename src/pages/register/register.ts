import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController,MenuController } from 'ionic-angular';

import { AutentificacionProvider } from '../../providers/autentificacion/autentificacion';
import { UserModel } from '../../models/user-model';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
//  providers: [AuthService,SharedService]
})
export class RegisterPage {

  userModel: UserModel;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AutentificacionProvider,public menu:MenuController) {
      
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
