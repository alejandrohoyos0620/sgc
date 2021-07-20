import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '@core/models/category.model';
import { Product } from '@core/models/product.model';
import { CategoryService } from '@core/services/categories/category.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent {
  selected: any;
  isShowRepairmans = false;
  repairmans;
  establishmentId: number;
  categories: Category[];
  constructor(
    public dialogRef: MatDialogRef<DialogProductComponent>,
    private categoryService: CategoryService,
    private establishmentService: EstablishmentService,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) { 
    this.establishmentId = this.establishmentService.getEstablishmentId();
    this.categoryService.getAllCategories(this.establishmentId).subscribe(categories => {
      this.categories = categories;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  nameCategory(id: number): string{
    return this.categories.find(category => category.id===id).name;
  }
}
