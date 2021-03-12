import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  register(event: Event): void {
     event.preventDefault();
     if (this.form.valid) {
       const value = this.form.value;
       this.authService.createUser(value.firstName, 
                                    value.lastName, 
                                    value.phone, 
                                    value.city, 
                                    value.address, 
                                    value.email, 
                                    value.password)
       .subscribe((data) => {
         console.log(data);
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
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

}
