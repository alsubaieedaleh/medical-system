import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import{ getDatabase, onValue, ref} from 'firebase/database';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  router= inject(Router);
  registerForm!: FormGroup ;

  constructor() {
  
  }
  errorMessage: string = '';
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('',Validators.email),
      password: new FormControl('',Validators.minLength(6)),
      username: new FormControl(''),
      phoneNo: new FormControl('',Validators.minLength(10), ),
      confirmPassword: new FormControl('',Validators.minLength(6)),
    });
  }

  authService = inject(AuthService);
 
  onSubmit(){


    const rawForm= this.registerForm.getRawValue();
    this.authService.register(rawForm.email, rawForm.password, rawForm.username,rawForm.phoneNo).subscribe({
      next: () => {
        // Move the console.log statement here
        this.router.navigate(['/conformation-page']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}

