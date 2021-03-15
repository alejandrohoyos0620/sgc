import { Injectable } from '@angular/core';
import {TokenService} from './token.service';
import {tap} from 'rxjs/operators';
//import { JwtHelperService } from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private token: TokenService,
   // public jwtHelper: JwtHelperService
   
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
    const token = this.token.getToken();
    // Check whether the token is expired and return
    // true or false
    //return !this.jwtHelper.isTokenExpired(token);
    return token === '' ? false : true;
  }

  loginRestApi(email: string, password: string) {
    return this.http.post('https://platzi-store.herokuapp.com/auth', {
      email,
      password
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
