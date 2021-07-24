import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { ProductService } from '@core/services/products/product.service';
import { Product } from '@core/models/product.model';
import { Category } from '@core/models/category.model';
import { CategoryService } from '@core/services/categories/category.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  form: FormGroup;
  establishmentId: number;
  selected: any;
  categories: Category[];
  image$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private establishmentService: EstablishmentService,
    private categoryService: CategoryService,
    private Storage: AngularFireStorage,
    private toastr: ToastrService,
  ) {
    this.buildForm();
    if (this.hasUserRole('repairman') || this.hasUserRole('administrator')) {
      this.establishmentId = this.establishmentService.getEstablishmentId();
    }
    this.fetchCategories();
  }
  fetchCategories(): void {
    this.categoryService.getAllCategories(this.establishmentId).subscribe(categories => {
      this.categories = categories;
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
        categoryId: this.form.value.category,
        description: this.form.value.description,
        price: this.form.value.price,
        image: this.form.value.image,
        isEnable: this.form.value.isEnable ? 1 : 0,
      };
      this.productService.createProduct(product, this.establishmentId).subscribe((newproduct) => {
        this.toastr.success('Se creó el producto correctamente');
        this.router.navigate(['./admin/products']);
      });
    }else{
      this.toastr.error('Recuerda llenar todos los campos para la creación de un producto nuevo');
    }

  }


  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
      code: ['', [Validators.required]],
      color: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      isEnable: [true, [Validators.required]],
    });
  }

  get priceField(): any {
    return this.form.get('price');
  }
  hasUser(): any{
    if (this.authService.hasUser()) {
      return true;
    }
    else {
      return false;
    }
  }
  hasUserRole(role: string): any{
    if (this.authService.hasUserRole(role)) {
      return true;
    }
    else {
      return false;
    }
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const name = file.name;
    const fileRef = this.Storage.ref(name);
    const task = this.Storage.upload(name, file);

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          console.log(this.image$);
          this.image$.subscribe(url => {
            this.form.get('image').setValue(url);
          });
        }
        )
      ).subscribe();
  }

  
}
