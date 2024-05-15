import { Component } from '@angular/core';
import { BackupService } from '../backup.service';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [],
  templateUrl: './backup.component.html',
  styleUrl: './backup.component.css'
})
export class BackupComponent {
  constructor(private backupService: BackupService) { }

 triggerBackup() {
  this.backupService.triggerBackup().subscribe(response => {
    console.log('Backup triggered', response);
  }, error => {
    console.error('Error triggering backup', error);
  });
}
}
