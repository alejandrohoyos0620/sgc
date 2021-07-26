import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatStepperModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatStepperModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
