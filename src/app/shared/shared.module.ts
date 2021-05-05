import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MaterialModule} from './../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { DialogOverviewExampleDialog } from './components/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { ToSpanishPipe } from './pipes/to-spanish.pipe';



@NgModule({
  declarations: [ HeaderComponent,
    FooterComponent,
    DialogOverviewExampleDialog,
    ToSpanishPipe
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ToSpanishPipe
  ]
})
export class SharedModule { }
