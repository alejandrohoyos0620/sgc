import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from '@core/models/device.model';
import { Service } from '@core/models/service.model';
@Component({
  selector: 'app-dialog-new-service',
  templateUrl: './dialog-new-service.component.html',
  styleUrls: ['./dialog-new-service.component.scss']
})
export class DialogNewServiceComponent {
  isShowRepairmans: boolean = false;
  type;
  form: FormGroup;
  services:Service[] =[
    {
      description: 'Mantenimiento completo de computador, con formateada',
      establishment:  {
        address: 'Cuadra superior carrera 23A',
        city: 'Manizales, Caldas',
        email: 'puntodelpcquemado@mail.com',
        name: 'Punto del PC quemado',
        nit: '987382-4',
        phone: '(03)8785622',
        id:1
      },
      id: 2,
      isDeliverable: false,
      isEnable: true,
      name: 'Mantenimiento',
      price: 45000
    },
    {
      description: 'Servicio de reparación de pantalla de computador',
      establishment:  {
        address: 'Cuadra superior carrera 23A',
        city: 'Manizales, Caldas',
        email: 'puntodelpcquemado@mail.com',
        name: 'Punto del PC quemado',
        nit: '987382-4',
        phone: '(03)8785622',
        id:1
      },
      id: 1,
      isDeliverable: false,
      isEnable: true,
      name: 'Cambio de pantalla',
      price: 100000
    },
    {
      description: 'Servicio de reparación de pantalla de computador',
      establishment:  {
        address: 'Cuadra superior carrera 23A',
        city: 'Manizales, Caldas',
        email: 'puntodelpcquemado@mail.com',
        name: 'Punto del PC quemado',
        nit: '987382-4',
        phone: '(03)8785622',
        id:1
      },
      id: 1,
      isDeliverable: false,
      isEnable: true,
      name: 'Cambio de pantalla',
      price: 100000
    }
  ];
  device: Partial<Device> = {
    brand: '',
    code: '',
    name: '',
    color: ''
  };
  constructor(
    public dialogRef: MatDialogRef<DialogNewServiceComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
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
