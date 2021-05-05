import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '@core/models/service.model';
@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent {
  selected: any;
  isShowRepairmans = false;
  repairmans;
  constructor(
    public dialogRef: MatDialogRef<DialogProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
