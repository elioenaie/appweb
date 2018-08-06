import { Component } from '@angular/core';
import { NavController, NavParams,ModalOptions, ModalController} from 'ionic-angular';
import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import {ModaldetailprovePage} from '../modaldetailprove/modaldetailprove';
import {Storage} from '@ionic/storage';
import {DatabaseProvider} from '../../providers/database/database';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
  providers: [CartService,AuthService]
})
export class ProductDetailsPage {

  product : any;
  public listares : Array<any>;
  listaprod: AngularFireList<any>;
  //datosprove:any[]=[];
  proveedor:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cartService: CartService,
              public authService: AuthService,
              public db: AngularFireDatabase, 
              public modalCtrl:ModalController,
              public storage:Storage,
              public dbs:DatabaseProvider
             ) {
              this.product = this.navParams.data;
    this.listaprod=this.db.list('proveedor');
    this.listaprod.snapshotChanges().subscribe(rs=>{
    this.listares=[];
      rs.forEach(f=>{
        this.listares.push({
         nombreprove:f.payload.val().nombreprove,
         pageweb: f.payload.val().pageweb,
         nombreCientifico: f.payload.val().nombreCientifico,
         metodouso:f.payload.val().metodouso,
         descripcion: f.payload.val().descripcion
       });
     });
     console.log(this.listares)
    });         
  }

  showDetails(product){
  let datos: any =[];
  var prove = product['proveedor']  
  this.navCtrl.push(ModaldetailprovePage,{prove:prove});
  }
  
 
  goBack() {
      this.navCtrl.pop();
  }

}
