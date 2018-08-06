import { Component} from '@angular/core';
import { NavController, NavParams,ViewController,AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {DatabaseProvider} from '../../providers/database/database';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import {ProductDetailsPage} from '../product-details/product-details';
/**
 * Generated class for the ModaldetailprovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-modaldetailprove',
  templateUrl: 'modaldetailprove.html',
})
export class ModaldetailprovePage {

  proveedor:any;
  prove:any;
  products:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public viewCtrl:ViewController,
    public db: AngularFireDatabase, public alertCtrl:AlertController) {
  //this.provedor = this.navParams.get('proveedor');
  this.prove = this.navParams.get('prove');
  console.log('recibo prove')
  console.log(this.prove)
  
  //consulta de proveedor
  this.db.list('proveedor/',ref=>ref.orderByChild('nombreprove').equalTo(this.prove)).valueChanges().subscribe((data: any)=>{
    this.proveedor=[];
    for(var i=0;i<data.length;i++){
      this.proveedor.push(data[i]);
    }    
    console.log('datos proveedor modal details')
    console.log(this.proveedor)
    if(data.length==0){
      let alert = this.alertCtrl.create({
        title: this.prove,
        subTitle: 'Aun no ha dado de alta sus datos de contacto este proveedor',
        buttons: [ {
          text: 'Aceptar',
          handler: ()=>{
            viewCtrl.dismiss();
          }
        }]
      });
      alert.present();
  }
   }); 
   
   //consulta de productos
   this.db.list('productos/',ref=>ref.orderByChild('proveedor').equalTo(this.prove)).valueChanges().subscribe((data: any)=>{
    this.products=[];
    for(var i=0;i<data.length;i++){
      this.products.push(data[i]);
    }    
    console.log('datos product modal details')
    console.log(this.products)
   }); 
  }

  showDetails(product:any){
    console.log(product)
    this.navCtrl.push(ProductDetailsPage,product)
  }
  closeSearch(){
    this.viewCtrl.dismiss();
    //this.storage.remove('prove');
  }

}
