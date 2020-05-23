import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase, private afStorage: AngularFireStorage) { }

  /*getFotos(){
    let ref = this.db.list('fotos');

    return ref.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }*/

  uploadToStorage(information): AngularFireUploadTask{
    let newName = `${localStorage.getItem("usuario")}_${(new Date()).getTime()}.jpeg`;
    return this.afStorage.ref(`cosasLindas/${newName}`).putString(information);
  }

  storeInfoToDatabase(metainfo){
    let toSave = {
      id: metainfo.timeCreated,
      url: metainfo.downloadURLs[0],
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType
    }
    return this.db.list('cosasLindas').push(toSave);
  }

}
