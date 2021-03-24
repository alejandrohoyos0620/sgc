import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { 
  }

  saveToken(token: string){
    localStorage.setItem('token', token);
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
