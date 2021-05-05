import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '@core/models/category.model';
@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent {
  selected: any;
  isShowRepairmans = false;
  repairmans;
  constructor(
    public dialogRef: MatDialogRef<DialogCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
