import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { errorMessages, validateIfMatch } from '@utils/validators';
@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.scss']
})
export class DialogForgotPasswordComponent implements OnInit {
  form: FormGroup;
  errors = errorMessages;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogForgotPasswordComponent>,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validators: validateIfMatch
    });
  }
  seeIfMatch(): boolean {
    return this.form.hasError('noSonIguales') &&
      this.form.get('password').dirty &&
      this.form.get('confirmPassword').dirty;
  }
  saveRecovery(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      this.authService.forgotPassword(this.form.value.email, this.form.value.code, this.form.value.password).subscribe(response => {
        if (response.status == "success") {
          this.toastr.success("Se actualizó exitosamente la contraseña");
          this.onNoClick();
        } else {
          this.toastr.error(response.message);
        }
      });
    } else {
      this.toastr.error("Debe ingresar todos los datos para hacer la recuperación")
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
