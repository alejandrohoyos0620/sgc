import { Injectable } from '@angular/core';
import {TokenService} from './token.service';
import {tap} from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private token: TokenService,
   
  ) { }

  createUser(fullName: string, phone: string, city: string, address: string, email: string, password: string): any
  {
    return this.http.post(`${environment.url_api}/customers/register`, {
      fullName,
      phone,
      city,
      address,
      email,
      password,
    });
  //return this.af.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): any{
    return this.http.post(`${environment.url_api}/customers/login`, {
      email,
      password,
    })
    .pipe(
      // tslint:disable-next-line: deprecation
      tap((data: {token: string}) => {
        const token = data.token;
        this.token.saveToken(token);
        
      })
    );
  //return this.af.signInWithEmailAndPassword(email, password);
  }

  logout(): any{
  //return this.af.signOut();
  }

  hasUser(): any{
  //return this.af.authState;
  }

  loginRestApi(email: string, password: string) {
    return this.http.post('http://localhost:3000/api/customers/login', {
      email: "email",
      password : "password",
    })
    .pipe(
      // tslint:disable-next-line: deprecation
      tap((data: {token: string}) => {
        const token = data.token;
        this.token.saveToken(token)
      })
    );
  }
}
