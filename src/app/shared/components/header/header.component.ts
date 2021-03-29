import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { UsersService } from '@core/services/users/users.service';
import { Customer } from '@core/models/customer.model';
import { DialogOverviewExampleDialog } from './../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Employee } from '@core/models/employee.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  user$: Observable<Partial<Customer> | Partial<Employee>>;
  showFiller = false;
  isEditable = false;
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private usersService: UsersService
  ) { 
    this.user$ = usersService.user$;
  }


  ngOnInit(): void {
  }

  hasUser() {
    if (this.authService.hasUser()) {
      if(!this.usersService.hasUser()){
      this.usersService.getUser();
    }
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
      width: '400px',
      height: '400px',
      disableClose: true,
      data: this.user$
    });

    dialogRef.afterClosed().subscribe(result => {
      this.authService.updateUser(result.source)
        .subscribe((data) => {
          console.log("Usuario del update");
          console.log(data);
          this.usersService.updateUser(data);
          this.toastr.success("Tu actualziación ha sido exitosa");
        });
        
    })
  }
}
