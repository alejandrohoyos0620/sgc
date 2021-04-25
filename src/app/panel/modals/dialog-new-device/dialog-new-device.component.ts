import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '@core/models/device.model';
import { DevicesService } from '@core/services/devices/devices.service';

@Component({
  selector: 'app-dialog-new-device',
  templateUrl: './dialog-new-device.component.html',
  styleUrls: ['./dialog-new-device.component.scss']
})
export class DialogNewDeviceComponent implements OnInit {
  isShowRepairmans: boolean = false;
  type;
  form: FormGroup;
  establishmentId: number;
  deliver = 0;
  pickup = 0;
  selected = false;
  device: Partial<Device>;
  constructor(
    public dialogRef: MatDialogRef<DialogNewDeviceComponent>,
    private formBuilder: FormBuilder,
    public devideService: DevicesService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
  }
  ngOnInit(){
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
    });
  }

  saveDevice(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      this.device = this.form.value;
      this.device.ownerId = this.data;
       this.devideService.createDevice(this.device).subscribe((newService) => {
         this.dialogRef.close(newService);
       });
    }
  }
}
