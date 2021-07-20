import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '@core/models/category.model';
import { Product } from '@core/models/product.model';
import { Service } from '@core/models/service.model';
import { AuthService } from '@core/services/auth.service';
import { CategoryService } from '@core/services/categories/category.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { ProductService } from '@core/services/products/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})

export class ProductEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  establishmentId: number;
  categories: Category[];
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private establishmentService: EstablishmentService,
    private categoryService: CategoryService,
  ) {
    this.buildForm();
    if (this.hasUserRole('repairman') || this.hasUserRole('administrator')) {
      this.establishmentId = this.establishmentService.getEstablishmentId();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productService.getProduct(this.id).subscribe((response) => {
        if (response.status == "success") {
          this.fetchCategories(response.product);
        }
      });
    });
  }

  fetchCategories(product: any): void {
    this.categoryService.getAllCategories(this.establishmentId).subscribe(categories => {
      this.categories = categories;
      this.form.patchValue(product);
      console.log(product.categoryId);
      this.form.controls['categoryId'].setValue(product.categoryId);
      console.log(this.form.value.categoryId);
    }
    );
  }

  saveProduct(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const product: Partial<Product> = {
        name: this.form.value.name,
        brand: this.form.value.brand,
        color: this.form.value.color,
        code: this.form.value.code,
        categoryId: this.form.value.categoryId,
        description: this.form.value.description,
        price: this.form.value.price,
        isEnable: this.form.value.isEnable ? 1 : 0,
      };
      this.productService.updateProduct(this.id, product, this.establishmentId).subscribe((newproduct) => {
        this.router.navigate(['./admin/products']);
      });
    }
  }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      brand: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      code: ['', [Validators.required]],
      color: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isEnable: [true, [Validators.required]],
    });
  }
  get priceField(): any {
    return this.form.get('price');
  }
  hasUser(): any {
    if (this.authService.hasUser()) {
      return true;
    }
    else {
      return false;
    }
  }
  hasUserRole(role: string): any {
    if (this.authService.hasUserRole(role)) {
      return true;
    }
    else {
      return false;
    }
  }

}
