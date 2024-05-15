import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ConformationPageComponent } from './conformation-page/conformation-page.component';

export const routes: Routes = [
    { path: 'signin', component: SigninComponent },
    {path:'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'conformation-page', component: ConformationPageComponent},
    {path: '', redirectTo: '/signin', pathMatch: 'full'}
    // ... other routes
];
