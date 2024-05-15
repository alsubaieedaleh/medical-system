import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninComponent } from "./signin/signin.component";
import { BackupComponent } from './backup/backup.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SigninComponent]
})
export class AppComponent {
  title = 'medical-system';
}
