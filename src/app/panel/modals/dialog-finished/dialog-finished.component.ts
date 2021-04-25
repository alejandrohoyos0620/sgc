import { Component,Inject  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { hiredService } from '@core/models/hiredService.model';
import { Employee } from '@core/models/employee.model';
@Component({
  selector: 'app-dialog-finished',
  templateUrl: './dialog-finished.component.html',
  styleUrls: ['./dialog-finished.component.scss']
})
export class DialogFinishedComponent {
  selected:any;
  isShowRepairmans:boolean = false;
  repairmans:Partial<Employee>[];
  constructor(
    public dialogRef: MatDialogRef<DialogFinishedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<hiredService>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
