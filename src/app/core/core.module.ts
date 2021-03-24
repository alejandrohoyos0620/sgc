import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideServicesService } from './services/hiredServices/hide-services.service';
import { UsersService } from './services/users/users.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HideServicesService,
    UsersService
  ]
})
export class CoreModule { }
