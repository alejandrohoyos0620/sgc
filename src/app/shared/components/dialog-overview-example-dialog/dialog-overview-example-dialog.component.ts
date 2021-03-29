import { Component, OnInit, Inject  } from '@angular/core';
import {Customer} from '@core/models/customer.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Employee } from '@core/models/employee.model';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.scss']
})
export class DialogOverviewExampleDialog{
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Observable<Partial<Customer> | Partial<Employee>>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
