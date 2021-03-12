import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;  
  constructor(private formBuilder: FormBuilder,
    private router: Router,) { this.buildForm();}

  ngOnInit(): void {
  }
  login(event: Event): void {
    event.preventDefault();
    // if (this.form.valid){
    //   const value = this.form.value;
    //   this.authService.login(value.email, value.password).
    //   then(() => {
    //     this.router.navigate(['/admin']);
    //   })
    //   .catch(() => {
    //     alert('No es valido');
    //   });
   // }
   console.log("Entro acá")
    }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
