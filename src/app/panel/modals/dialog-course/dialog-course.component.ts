import { Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { hiredService } from '@core/models/hiredService.model';
import { Employee } from '@core/models/employee.model';
@Component({
  selector: 'app-dialog-course',
  templateUrl: './dialog-course.component.html',
  styleUrls: ['./dialog-course.component.scss']
})
export class DialogCourseComponent  {

  selected: any;
  isShowRepairmans = false;
  repairmans: Partial<Employee>[];
  constructor(
    public dialogRef: MatDialogRef<DialogCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: hiredService) {}
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
