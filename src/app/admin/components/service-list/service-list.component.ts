import { Component, OnInit } from '@angular/core';
import { hiredService } from '@core/models/hiredService.model';
import { Service } from '@core/models/service.model';
import { ServiceService } from '@core/services/Services/service.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogServiceComponent } from '../dialog-service/dialog-service.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  services: Service[] = [
    {
      description: 'Mantenimiento completo de computador, con formateada',
      establishment: {
        address: 'Cuadra superior carrera 23A',
        city: 'Manizales, Caldas',
        email: 'puntodelpcquemado@mail.com',
        name: 'Punto del PC quemado',
        nit: '987382-4',
        phone: '(03)8785622',
        id: 1
      },
      id: 1,
      isDeliverable: false,
      isEnable: true,
      name: 'Mantenimiento',
      price: 45000
    },
    {
      description: 'reparación de pantalla de computador',
      establishment: {
        address: 'Cuadra superior carrera 23A',
        city: 'Manizales, Caldas',
        email: 'puntodelpcquemado@mail.com',
        name: 'Punto del PC quemado',
        nit: '987382-4',
        phone: '(03)8785622',
        id: 1
      },
      id: 2,
      isDeliverable: false,
      isEnable: true,
      name: 'Reparacion de pantalla',
      price: 100000
    },
    {
      description: 'Servicio de reparación de pantalla de computador',
      establishment: {
        address: 'Cuadra superior carrera 23A',
        city: 'Manizales, Caldas',
        email: 'puntodelpcquemado@mail.com',
        name: 'Punto del PC quemado',
        nit: '987382-4',
        phone: '(03)8785622',
        id: 1
      },
      id: 3,
      isDeliverable: false,
      isEnable: true,
      name: 'Cambio de pantalla',
      price: 100000
    }
  ];
  constructor(
    private serviceService: ServiceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  fetchServices(): void {
    this.serviceService.getAllServices().subscribe(services =>
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