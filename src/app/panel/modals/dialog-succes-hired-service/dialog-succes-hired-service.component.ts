import { Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogNewServiceComponent } from '../dialog-new-service/dialog-new-service.component';

@Component({
  selector: 'app-dialog-succes-hired-service',
  templateUrl: './dialog-succes-hired-service.component.html',
  styleUrls: ['./dialog-succes-hired-service.component.scss']
})
export class DialogSuccesHiredServiceComponent {
  deliver = 0;
  pickup = 0;
  datos = [];
  constructor(
    public dialogRef: MatDialogRef<DialogSuccesHiredServiceComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
