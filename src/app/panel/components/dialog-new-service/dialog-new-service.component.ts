import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from '@core/models/device.model';
import { Service } from '@core/models/service.model';
import { ServiceService } from '@core/services/Services/service.service';
@Component({
  selector: 'app-dialog-new-service',
  templateUrl: './dialog-new-service.component.html',
  styleUrls: ['./dialog-new-service.component.scss']
})
export class DialogNewServiceComponent {
  isShowRepairmans: boolean = false;
  type;
  form: FormGroup;
  establishmentId: number;
  services:Service[];
  device: Partial<Device> = {
    brand: '',
    code: '',
    name: '',
    color: ''
  };
  constructor(
    public dialogRef: MatDialogRef<DialogNewServiceComponent>,
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
  ) {
    this.buildForm();
    this.fetchServices();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchServices(): void {
    this.serviceService.getAllServices(1).subscribe(services =>
      this.services = services
    );
  }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      color: ['', [Validators.required]],
      code: ['', [Validators.required]],
      type: ['', [Validators.required]],
      service:['', [Validators.required]]
    });
  }
  saveService(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      this.device = this.form.value;
      this.dialogRef.close(this.device);
    }
  }
}
