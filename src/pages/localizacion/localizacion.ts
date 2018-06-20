import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController, Loading } from 'ionic-angular';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import { Geolocation} from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions
 } from '@ionic-native/google-maps';
 import { AngularFireList,AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'page-localizacion',
  templateUrl: 'localizacion.html'

})
export class LocalizacionPage {
  
  map: GoogleMap;
  myPosition: any = {};
  ubicaciones: AngularFireList<any>;
  public listares : Array<any>;
  public listares1 : Array<any>;
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,public geolocation: Geolocation,
    private loadCtrl: LoadingController,
    public db: AngularFireDatabase) { 
        this.ubicaciones=this.db.list('tiendas/');
        this.ubicaciones.snapshotChanges().subscribe(rs=>{
          this.listares=[];
          rs.forEach(f=>{
            this.listares.push({
              latitud:f.payload.val().latitud,
              longitud:f.payload.val().longitud,
              title: f.payload.val().nombretienda,
              image: f.payload.val().image
            })
            console.log(f.payload.val().nombretienda)
          })
          console.log(this.listares)
        })

    }

    inicializarItems(): void{
      this.listares1= this.listares;
      
   }

  ionViewDidLoad(){
 
    this.loading = this.loadCtrl.create({
      content: 'Cargando ubicación. Espere...'
    });
    this.loading.present();
    this.getCurrentPosition();
    
  }

  getCurrentPosition(){
    this.inicializarItems();
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.myPosition = {
        latitud: position.coords.latitude,
        longitud: position.coords.longitude
      }
      this.loadMap();
      this.loading.dismiss();
    })
    .catch(error=>{
      console.log(error);
    })
  }

  loadMap(){
    this.inicializarItems();
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = GoogleMaps.create(element);

    // create CameraPosition
    let position: CameraPosition<LatLng> = {
      target: new LatLng(this.myPosition.latitud, this.myPosition.longitud),
      zoom: 12,
      tilt: 30
    };
    console.log(this.myPosition.latitud);
    console.log(this.myPosition.longitud);
    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.animateCamera(position);

      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Aquí estás"
      };
      
      this.addMarker1(markerOptions);

      for (let _i = 0; _i < this.listares.length; _i++) {
         this.addMarker(this.listares[_i]);
         console.log(this.listares[_i])
      }
     // this.listares.forEach(marker=>{
       // this.addMarker(marker);
      //});
      
      
    });
  }
  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.latitud, options.longitud),
      title: options.title,
      icon: options.image,
      animation: 'DROP'
    };
    this.map.addMarker(markerOptions);
  }
  addMarker1(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitud, options.position.longitud),
      title: options.title,
      icon: 'blue',
      animation: 'DROP'
    };
    this.map.addMarker(markerOptions);
  }




  

}
