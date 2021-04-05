import { Component,Inject  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersService } from '@core/services/users/users.service';
import { Service } from '@core/models/service.model';
@Component({
  selector: 'app-dialog-delete-service',
  templateUrl: './dialog-delete-service.component.html',
  styleUrls: ['./dialog-delete-service.component.scss']
})
export class DialogDeleteServiceComponent {

  selected:any;
  isShowRepairmans:boolean = false;
  repairmans;
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteServiceComponent>,
    ) {}
  onNoClick(status:Boolean): void {
    this.dialogRef.close(status);
  }

}
