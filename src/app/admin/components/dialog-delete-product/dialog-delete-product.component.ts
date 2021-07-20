import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-delete-product',
  templateUrl: './dialog-delete-product.component.html',
  styleUrls: ['./dialog-delete-product.component.scss']
})
export class DialogDeleteProductComponent {
  selected: any;
  isShowRepairmans = false;
  repairmans;
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteProductComponent>,
  ) { }

  onNoClick(status: boolean): void {
    this.dialogRef.close(status);
  }

}
