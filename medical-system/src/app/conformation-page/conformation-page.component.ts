import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-conformation-page',
  standalone: true,
  imports: [],
  templateUrl: './conformation-page.component.html',
  styleUrl: './conformation-page.component.css'
})
export class ConformationPageComponent {
  constructor(private router: Router) {}
  redirect(){
    this.router.navigate(['/signin']);
  }
}
