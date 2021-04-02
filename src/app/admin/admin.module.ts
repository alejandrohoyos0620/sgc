import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from '@material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import {ServiceListComponent} from './components/service-list/service-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ServiceEditComponent } from './components/service-edit/service-edit.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { DialogServiceComponent } from './components/dialog-service/dialog-service.component';
import { DialogProductComponent } from './components/dialog-product/dialog-product.component';

@NgModule({
  declarations: [NavComponent, ServiceListComponent, ProductEditComponent, ServiceEditComponent, ServiceFormComponent, ProductFormComponent, DialogServiceComponent, DialogProductComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
  ]
})
export class AdminModule { }
