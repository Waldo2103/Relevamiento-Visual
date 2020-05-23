import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class Foto {
  id: Date;
  usuario: string;
  tipo: string;
  link: string;
  fecha: number;
  votos: Array<string>;
}

const FOTOS_KEY = 'mis_fotos';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  addFoto(foto: Foto): Promise<any>{
    return this.storage.get(FOTOS_KEY).then((fotos: Foto[])=> {
      if(fotos){
        fotos.push(foto);
        return this.storage.set(FOTOS_KEY, [foto]);
      } else{
        return this.storage.set(FOTOS_KEY, [foto]);
      }
    });
  }

  getFotos(): Promise<Foto[]>{
    return this.storage.get(FOTOS_KEY);
  }

  updateFoto(foto: Foto){
    return this.storage.get(FOTOS_KEY).then((fotos: Foto[])=> {
      if( !fotos || fotos.length === 0){
        return null;
      } 
      let newFotos: Foto[] = [];
      for (let i of fotos) {
        
        if (i.id === foto.id) {
          newFotos.push(foto);  
        } else {
          newFotos.push(i);
        }        
      }

      return this.storage.set(FOTOS_KEY, newFotos);
    });
  }

  deleteFoto(id: number): Promise<Foto>{
    return this.storage.get(FOTOS_KEY).then((fotos: Foto[])=> {
      if( !fotos || fotos.length === 0){
        return null;
      } 
      let tooKeep: Foto[] = [];

      for (let i of fotos) {
        
       // if (i.id === id) {
          tooKeep.push(i);  
       // }      
      }

      return this.storage.set(FOTOS_KEY, tooKeep);
    });
  }
}
