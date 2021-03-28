import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelComponent} from './components/panel/panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import {MaterialModule} from './../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DialogServiceComponent } from './components/dialog-service/dialog-service.component';

@NgModule({
  declarations: [
    PanelComponent,
    DialogServiceComponent
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
