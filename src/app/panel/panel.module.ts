import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelComponent} from './components/panel/panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import {MaterialModule} from './../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DialogServiceComponent } from './components/dialog-service/dialog-service.component';
import { DialogApproveComponent } from './components/dialog-approve/dialog-approve.component';
import { DialogFinishedComponent } from './components/dialog-finished/dialog-finished.component';
import { DialogCourseComponent } from './components/dialog-course/dialog-course.component';
import { DialogCustomerComponent } from './components/dialog-customer/dialog-customer.component';
import { DialogNewServiceComponent } from './components/dialog-new-service/dialog-new-service.component';

@NgModule({
  declarations: [
    PanelComponent,
    DialogServiceComponent,
    DialogApproveComponent,
    DialogFinishedComponent,
    DialogCourseComponent,
    DialogCustomerComponent,
    DialogNewServiceComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PanelModule { }
