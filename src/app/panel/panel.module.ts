import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelComponent} from './components/panel/panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import {MaterialModule} from './../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DialogServiceComponent } from './modals/dialog-service/dialog-service.component';
import { DialogApproveComponent } from './modals/dialog-approve/dialog-approve.component';
import { DialogFinishedComponent } from './modals/dialog-finished/dialog-finished.component';
import { DialogCourseComponent } from './modals/dialog-course/dialog-course.component';
import { DialogCustomerComponent } from './modals/dialog-customer/dialog-customer.component';
import { DialogNewServiceComponent } from './modals/dialog-new-service/dialog-new-service.component';
import { DialogNewServiceTypeComponent } from './modals/dialog-new-service-type/dialog-new-service-type.component';
import { DialogNewDeviceComponent } from './modals/dialog-new-device/dialog-new-device.component';
import { DialogSuccesHiredServiceComponent } from './modals/dialog-succes-hired-service/dialog-succes-hired-service.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    PanelComponent,
    DialogServiceComponent,
    DialogApproveComponent,
    DialogFinishedComponent,
    DialogCourseComponent,
    DialogCustomerComponent,
    DialogNewServiceComponent,
    DialogNewServiceTypeComponent,
    DialogNewDeviceComponent,
    DialogSuccesHiredServiceComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class PanelModule { }
