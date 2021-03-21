import { Component, Input, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { matDrawerAnimations } from '@angular/material/sidenav';
import {Customer} from '@core/models/customer.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFiller = false ;
  customer:Customer ={
    fullName:"Alejandro Hoyos Hernández",
    address:"Calle 65E #40-52",
    city:"Manizales, Caldas",
    phone:"3136509765",
    email:"alejandro@alejo.com",
    password: "12345678"
  }
  constructor(
    private authService: AuthService,
  ) {}
  

  ngOnInit(): void {
  }
  hasUser(){
    return this.authService.hasUserRole('customer'); 
  }
  logout(){
   this.authService.logout();
   console.log("se salió")
  }
}
