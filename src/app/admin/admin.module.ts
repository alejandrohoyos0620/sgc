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
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { SharedModule } from '@shared/shared.module';
import { DialogDeleteServiceComponent } from './components/dialog-delete-service/dialog-delete-service.component';
import { DialogDeleteCategoryComponent } from './components/dialog-delete-category/dialog-delete-category.component';
import { DialogCategoryComponent } from './components/dialog-category/dialog-category.component';

@NgModule({
  declarations: [NavComponent, ServiceListComponent, ProductEditComponent, ServiceEditComponent, ServiceFormComponent, ProductFormComponent, DialogServiceComponent, DialogProductComponent, CategoryListComponent, CategoryEditComponent, CategoryFormComponent, DialogDeleteServiceComponent, DialogDeleteCategoryComponent, DialogCategoryComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    SharedModule
  ]
})
export class AdminModule { }
