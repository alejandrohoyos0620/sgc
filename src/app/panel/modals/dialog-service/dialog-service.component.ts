import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { hiredService } from '@core/models/hiredService.model';
import { Employee } from '@core/models/employee.model';
import { UsersService } from '@core/services/users/users.service';
@Component({
  selector: 'app-dialog-service',
  templateUrl: './dialog-service.component.html',
  styleUrls: ['./dialog-service.component.scss']
})
export class DialogServiceComponent {

  selected: any;
  isShowRepairmans = false;
  repairmans;
  constructor(
    public dialogRef: MatDialogRef<DialogServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: hiredService,
    private userService: UsersService
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  showRepairmans(): any {
    this.isShowRepairmans = true;
    this.userService.getAllRepairmans(1).subscribe(repairmans => {
      this.repairmans = repairmans;
    }
    );
  }
}
