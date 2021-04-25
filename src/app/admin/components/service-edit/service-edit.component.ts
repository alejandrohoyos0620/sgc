import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Service } from '@core/models/service.model';
import { AuthService } from '@core/services/auth.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import {ServiceService} from '@core/services/Services/service.service';
import {MyValidators} from '@utils/validators';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  establishmentId: number;
  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
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
    this.serviceService.getService(this.id).subscribe((service) =>
    {
      this.form.patchValue(service);
    });
  });
  }

  saveService(event: Event): void{
  event.preventDefault();
  if (this.form.valid){
    const service: Partial<Service> = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      isDeliverable: this.form.value.isDeliverable ? 1:0,
      isEnable: this.form.value.isEnable ? 1:0,
    };
    this.serviceService.updateService(this.id, service, this.establishmentId).subscribe((newservice) => {
      this.router.navigate(['./admin/services']);
    });
  }
  }
  private buildForm(): void{
    this.form = this.formBuilder.group({
      name:['', [Validators.required]],
      description: ['', [Validators.required]],
      isDeliverable: [true, [Validators.required]],
      isEnable: [true, [Validators.required]],
      price: [0, [Validators.required]],
    });
  }
  get priceField(): any{
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
