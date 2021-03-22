import { Component, Input, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import {Customer} from '@core/models/customer.model';
import {DialogOverviewExampleDialog} from './../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  
  animal: string;
  name: string;
  showFiller = false;
  isEditable = false;
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
    public dialog: MatDialog
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
  changeEditable(){
    if(this.isEditable)
    {
      this.isEditable = false;
    }
    else{
      this.isEditable = true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: this.customer
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
