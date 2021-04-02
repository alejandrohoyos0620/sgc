import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
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
  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  this.activatedRoute.params.subscribe((params: Params) => {
    this.id = params.id;
    this.serviceService.getService(parseInt(this.id)).subscribe((product) =>
    {
      this.form.patchValue(product);
    });
  });
  }

  saveService(event: Event): void{
  event.preventDefault();
  if (this.form.valid){
    const service = this.form.value;
    this.serviceService.updateService(parseInt(this.id), service).subscribe((newservice) => {
      console.log(newservice);
      this.router.navigate(['./admin/services']);
    });
  }
  console.log(this.form.value);
  }
  private buildForm(): void{
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: [0, [Validators.required, MyValidators.isPriceValid]],
      image: '',
      description: ['', [Validators.required]]
    });
  }

  get priceField(): any{
    return this.form.get('price');
  }
}
