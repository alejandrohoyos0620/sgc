import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '@core/models/category.model';
import { Product } from '@core/models/product.model';
import { Service } from '@core/models/service.model';
import { AuthService } from '@core/services/auth.service';
import { CategoryService } from '@core/services/categories/category.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { ProductService } from '@core/services/products/product.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
  image$: Observable<any>;
  imageSrc: string;
  loader: boolean = false;
  pathLoader: string;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
    this.image$= new Observable<any>();
    this.pathLoader = '../../assets/images/loading.gif';
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
      this.form.controls['categoryId'].setValue(""+product.categoryId);
      this.imageSrc = product.image;
      this.form.controls['image'].setValue(product.image);
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
        image: this.form.value.image,
        isEnable: this.form.value.isEnable ? 1 : 0,
      };
      this.productService.updateProduct(this.id, product, this.establishmentId).subscribe((newproduct) => {
        this.toastr.success('Se actualizó el producto correctamente');
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
      image: ['', [Validators.required]],
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
  uploadFile(event): void {
    this.loader = true;
    const file = event.target.files[0];
    const name = file.name;
    const fileRef = this.Storage.ref(name);
    const task = this.Storage.upload(name, file);

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe(url => {
            this.loader= false;
            this.form.get('image').setValue(url);
          });
        }
        )
      ).subscribe();
  }

}
