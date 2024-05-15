import { NgIf } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  router = inject(Router);
  errorMessage = '';
  authService = inject(AuthService);
  winRef: any;
  VerifyCode: any;
  OTP: any;
  isSent = false;


  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(6)),
      phoneNo: new FormControl('', Validators.minLength(10)),
    });
  }
  onSubmit() {

    const rawForm = this.signInForm.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error: { message: string }) => {
        this.errorMessage = error.message;
      },
    });
  }

}