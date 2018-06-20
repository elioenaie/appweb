import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';


import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth.service';
import {CustomerService} from '../../providers/customer.service';
import {SharedService} from '../../providers/shared.service';


import {OrdersPage} from '../orders/orders'

@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html',
  providers: [CartService,AuthService,CustomerService,SharedService]
})
export class BillingPage {
  addresses :  any;
  delivery_details: string;
  payment_mode : string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,

              public alertCtrl: AlertController,

              public cartService: CartService,
              public authService: AuthService,
              public custService: CustomerService,
              public sharedService: SharedService
             ) {
        this.payment_mode="cod";
        this.delivery_details="";
        this.custService.loadDeliveyAddress(this.authService.getLoggedUID());
        this.addresses = this.custService.deliveryAddresses;
        
  }

  pay() : void{
    if(this.payment_mode == "cod"){
      
      if(this.delivery_details == "" || this.delivery_details==undefined || this.delivery_details==null){
        this.sharedService.showToast("Select/Add Adress!");
      }else{
        this.cartService.checkout(this.authService.getLoggedUID() ,this.delivery_details);
        this.navCtrl.setRoot(OrdersPage);
      }
    
    }else if(this.payment_mode=="paypal"){
      //handle this 
    }
    
  }

  addAddress() : void{
    this.addressManipulation(false,null);
  }

  editAddress(address: any) : void{
    this.addressManipulation(true, address);
  }
  deleteAddress(address:any) : void{
    let confirm = this.alertCtrl.create({
      title: 'Eliminar esta dirección',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Si',
          handler: () => {
            this.custService.removeAddress(this.authService.getLoggedUID(),address.$key);
          }
        }
      ]
    });
    confirm.present();
  }

  addressManipulation(edit:boolean, address :any) : any {
    var popup_title = "Editar dirección"
    if(edit == false){
      popup_title = "Agregar dirección";
      address = { 
        nickname:'',
        address:'',
        pincode:'',
        phone:''
      }
    }

    let prompt = this.alertCtrl.create({
      title: popup_title,
      inputs: [
        {
          name: 'nickname',
          placeholder: 'Nombre completo',
          value :address.nickname
        },
        {
          name: 'address',
          placeholder: 'Dirección',
          value :address.address
        },
        {
          name: 'pincode',
          placeholder: 'Código postal',
          type: 'number',
          value :address.pincode
        },
        {
          name: 'phone',
          placeholder: 'Numero de teléfono',
          type: 'number',
          value :address.phone
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Guardar',
          handler: data => {
            if (!data.nickname || !data.address || !data.pincode || !data.phone ) {
              this.sharedService.showToast("Invalid Data!");
              event.stopPropagation(); //TODO
            } else {
              
              if(edit){
                  this.custService.updateAddress(this.authService.getLoggedUID(), data, address.$key);
              }else{
                  this.custService.addAddress(this.authService.getLoggedUID(),data);
              }


            }
          }
        }
      ]
    });
    prompt.present();
    

  }

}
