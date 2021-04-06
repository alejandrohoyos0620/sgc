import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { Category } from '@core/models/category.model';
import { CategoryService } from '@core/services/categories/category.service';
import { DialogDeleteCategoryComponent } from '../dialog-delete-category/dialog-delete-category.component';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  
  establishmentId: number;
  categories: Category[];
  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private establishmentService: EstablishmentService,
  ) {
  
   }

  ngOnInit(): void {
    this.establishmentId= this.establishmentService.getEstablishmentId();
    this.fetchCategories();
  }
  fetchCategories(): void {
    this.categoryService.getAllCategories(this.establishmentId).subscribe(categories =>{
      this.categories = categories
    }
    );
  }

  
  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(rta => {
      if (rta) {
        const index = this.categories.findIndex((category) => category.id === id);
        this.categories.splice(index, 1);
        this.categories = [...this.categories];
      }
    });
  }

  openDialogDeleteCategory(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteCategoryComponent, {
      width: '800px',
      height: '300px',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(status => {
      if(status){
        this.deleteCategory(id);
      }
    });
  }
}
