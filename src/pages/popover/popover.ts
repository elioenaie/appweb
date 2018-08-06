import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AutentificacionProvider} from '../../providers/autentificacion/autentificacion';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  public listares : Array<any>;
  public listares1 : Array<{name:string}>;
  tasksRef: AngularFireList<any>;
 
  user: any ;
  datasCollection: Array<Object>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public fAuth: AngularFireAuth,
    public authService: AutentificacionProvider,public db:AngularFireDatabase) {
    this.fAuth.authState.take(1).subscribe(data=>{
      if(data&&data.email&&data.uid){
     
        this.db.list(`usuarios/${data.uid}/${this.authService.getUser()}`).valueChanges().subscribe(dato=>{
          this.listares=[];
          dato.forEach(f=>{
            this.listares.push(f);
          })
          console.log('datos popover user')
          console.log(this.listares)
          this.datasCollection=[];
          this.user = {
            email: this.listares[0],
            image: this.listares[1],
            nombreuser: this.listares[4]
         };
         this.datasCollection.push(this.user);
         console.log(this.datasCollection)
        //  console.log(this.listares)
        })
     
      }
    })
  }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

}
