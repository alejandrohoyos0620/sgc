import { Component,Inject  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { hiredService } from '@core/models/hiredService.model';
import { Employee } from '@core/models/employee.model';
@Component({
  selector: 'app-dialog-approve',
  templateUrl: './dialog-approve.component.html',
  styleUrls: ['./dialog-approve.component.scss']
})
export class DialogApproveComponent{

  selected:any;
  isShowRepairmans:boolean = false;
  repairmans:Partial<Employee>[];
  constructor(
    public dialogRef: MatDialogRef<DialogApproveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: hiredService) {}
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
