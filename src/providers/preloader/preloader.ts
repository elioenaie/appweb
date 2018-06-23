import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class PreloaderProvider {

  private loading : any;

  constructor(public http: Http, public loadingCtrl : LoadingController) {
    console.log('Hello PreloaderProvider Provider');
  }

  displayPreloader() : void
   {
      this.loading = this.loadingCtrl.create({
         content: 'Espere un momento...',
         cssClass: 'custom-alert-danger',
      });

      this.loading.present();
   }



   hidePreloader() : void
   {
      this.loading.dismiss();
   }

}
