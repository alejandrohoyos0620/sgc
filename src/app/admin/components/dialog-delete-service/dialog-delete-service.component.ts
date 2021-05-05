import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-delete-service',
  templateUrl: './dialog-delete-service.component.html',
  styleUrls: ['./dialog-delete-service.component.scss']
})
export class DialogDeleteServiceComponent {
  selected: any;
  isShowRepairmans = false;
  repairmans;
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteServiceComponent>,
  ) { }
  onNoClick(status: boolean): void {
    this.dialogRef.close(status);
  }

}
