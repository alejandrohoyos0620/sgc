import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HireServicesService } from './services/hiredServices/hire-services.service';
import { UsersService } from './services/users/users.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HireServicesService,
    UsersService
  ]
})
export class CoreModule { }
