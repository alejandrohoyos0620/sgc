import { Component, Input, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { matDrawerAnimations } from '@angular/material/sidenav';
import {User} from '@core/models/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFiller = false ;
  user:User ={
    name:"Alejandro Hoyos Hernández",
    address:"Calle 65E #40-52",
    city:"Manizales, Caldas",
    phone:"3136509765",
    email:"alejandro@alejo.com"
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
