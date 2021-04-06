import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

import { NavComponent } from './components/nav/nav.component';
import { ServiceEditComponent } from './components/service-edit/service-edit.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';
import { ServiceListComponent } from './components/service-list/service-list.component'

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [

      {
        path: 'services',
        component: ServiceListComponent
      },
      {
        path: 'categories',
        component: CategoryListComponent
      },
      {
        path: 'products',
        //component: ProductListComponent
      },
      {
        path: 'services/create',
        component: ServiceFormComponent
      },
      {
        path: 'services/edit/:id',
        component: ServiceEditComponent
      },
      {
        path: 'categories/create',
        component: CategoryFormComponent
      },
      {
        path: 'categories/edit/:id',
        component: CategoryEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
