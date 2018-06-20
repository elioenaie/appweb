import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
/**
 * Generated class for the SlidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html',
})
export class SlidePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navHome() {
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidePage');
  }

}
