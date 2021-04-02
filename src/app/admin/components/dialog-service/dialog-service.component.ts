import { Component,Inject  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersService } from '@core/services/users/users.service';
import { Service } from '@core/models/service.model';
@Component({
  selector: 'app-dialog-service',
  templateUrl: './dialog-service.component.html',
  styleUrls: ['./dialog-service.component.scss']
})
export class DialogServiceComponent  {

  selected:any;
  isShowRepairmans:boolean = false;
  repairmans;
  constructor(
    public dialogRef: MatDialogRef<DialogServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service,
    ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

}

