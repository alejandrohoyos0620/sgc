import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Category } from '@core/models/category.model';
import { AuthService } from '@core/services/auth.service';
import { CategoryService } from '@core/services/categories/category.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  establishmentId: number;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private establishmentService: EstablishmentService,
  ) {
    this.buildForm();
    if (this.hasUserRole('repairman') || this.hasUserRole('administrator')) {
      this.establishmentId = this.establishmentService.getEstablishmentId();
    }
   }

  ngOnInit(): void {
  this.activatedRoute.params.subscribe((params: Params) => {
    this.id = params.id;
    this.categoryService.getCategory(this.id).subscribe((category) =>
    {
      this.form.patchValue(category);
    });
  });
  }

  saveCategory(event: Event): void{
  event.preventDefault();
  if (this.form.valid){
    const category: Partial<Category> = {
      name: this.form.value.name,
    };
    this.categoryService.updateCategory(this.id, category, this.establishmentId).subscribe((newcategory) => {
      this.router.navigate(['./admin/categories']);
    });
  }
  }
  private buildForm(): void{
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
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
}
