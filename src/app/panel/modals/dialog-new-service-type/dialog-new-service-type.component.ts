import { Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogNewServiceComponent } from '../dialog-new-service/dialog-new-service.component';

@Component({
  selector: 'app-dialog-new-service-type',
  templateUrl: './dialog-new-service-type.component.html',
  styleUrls: ['./dialog-new-service-type.component.scss']
})
export class DialogNewServiceTypeComponent {
  deliver = 0;
  pickup = 0;
  datos = [];
  constructor(
    public dialogRef: MatDialogRef<DialogNewServiceTypeComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string
  ){
    this.datos[0] = data;
    console.log(data);
  }

  changeSelected(value: string): any{
    if (value === 'delivery'){
      this.deliver = 1;
      this.pickup = 0;
      this.datos[1] = 'delivery';
      this.newService();
    }else if (value === 'pickup'){
      this.deliver = 0;
      this.pickup = 1;
      this.datos[1] = 'pickup';
      this.newService();
    }
  }
  newService(): any{
    const dialogRef = this.dialog.open(DialogNewServiceComponent, {
      width: '830px',
      height: '900px',
      disableClose: true,
      autoFocus: false,
      data: this.datos
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close();
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
