import { Injectable } from '@angular/core';
import { Customer } from '@core/models/customer.model';
import{UsersService} from './users/users.service';
import { Employee } from '@core/models/employee.model';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private usersService: UsersService
  ) { 
  }

  saveToken(token: string){
    localStorage.setItem('token', token);
    this.saveUser(token);
  }
  
  saveUser(token: string) {
    if (token !== '' && token !== undefined && token !== null) {
      const tokenPayload: any = decode(token);
      this.usersService.saveUser(tokenPayload);
    }
  }
  getToken(){
    return localStorage.getItem('token');
  }
  deleteToken(){
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
  }
  isTokenWrite(){
    return (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) ? true: false;
  }

}
