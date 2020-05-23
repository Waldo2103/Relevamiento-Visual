import { Component, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
//import { ImageModalPage } from '../image-modal/image-modal.page';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/storage';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { FirebaseService } from '../../servicios/firebase.service';
import { FotosService } from '../../servicios/fotos.service';
import { StorageService, Foto } from '../../servicios/storage/storage.service';

import { storage } from "firebase";
import { ToastController } from '@ionic/angular';
import { DataService } from '../../servicios/data/data.service';



@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage  {

  fotos: Foto[] = [];
  newFoto: Foto = <Foto>{};
  storageRef: AngularFireStorageModule;
  image: string;
  fotosArray: Array<string>;

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20,
    cssMode: true,
    color: "dark"
  };

  constructor(private camara: Camera,
    private webView: WebView,
    private modalController: ModalController,
    private storage: AngularFireStorage,
    private firebase: FirebaseService,
    private fotoServ: FotosService,
    private storageService: StorageService,
    private plt: Platform,
    private toastController: ToastController
  ) {
    this.plt.ready().then(() => {
      this.loadFotos();
    });
   }

  addFoto(){
    //his.newFoto.id = Date.now();
    this.storageService.addFoto(this.newFoto).then(foto => {
      this.newFoto = <Foto>{};
      this.presentToast();
      this.loadFotos();
    });
  }
  getFotos(){
    this.storageService.getFotos()
  }

  loadFotos(){
    this.storageService.getFotos().then(fotos => {
      this.fotos = fotos;
    });
  }


  TraerFotos(){

  }

  async takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camara.DestinationType.DATA_URL, //FILE_URI
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
      //sourceType: this.camara.PictureSourceType.CAMERA
    };
    const resul = await this.camara.getPicture(options);
    const image = `data:image/jpeg;base64,${resul}`;
    const pictures  = storage().ref(`cosasLindas/${localStorage.getItem("usuario")}_${(new Date()).getTime()}`);//cosasLindas/"+localStorage.getItem("usuario")+"_"+(new Date()).getTime());
    pictures.putString(image, 'data_url');
    this.addFoto();
    this.getFotos();
    /*.then((imageData) => {
      this.image = this.webView.convertFileSrc(imageData);
      this.fotoServ.subirFoto(this.image, 'cosasLindas',(new Date()).getTime());
      
    }, (err) => {
      console.log(err);
    });*/
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se agregó correctamente',
      duration: 2000,
      color: "primary"
    });
    toast.present();
  }

  addFoto2(){

  }

  uploadInformation(text){

  }

  viewFoto(){

  }
  
  

}
