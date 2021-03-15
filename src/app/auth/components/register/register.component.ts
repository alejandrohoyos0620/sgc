import { Component, OnInit } from '@angular/core';
import {MyValidators, validateIfMatch} from '@utils/validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@core/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  register(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      const fullName = `${value.firstName} ${value.lastName}`
      this.authService.createUser(fullName,
        value.phone,
        value.city,
        value.address,
        value.email,
        value.password)
        .subscribe((data) => {
          console.log(data);
          this.toastr.success("Tu registro se ha almacenado satisfactoriamente");
          this.router.navigate(['/auth/login']);
        });
    }
    console.log("Registró");
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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

  seeIfEmail(): boolean{
    return this.form.get('email').invalid && this.form.get('email').dirty  ;
  }
 
  showToaster(){
    this.toastr.success("Hello, I'm the toastr message.")
  }

}
