import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-recovery-password',
  templateUrl: './dialog-recovery-password.component.html',
  styleUrls: ['./dialog-recovery-password.component.scss']
})
export class DialogRecoveryPasswordComponent implements OnInit {
  form: FormGroup;
  loader= false;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogRecoveryPasswordComponent>,
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
    });
  }
  saveRecovery(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      this.loader = true;
      this.authService.recoveryPassword(this.form.value.email).subscribe(response => {
        this.loader = false;
        if (response.status == "success") {
          this.toastr.success(response.message);
          this.onNoClick();
        } else {
          this.toastr.error(response.message);
        }
      });
    } else {
      this.toastr.error("Debe ingresar un correo para la recuperación.")
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
