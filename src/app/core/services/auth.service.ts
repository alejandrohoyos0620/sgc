import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, tap } from 'rxjs/operators';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import decode from 'jwt-decode';
import {throwError} from 'rxjs';
import { Customer } from '@core/models/customer.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private token: TokenService,
    // public jwtHelper: JwtHelperService

  ) { }

  createUser(customer: Customer): any {
    return this.http.post(`${environment.url_api}/customers/register`, customer);
    //return this.af.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): any {
    return this.http.post(`${environment.url_api}/auth`, {
      email,
      password,
    })
      .pipe(
        // tslint:disable-next-line: deprecation
        tap((data: { token: string }) => {
          const token = data.token;
          this.token.saveToken(token);
          console.log(data);
        })
      );
    //return this.af.signInWithEmailAndPassword(email, password);
  }

  logout(): any {
    this.token.deleteToken();
  }

  hasUser(): any {
    const token = this.token.getToken();
    return token === '' ? false : true;
  }
  hasUserRole(expectedRole: string): any {
    const constpectedRole = expectedRole;
    const token = this.token.getToken();
    if (token !== '' && token !== undefined && token !== null ) {
      const tokenPayload: any = decode(token);
      if (
        !this.hasUser() ||
        tokenPayload.role !== constpectedRole
      ) {
        return false;
      }
      return true;
    }
    return false;

    // Check whether the token is expired and return
    // true or false
    //return !this.jwtHelper.isTokenExpired(token);
    //return token === '' ? false : true;
  }

  loginRestApi(email: string, password: string) {
    return this.http.post(`${environment.url_api}/auth`, {
      email,
      password
    })
      .pipe(
        tap((data: { token: string }) => {
          const token = data.token;
          this.token.saveToken(token)
        })
      );
  }
}
