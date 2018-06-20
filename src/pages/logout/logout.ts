import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {LoginPage} from '../login/login';
import {AutentificacionProvider} from '../../providers/autentificacion/autentificacion';


@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
//  providers: [AuthService]
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AutentificacionProvider) {
  }

  ionViewDidLoad() {
    this.authService.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
