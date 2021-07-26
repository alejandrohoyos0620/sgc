import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { errorMessages } from '@utils/validators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '@core/services/users/users.service';
import { DialogRecoveryPasswordComponent } from '../dialog-recovery-password/dialog-recovery-password.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogForgotPasswordComponent } from '../dialog-forgot-password/dialog-forgot-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  buttonValid: boolean;
  typePassword = 'password';
  errors = errorMessages;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private usersService: UsersService,
    public dialog: MatDialog,
  ) {
    this.buildForm();
    this.buttonValid = false;
  }

  ngOnInit(): void {
  }

  login(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.login(value.email, value.password)
        .subscribe((data) => {
          this.toastr.success('Correcto inicio de sesión');
          this.usersService.getUser();
          this.router.navigate(['']);
        }, error => {
          this.toastr.error(error.error.message);
        });
    }
  }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  register(): any{
    this.router.navigate(['/auth/register']);
  }

  seeIfEmail(): boolean {
    return this.form.get('email').invalid && this.form.get('email').dirty;
  }
  lookPassword(): any{
    if (this.typePassword === 'password') {
      this.typePassword = 'text';
    }
    else {
      this.typePassword = 'password';
    }

  }
  openModalRecovery(){
    const dialogRef = this.dialog.open(DialogRecoveryPasswordComponent, {
      width: '750px',
      height: '400px',
      disableClose: false,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.openModalForgot();
    });
  }

  openModalForgot(){
    const dialogRef = this.dialog.open(DialogForgotPasswordComponent, {
      width: '750px',
      height: '800px',
      disableClose: false,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(() => {
      
    });
  }
}
