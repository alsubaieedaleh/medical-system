import { Component, OnInit, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { addDoc,collection ,doc,getDoc} from 'firebase/firestore';
import { Observable, async } from 'rxjs';
import { Patient } from '../patient.interface';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackupComponent } from "../backup/backup.component";
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, ReactiveFormsModule, BackupComponent]
})
export class HomeComponent implements OnInit{
  infoForm!:FormGroup;
  doc$: Observable<any> | undefined;
  authSerice = inject(AuthService);
  editing = false;
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { }

  user: Patient={
    name: '',
    email: '',
    patientId: '',
    phoneNumber: 0,
    address: '',
    dob: ''
  };
  
  

  

     async ngOnInit() {
      if(localStorage.getItem('id') ){
        const id =localStorage.getItem('id') as string;
        console.log(id);
        this.authSerice.getUser(id).then((data) => {
        this.user = data;
        console.log(data);
      })
      
    }
    else{
      console.log('No user found'); 
    }

    this.infoForm = new FormGroup({
      name: new FormControl(this.user.name),
      email: new FormControl(this.user.email),
      phoneNumber: new FormControl(this.user.phoneNumber),
      address: new FormControl(this.user.address),
      dob: new FormControl(this.user.dob)
    });
  }
  editingClicked(){
    this.editing = true;
  };
  saveChanges(
   
  ){
    this.authSerice.updateUser(localStorage.getItem('id') as string, this.infoForm.getRawValue() as Patient
    ).then(() => {
      console.log('User updated');
    }    
  );
  this.editing = false;
}
}


