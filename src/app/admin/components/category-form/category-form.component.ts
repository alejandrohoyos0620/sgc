import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { CategoryService } from '@core/services/categories/category.service';
import { Category } from '@core/models/category.model';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  establishmentId: number;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService,
    private establishmentService: EstablishmentService,
  ) {
    this.buildForm();
    if (this.hasUserRole('repairman') || this.hasUserRole('administrator')) {
      this.establishmentId = this.establishmentService.getEstablishmentId();
    }
  }

  ngOnInit(): void {
  }

  saveCategory(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const category: Partial<Category> = {
        name: this.form.value.name
      };
      this.categoryService.createCategory(category, this.establishmentId).subscribe((newCategory) => {
        this.router.navigate(['./admin/categories']);
      });
    }
    
  }


  private buildForm(): void {
    this.form = this.formBuilder.group({
      name:['', [Validators.required]]
    });
  }

  hasUser() {
    if (this.authService.hasUser()) {
      return true;
    }
    else {
      return false;
    }
  }
  hasUserRole(role: string) {
    if (this.authService.hasUserRole(role)) {
      return true;
    }
    else {
      return false;
    }
  }

}
