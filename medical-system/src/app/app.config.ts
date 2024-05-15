import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
const firebaseConfig = {
  apiKey: "AIzaSyA7R8BQJo10Ats18Jd_KmXyIMe7-8pAXzg",
  authDomain: "medical-system-80b9b.firebaseapp.com",
  projectId: "medical-system-80b9b",
  storageBucket: "medical-system-80b9b.appspot.com",
  messagingSenderId: "1012772235408",
  appId: "1:1012772235408:web:da9b3c590920c3dcb0d015",
  measurementId: "G-RH62NG2DJ4"
};


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
    importProvidersFrom([provideFirebaseApp(()=> initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(firebaseConfig)
    ])],  

};
