import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '@core/services/Services/service.service';
import { MyValidators } from '@utils/validators';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Service } from '@core/models/service.model';
import { AuthService } from '@core/services/auth.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {
  form: FormGroup;
  establishmentId: number;
  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
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

  saveService(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const service: Partial<Service> = {
        name: this.form.value.name,
        description: this.form.value.description,
        price: this.form.value.price,
        isDeliverable: this.form.value.isDeliverable ? 1:0,
        isEnable: this.form.value.isEnable ? 1:0,
      };
      this.serviceService.createService(service, this.establishmentId).subscribe((newservice) => {
        console.log(newservice);
        this.router.navigate(['./admin/services']);
      });
      console.log(service);
    }
    
  }


  private buildForm(): void {
    this.form = this.formBuilder.group({
      name:['', [Validators.required]],
      description: ['', [Validators.required]],
      isDeliverable: [false, [Validators.required]],
      isEnable: [false, [Validators.required]],
      price: [0, [Validators.required]],
    });
  }

  get priceField(): any {
    return this.form.get('price');
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