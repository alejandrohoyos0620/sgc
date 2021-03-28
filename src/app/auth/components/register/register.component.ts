import { Component, OnInit } from '@angular/core';
import {errorMessages, validateIfMatch} from '@utils/validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Customer} from '@core/models/customer.model';
import { AuthService } from '@core/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  errors = errorMessages;
  customer: Partial<Customer>;
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
      const fullName = `${value.firstName} ${value.lastName}`;
      this.customer = {
        fullName: fullName,
        address: value.address,
        city: value.city,
        phone: value.phone,
        email: value.email,
        password: value.password
      };
      this.authService.createUser(this.customer)
        .subscribe((data) => {
          console.log(data);
          this.toastr.success("Tu registro se ha almacenado satisfactoriamente");
          this.router.navigate(['']);
        });
    }
  }
  
  private buildForm(): void {
    this.form = this.formBuilder.group({///^([a-zA-Z ]|ñ|Ñ)*$/
      firstName: ['', [Validators.required, Validators.pattern(/^(\w|ñ|Ñ|á|é|í|ó|ú)+(\s{1,1}(\w|ñ|Ñ|á|é|í|ó|ú)+){0,1}$/)]],  
      lastName: ['', [Validators.required, Validators.pattern(/^(\w|ñ|Ñ|á|é|í|ó|ú)+(\s{1,1}(\w|ñ|Ñ|á|é|í|ó|ú)+){0,1}$/)]],
      phone: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(15), Validators.pattern('([0-9]| |[+]|[-])*')]],
      city: ['', [Validators.required,  Validators.pattern(/^([a-zA-Z ]|ñ|Ñ|á|é|í|ó|ú|,)*$/)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(15),  Validators.pattern(/^(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)]],
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
  validFormFName(): boolean{
    return this.form.get('firstName').invalid && this.form.get('firstName').dirty  ;
  }
  validFormLName(): boolean{
    return this.form.get('lastName').invalid && this.form.get('lastName').dirty  ;
  }
  validPassword(): boolean{
    return this.form.get('password').invalid && this.form.get('password').dirty  ;
  }
  validFormPhone(): boolean{
    return this.form.get('phone').invalid && this.form.get('phone').dirty  ;
  }
  validFormCity(): boolean{
    return this.form.get('city').invalid && this.form.get('city').dirty  ;
  }
  showToaster(){
    this.toastr.success("Hello, I'm the toastr message.")
  }

}
