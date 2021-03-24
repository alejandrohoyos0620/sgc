import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {errorMessages} from '@utils/validators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {throwError} from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  buttonValid : boolean;
  typePassword ="password";
  errors = errorMessages;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    ) {
    this.buildForm();
    this.buttonValid = false;
  }

  ngOnInit(): void {
  }

  login(event: Event): void {
    event.preventDefault();
     if (this.form.valid){
      const value = this.form.value;
      this.authService.login(value.email, value.password)
      .subscribe((data) => {
        console.log(data);
        this.toastr.success("Correcto inicio de sesión");
        this.router.navigate(['']);
      }, error=>{
        this.toastr.error(error.error.message);
      })
     }
  }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  register() {
    this.router.navigate(['/auth/register']);
  }
  // loginApi(){
  //   this.authService.loginRestApi('alejandro@alejo.com', '123456')
  //   .subscribe(data => {
  //     console.log(data);
  //   });
  // }

  seeIfEmail(): boolean{
    return this.form.get('email').invalid && this.form.get('email').dirty  ;
  }
  lookPassword(){
    if(this.typePassword === 'password'){
      this.typePassword = 'text';
    }
    else{
      this.typePassword = 'password';
    }
    
  }
}
