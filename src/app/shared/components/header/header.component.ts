import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {}
  

  ngOnInit(): void {
  }
  hasUser(){
    return this.authService.hasUserAdmin('customer'); 
  }
  logout(){
   this.authService.logout();
   console.log("se salió")
  }
}
