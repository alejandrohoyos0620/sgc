import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogServiceComponent } from '../dialog-service/dialog-service.component';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { DialogDeleteServiceComponent } from '../dialog-delete-service/dialog-delete-service.component';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/products/product.service';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
import { DialogDeleteProductComponent } from '../dialog-delete-product/dialog-delete-product.component';
import { CategoryService } from '@core/services/categories/category.service';
import { Category } from '@core/models/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  establishmentId: number;
  products: Product[];
  categories: Category[];
  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private establishmentService: EstablishmentService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.establishmentId = this.establishmentService.getEstablishmentId();
    this.fetchProducts();
  }
  fetchProducts(): void {
    this.productService.getAllProductsByEstablishment(this.establishmentId).subscribe(response => {
      if (response.status == 'success') {
        this.products = response.products;
        this.categoryService.getAllCategories(this.establishmentId).subscribe(categories => {
          this.categories = categories;
        });
      }
    }
    );
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(rta => {
      if (rta) {
        const index = this.products.findIndex((product) => product.id === id);
        this.products.splice(index, 1);
        this.products = [...this.products];
      }
    });
  }

  openDialogDeleteProduct(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteProductComponent, {
      width: '800px',
      height: '300px',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(status => {
      if (status) {
        this.deleteProduct(id);
      }
    });
  }
  openDialogProduct(index: number): void {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '1000px',
      height: '900px',
      disableClose: true,
      autoFocus: false,
      data: this.products[index],
    });

    dialogRef.afterClosed().subscribe(repairmanId => {
    });
  }

  nameCategory(id: number): string{
    return this.categories.find(category => category.id===id).name;
  }
}
