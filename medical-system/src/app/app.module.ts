import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { BackupComponent } from './backup/backup.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http'; // Import HttpClientModule
import { BackupService } from './backup.service';

@NgModule({
  declarations: [
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [BackupService],
  bootstrap: []
})
export class AppModule { }