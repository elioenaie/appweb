import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProveedordetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-proveedordetalle',
  templateUrl: 'proveedordetalle.html',
})
export class ProveedordetallePage {
  product : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.product = this.navParams.data;
  }
  
  goBack() {
    this.navCtrl.pop();
}

}
