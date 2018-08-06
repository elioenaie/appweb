import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ModaldetailprovePage} from '../modaldetailprove/modaldetailprove';
/**
 * Generated class for the InsumodetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-insumodetalles',
  templateUrl: 'insumodetalles.html',
})
export class InsumodetallesPage {
  product : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.product = this.navParams.data;
  }
  goBack() {
      this.navCtrl.pop();
  }
  
  showDetails(product){
    let datos: any =[];
    var prove = product['proveedor']  
    this.navCtrl.push(ModaldetailprovePage,{prove:prove});
    }
    

 

}
