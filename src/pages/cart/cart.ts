import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated"; 
import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth.service';

import {BillingPage} from '../billing/billing';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [CartService,AuthService]
})
export class CartPage {

  cart: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cartService: CartService,
              public authService: AuthService
             ) {
      cartService.loadCartList(this.authService.getLoggedUID());
      this.cart = this.cartService.cartItems;
  }

  ionViewDidLoad() {
  }



  increment(item : any) : void {
    this.cartService.incrementCartItem(this.authService.getLoggedUID(),item);
  }
  decrement(item : any) : void {
    this.cartService.decrementCartItem(this.authService.getLoggedUID(),item);
  } 
  remove(item : any) : void {
    this.cartService.removeCartItem(this.authService.getLoggedUID(),item.$key);
  }

  checkout() : void {
    this.navCtrl.push(BillingPage);
  }

  goBack() {
      this.navCtrl.pop();
  }

}
