import { Injectable } from '@angular/core';
import {UsersService} from './users/users.service';
import decode from 'jwt-decode';
import { EstablishmentService } from './establishments/establishment.service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private usersService: UsersService,
    private establishmentService: EstablishmentService
  ) {}
  saveToken(token: string): any{
    localStorage.setItem('token', token);
    this.saveUser(token);
    this.saveEstablishment(token);
  }
  saveEstablishment(token: string): any{
    if (token !== '' && token !== undefined && token !== null) {
      const tokenPayload: any = decode(token);
      this.establishmentService.saveEstablishment(tokenPayload);
    }
  }
  saveUser(token: string): any{
    if (token !== '' && token !== undefined && token !== null) {
      const tokenPayload: any = decode(token);
      this.usersService.saveUser(tokenPayload);
    }
  }
  getToken(): any{
    return localStorage.getItem('token');
  }
  deleteToken(): any{
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
  }
  isTokenWrite(): any{
    return (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) ? true : false;
  }
}
