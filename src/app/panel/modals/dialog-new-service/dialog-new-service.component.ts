import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from '@core/models/device.model';
import { Service } from '@core/models/service.model';
import { ServiceService } from '@core/services/Services/service.service';
import { DevicesService } from '@core/services/devices/devices.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { DialogNewDeviceComponent } from '../dialog-new-device/dialog-new-device.component';
import { HireServicesService } from '@core/services/hiredServices/hire-services.service';
import { DialogSuccesHiredServiceComponent } from '../dialog-succes-hired-service/dialog-succes-hired-service.component';
import { errorMessages, validateIfMatch } from '@utils/validators';
@Component({
  selector: 'app-dialog-new-service',
  templateUrl: './dialog-new-service.component.html',
  styleUrls: ['./dialog-new-service.component.scss']
})
export class DialogNewServiceComponent implements OnInit {
  isShowRepairmans = false;
  type;
  form: FormGroup;
  establishmentId: number;
  services: Service[];
  devices: Device[];
  deliver = 0;
  pickup = 0;
  selected = false;
  minDate: Date;
  errorHour = false;
  errors = errorMessages;
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
  ngOnInit(): any{
    this.buildForm();
    this.fetchDevices();
    this.fetchServices();
    const today =  new Date();
    this.minDate = new Date(today.setDate(today.getDate() + 1));;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchServices(): void {
    this.serviceService.getAllServicesByType(1, this.data[1]).subscribe(services =>
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
      device: [0, [Validators.required]],
      description: ['', [Validators.required]],
      service: [0, [Validators.required]],
      date: ['', [Validators.required]],
      hour: ['', [Validators.required, Validators.min(8), Validators.max(17)]]
    });
  }
  saveService(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const service = this.form.value.service;
      const device = this.form.value.device;
      let hour = this.form.value.hour;
      hour = hour+':00';
      const description: string = this.form.value.description;
      const dateFor: Date = new Date(this.form.value.date);
      const month = dateFor.getMonth() + 1 < 10 ? ('0' + (dateFor.getMonth() + 1)) : dateFor.getMonth() + 1;
      const date = dateFor.getFullYear() + '-' + month + '-' + dateFor.getDate();
      console.log(typeof(this.form.value.hour));
      this.hiredService.createHiredService(this.data[0], service, device, this.data[1], date, hour, description).subscribe( result => {
        console.log(result);
        if (result.status === 'success'){
          this.modalSuccess(result);
        }
      }
      );
      this.dialogRef.close(this.device);
    }
    if (this.form.get('hour').hasError('required')){
      this.errorHour = true;
    }
  }
  createDevice(): any{
    const dialogRef = this.dialog.open(DialogNewDeviceComponent, {
      width: '830px',
      height: '850px',
      disableClose: true,
      autoFocus: false,
      data: this.data[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status === 'success'){
        this.fetchDevices();
      }
    });
  }
  modalSuccess(result: any): any{
    const dialogRef = this.dialog.open(DialogSuccesHiredServiceComponent, {
      width: '830px',
      height: '650px',
      disableClose: true,
      autoFocus: false,
      data: result
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }
}
