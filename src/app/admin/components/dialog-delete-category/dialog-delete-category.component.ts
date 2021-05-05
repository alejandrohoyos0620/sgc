import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-delete-category',
  templateUrl: './dialog-delete-category.component.html',
  styleUrls: ['./dialog-delete-category.component.scss']
})
export class DialogDeleteCategoryComponent {
  selected: any;
  isShowRepairmans = false;
  repairmans;
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteCategoryComponent>,
  ) { }
  onNoClick(status: boolean): void {
    this.dialogRef.close(status);
  }

}
