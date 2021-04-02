import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
