import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { firebaseConfig } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AngularFireAuthModule } from '@angular/fire/auth';
//import { ImageModalPageModule } from './Componentes/image-modal/image-modal.module';

//import { AngularFireStorageModule } from '@angular/fire/storage'; //COMENTADO PROBANDO DE OTRA FORMA
import { AngularFireStorage } from '@angular/fire/storage';

import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { AngularFirestore } from '@angular/fire/firestore';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    //AngularFireStorage,
    AngularFireDatabaseModule
    //ImageModalPageModule,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireStorageModule,
    AngularFireStorage,
    Camera,
    WebView,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
