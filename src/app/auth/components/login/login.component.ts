import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  buttonValid : boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
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
        this.router.navigate(['']);
      });
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
  loginApi(){
    this.authService.loginRestApi('alejandro@alejo.com', '123456')
    .subscribe(data => {
      console.log(data);
    });
  }

  seeIfEmail(): boolean{
    return this.form.get('email').invalid && this.form.get('email').dirty  ;
  }
}
