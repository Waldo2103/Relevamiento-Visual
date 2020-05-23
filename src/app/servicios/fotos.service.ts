import { Injectable } from '@angular/core';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/storage';
//import { Foto } from "../clases/foto";
import { FirebaseService } from './firebase.service';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';

export class Foto {
  id: string;
  usuario: string;
  tipo: string;
  link: string;
  fecha: number;
  votos: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  // tslint:disable: variable-name
  private _sub: Subscription;
  private _user: string = localStorage.getItem("usuario");

  constructor(
    private _fireServ: FirebaseService,
    private toastController: ToastController
    //private _modalCtrl: ModalController,
  ) { }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  private _esperando = true;
  public get esperando(): boolean {
    return this._esperando;
  }

  private _lindas: Array<Foto> = new Array<Foto>();
  public get lindas(): Array<Foto> {
    this.revisar();
    return this._lindas;
  }

  private _feas: Array<Foto> = new Array<Foto>();
  public get feas(): Array<Foto> {
    this.revisar();
    return this._feas;
  }

  private _propias: Array<Foto> = new Array<Foto>();
  public get propias(): Array<Foto> {
    this.revisar();
    return this._propias;
  }

  private revisar() {
    if (this._sub === undefined) {
      this.inicializarFotos();
    }
  }

  public destroySub() {
    if (this._sub) {
      this._propias = new Array<Foto>();
      this._sub.unsubscribe();
      this._sub = undefined;
      this._esperando = true;
    }
  }

  public inicializarFotos() {
    this._esperando = true;
    this._sub = this.traerFotos().subscribe((data: Array<Foto>) => {
      this._lindas = data.filter((f: Foto) => {
        return f.tipo === 'lindas';
      });
      this._feas = data.filter((f: Foto) => {
        return f.tipo === 'feas';
      });
      this._propias = data.filter((f: Foto) => {
        // console.log(f.usuario, this._auth.username);
        return f.usuario === this._user;
      });
      this._esperando = false;

    });
  }

  public traerFotos() {
    return this._fireServ.traertodos('relVisual').snapshotChanges().pipe(map((f) => {
      const auxChat = f.map((a) => {
        const data = a.payload.doc.data() as Foto;
        data.id = a.payload.doc.id;
        return data;
      });
      return auxChat.sort(this.ordenarFechas);
    }));
  }

  public ordenarFechas(a: Foto, b: Foto) {
    let auxReturn: number;
    if (a.fecha < b.fecha) {
      auxReturn = 1;
    } else if (a.fecha > b.fecha) {
      auxReturn = -1;
    } else {
      auxReturn = 0;
    }

    return auxReturn;
  }

  private verificarVoto(votos: Array<string>) {
    let auxReturn = false;
    for (const correo of votos) {
      if (correo === this._user) {
        auxReturn = true;
        break;
      }
    }

    return auxReturn;
  }

  private toData(foto): any {
    return {
      usuario: foto.usuario,
      link: foto.link,
      tipo: foto.tipo,
      fecha: foto.fecha,
      votos: foto.votos,
    };
  }

  public votar(foto: Foto) {
    // console.log('Voto en la foto', foto.id);

    if (!this.verificarVoto(foto.votos)) {
      // console.log('Modifico el registro');
      foto.votos.push(this._user);

      this._fireServ.actualizar('relVisual', foto.id, this.toData(foto))
        .then(() => {
          this.presentToast("Voto Agregado", "light");
          console.log('Documento Actualizado');
        }).catch((err) => {
          console.log('Error en firebase', err);
          this.presentToast("Error intente mas tarde", "danger");
        });
    } else {
      // console.log('Ya ha votado');
      this.presentToast("Ya ha votado", "dark");

    }
  }

  /*public async ver(foto: Foto, mostrarUsuario: boolean) {
    // console.log('Veo la foto', foto.id);

    await this._modalCtrl.create({
      component: FullscreenPage,
      componentProps: { foto, mostrarUsuario }
    })
      .then((modal: HTMLIonModalElement) => {
        modal.present();
      });

  }*/

  private dividirAll(picture: string): string {
    return picture.split(',', 2)[1];
  }

  private crearData(link: string, fecha: number, tipo: string) {
    return {
      fecha,
      link,
      tipo,
      usuario: localStorage.getItem("usuario"),
      votos: new Array<string>(),
    };
  }

  public subirFoto(pictureAll: string, index: number, categoria: string, date: number) {
    const pictureAux = this.dividirAll(pictureAll);
    const picName = `relVisual/${((this._user).split('@')[0])}_${date}_${index}.jpeg`;
    // console.log('Imagen', picName);

    return this._fireServ.subirArchivo(picName, pictureAux)
      .then(async (data: UploadTaskSnapshot) => {
        // console.log('Data en subirFoto, servicio Foto', data);
        const link = await data.ref.getDownloadURL();
        const registro: any = this.crearData(link, date, categoria);
        return this._fireServ.agregar('relVisual', registro)
          .catch(err => {
            console.log('error al subir a firebase', err);
          });
      });
  }
}