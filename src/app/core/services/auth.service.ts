import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, tap } from 'rxjs/operators';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import decode from 'jwt-decode';
import { BehaviorSubject, Observable, throwError, } from 'rxjs';
import { map} from 'rxjs/operators';
import { Customer } from '@core/models/customer.model';
import { UsersService } from './users/users.service';
import { Employee } from '@core/models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private token: TokenService,
    private userService: UsersService
    // public jwtHelper: JwtHelperService

  ) { }

  createUser(customer: Partial<Customer>): any {
    return this.http.post(`${environment.url_api}/users/register`, customer);
    // return this.af.createUserWithEmailAndPassword(email, password);
  }

  updateUser(user$: BehaviorSubject<Partial<Employee> | Partial<Customer>>): any{
    return this.http.put(`${environment.url_api}/users/update`, user$.getValue()).
    pipe(
    map((data: {updatedUser: {}}) => data.updatedUser)
    );
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
        })
      );
  }

  logout(): any {
    this.token.deleteToken();
  }

  hasUser(): any {
    const token = this.token.getToken();
    if (token !== '' && token !== undefined && token !== null) {
      return true;
    }
    return false;
  }

  hasUserRole(expectedRole: string): any {
    const constpectedRole = expectedRole;
    const token = this.token.getToken();
    if (token !== '' && token !== undefined && token !== null) {
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
  }
}
