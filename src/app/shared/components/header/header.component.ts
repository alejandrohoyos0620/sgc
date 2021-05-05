import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { UsersService } from '@core/services/users/users.service';
import { Customer } from '@core/models/customer.model';
import { DialogOverviewExampleDialog } from './../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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

  hasUser(): any {
    if (this.authService.hasUser()) {
      if (!this.usersService.hasUser()) {
        this.usersService.getUser();
      }
      return true;
    }
    else {
      return false;
    }
  }

  isUserCustomer(): any{
    if (this.authService.hasUserRole('administrator') || this.authService.hasUserRole('repairman'))
    {
      return false;
    }
    else if (this.authService.hasUser){
      return true;
    }
    else {
      return false;
    }
  }
  hasUserRole(role: string): any {
    if (this.authService.hasUserRole(role)) {
      return true;
    }
    else {
      return false;
    }
  }

  logout(): any {
    this.authService.logout();
  }

  changeEditable(): any {
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
      if (result) {
        this.authService.updateUser(result.source)
          .subscribe((data) => {
            this.usersService.updateUser(data);
            this.toastr.success('Tu actualziación ha sido exitosa');
          });
      }
    });
  }
}
