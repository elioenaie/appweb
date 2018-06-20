import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {storage} from 'firebase';
/*
  Generated class for the ImagetiendaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagetiendaProvider {
  public cameraImage : String
  constructor(public http: Http,private _CAMERA : Camera) {
    console.log('Hello ImagetiendaProvider Provider');
  }

  selectImage() : Promise<any>
  {
     return new Promise(resolve =>
     {
        let cameraOptions : CameraOptions = {
            sourceType         : this._CAMERA.PictureSourceType.PHOTOLIBRARY,
            destinationType    : this._CAMERA.DestinationType.DATA_URL,
            quality            : 80,
            targetWidth        : 40,
            targetHeight       : 40,
            encodingType       : this._CAMERA.EncodingType.JPEG,
            correctOrientation : true
        };

        this._CAMERA.getPicture(cameraOptions)
        .then((data) =>
        {
           this.cameraImage 	= "data:image/jpeg;base64," + data;
           resolve(this.cameraImage);
        });


     });
  }

}
