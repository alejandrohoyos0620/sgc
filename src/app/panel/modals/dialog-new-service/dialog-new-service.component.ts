import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from '@core/models/device.model';
import { Service } from '@core/models/service.model';
import { ServiceService } from '@core/services/Services/service.service';
import { DevicesService } from '@core/services/devices/devices.service';
import { BehaviorSubject } from 'rxjs';
import { hiredService } from '@core/models/hiredService.model';
import { DialogFinishedComponent } from '../../modals/dialog-finished/dialog-finished.component';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { DialogNewDeviceComponent } from '../dialog-new-device/dialog-new-device.component';
import { HireServicesService } from '@core/services/hiredServices/hire-services.service';
@Component({
  selector: 'app-dialog-new-service',
  templateUrl: './dialog-new-service.component.html',
  styleUrls: ['./dialog-new-service.component.scss']
})
export class DialogNewServiceComponent implements OnInit {
  isShowRepairmans: boolean = false;
  type;
  form: FormGroup;
  establishmentId: number;
  services:Service[];
  devices:Device[];
  deliver = 0;
  pickup = 0;
  selected = false;
  minDate: Date;
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
    private deviceService: DevicesService,
    private hiredService: HireServicesService,
    private establishmentService: EstablishmentService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {
  }
  ngOnInit(){
    this.buildForm();
    this.fetchDevices();
    this.fetchServices();
    this.minDate = new Date();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchServices(): void {
    this.serviceService.getAllServices(1).subscribe(services =>
      this.services = services
    );
  }
  fetchDevices(): void {
    this.deviceService.getAllDevicesByCustomer(this.data[0]).subscribe(devices =>
      this.devices = devices
    );
  }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      device:[0, [Validators.required]],
      description: ['', [Validators.required]],
      service:[0, [Validators.required]],
      date:['', [Validators.required]],
      hour:['', [Validators.required]]
    });
  }
  saveService(event: Event): void {
    event.preventDefault();
   
    if (this.form.valid) {
      const service =this.form.value.service;
      const device =this.form.value.device;
      const hour =this.form.value.hour;
      const description: string =this.form.value.description;
      const dateFor: Date = new Date(this.form.value.date);
      const month = dateFor.getMonth()+1 < 10 ? ('0' + (dateFor.getMonth()+1)) : dateFor.getMonth()+1;
      const date = month + '-'+ dateFor.getDate() +  '-' + dateFor.getFullYear() ;
      console.log(this.form.value.hour);
      this.hiredService.createHiredService(this.data[0], service, device, date, hour, description).subscribe( result =>
        console.log(result)
      );
      this.dialogRef.close(this.device);
    }
  }
  createDevice(){
    const dialogRef = this.dialog.open(DialogNewDeviceComponent, {
      width: '830px',
      height: '850px',
      disableClose: true,
      autoFocus: false,
      data: this.data[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.status ==='success'){
        this.fetchDevices();
      }
    });
  }
}
