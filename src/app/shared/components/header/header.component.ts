import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { Customer } from '@core/models/customer.model';
import { DialogOverviewExampleDialog } from './../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Employee } from '@core/models/employee.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  animal: string;
  name: string;
  showFiller = false;
  isEditable = false;
  user: Partial<Customer> | Partial<Employee>;
  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
  }
  
  hasUser() {
    if (this.authService.hasUser()) {
      this.user = this.authService.getUser();
      return true;
    }
    else {
      return false;
    }
  }

  logout() {
    this.authService.logout();
    console.log("se salió")
  }

  changeEditable() {
    if (this.isEditable) {
      this.isEditable = false;
    }
    else {
      this.isEditable = true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
