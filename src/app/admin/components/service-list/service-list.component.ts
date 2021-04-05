import { Component, OnInit } from '@angular/core';
import { hiredService } from '@core/models/hiredService.model';
import { Service } from '@core/models/service.model';
import { ServiceService } from '@core/services/Services/service.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogServiceComponent } from '../dialog-service/dialog-service.component';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { DialogDeleteServiceComponent } from '../dialog-delete-service/dialog-delete-service.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  establishmentId: number;
  services: Service[];
  constructor(
    private serviceService: ServiceService,
    public dialog: MatDialog,
    private establishmentService: EstablishmentService,
  ) {
  
   }

  ngOnInit(): void {
    this.establishmentId= this.establishmentService.getEstablishmentId();
    this.fetchServices();
  }
  fetchServices(): void {
    this.serviceService.getAllServices(this.establishmentId).subscribe(services =>
      this.services = services
    );
  }

  
  deleteService(id: number): void {
    this.serviceService.deleteService(id).subscribe(rta => {
      if (rta) {
        const index = this.services.findIndex((service) => service.id === id);
        this.services.splice(index, 1);
        this.services = [...this.services];
      }
    });
  }

  openDialogDeleteService(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteServiceComponent, {
      width: '800px',
      height: '300px',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(status => {
      if(status){
        this.deleteService(id);
      }
    });
  }
  openDialogService(index: number): void {
    const dialogRef = this.dialog.open(DialogServiceComponent, {
      width: '1000px',
      height: '600px',
      disableClose: true,
      autoFocus: false,
      data: this.services[index],
    });

    dialogRef.afterClosed().subscribe(repairmanId => {
      console.log("salió");
    });
  }
}