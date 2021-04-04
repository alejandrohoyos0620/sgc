import { Component, OnInit } from '@angular/core';
import { hiredService } from '@core/models/hiredService.model';
import { DialogServiceComponent } from './../dialog-service/dialog-service.component';
import { DialogApproveComponent } from './../dialog-approve/dialog-approve.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogCourseComponent } from '../dialog-course/dialog-course.component';
import { DialogFinishedComponent } from '../dialog-finished/dialog-finished.component';
import { DialogCustomerComponent } from '../dialog-customer/dialog-customer.component';
import { DialogNewServiceComponent } from '../dialog-new-service/dialog-new-service.component';
import { Service } from '@core/models/service.model';
import { HireServicesService } from '@core/services/hiredServices/hire-services.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  tableEnable = '';
  listServices$: Observable<Partial<hiredService>[]>;
  customer = false;
  establishmentId: number;
  establishment: {
    address: 'Cuadra superior carrera 23A',
    city: 'Manizales, Caldas',
    email: 'puntodelpcquemado@mail.com',
    name: 'Punto del PC quemado',
    nit: '987382-4',
    phone: '(03)8785622'
  };

  hiredServices: hiredService[] = [
    {
      id: 1,
      customer: {
        sub: 'Alejandro Hoyos Quemado',
        address: 'Calle 21 A',
        city: 'Manizales Caldas',
        email: 'alejoquemado@mail.com',
        phone: '+5731456765'
      },
      device: {
        id: 1,
        brand: 'Asus x555gq',
        code: 'C5H34HSMC-DM',
        color: 'Negro',
        name: 'Computador portatil',

      },
      repairman: {
        address: 'Calle 78B 21',
        email: 'tecnicoquemado@mail.com',
        establishment: {
          address: 'Cuadra superior carrera 23A',
          city: 'Manizales, Caldas',
          email: 'puntodelpcquemado@mail.com',
          name: 'Punto del PC quemado',
          nit: '987382-4',
          phone: '(03)8785622',
          id: 1
        },
        sub: 'Pedro el técnico',
        id: 1,
        phone: '+57312657673',
        role: 'tecnico'
      },
      service: {
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
        id: 2,
        isDeliverable: false,
        isEnable: true,
        name: 'Mantenimiento',
        price: 45000
      },
      status: 'course',
      createdAt: '07-enero-2021',
      description: 'Arreglar mi computador portatil dado que está muy sucio por el gato que tengo, ya suena raro por dentro'
    },
    {
      id: 2,
      customer: {
        sub: 'Manuel Narvaez Quemado',
        address: 'Carrera 87 F',
        city: 'Manizales Caldas',
        email: 'manuelquemado@mail.com',
        phone: '+57319898965'
      },
      device: {
        id: 2,
        brand: 'Lennovo ff45643',
        code: 'KLOSBM-83927',
        color: 'Gros',
        name: 'Computador portatil',
      },
      repairman: {
        address: 'Calle 78B 21',
        email: 'tecnicoquemado@mail.com',
        establishment: {
          address: 'Cuadra superior carrera 23A',
          city: 'Manizales, Caldas',
          email: 'puntodelpcquemado@mail.com',
          name: 'Punto del PC quemado',
          nit: '987382-4',
          phone: '(03)8785622',
          id: 1
        },
        sub: 'Pedro el técnico',
        id: 1,
        phone: '+57312657673',
        role: 'tecnico'
      },
      service: {
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
        id: 1,
        isDeliverable: false,
        isEnable: true,
        name: 'Cambio de pantalla',
        price: 100000
      },
      status: 'course',
      createdAt: '07-enero-2021',
      description: 'Mi computador está fallando, la pantalla titila a ratos y se pone la mitad negra, porfavor revisar y si es necesario cambiar'
    },
    {
      id: 3,
      customer: {
        sub: 'Alejandro Hoyos Quemado',
        address: 'Calle 21 A',
        city: 'Manizales Caldas',
        email: 'alejoquemado@mail.com',
        phone: '+5731456765'
      },
      device: {
        id: 1,
        brand: 'Asus x555gq',
        code: 'C5H34HSMC-DM',
        color: 'Negro',
        name: 'Computador portatil',

      },
      repairman: {
        address: 'Calle 78B 21',
        email: 'tecnicoquemado@mail.com',
        establishment: {
          address: 'Cuadra superior carrera 23A',
          city: 'Manizales, Caldas',
          email: 'puntodelpcquemado@mail.com',
          name: 'Punto del PC quemado',
          nit: '987382-4',
          phone: '(03)8785622',
          id: 1
        },
        sub: 'Pedro el técnico',
        id: 1,
        phone: '+57312657673',
        role: 'tecnico'
      },
      service: {
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
        id: 1,
        isDeliverable: false,
        isEnable: true,
        name: 'Cambio de pantalla',
        price: 100000
      },
      status: 'course',
      createdAt: '07-enero-2021',
      description: 'Quiero una pantalla nueva, esta ya no brilla bien y creo que se dañó'
    }
  ];
  constructor(
    public dialog: MatDialog,
    public hireServicesService: HireServicesService,
    private authService: AuthService,
    private establishmentService: EstablishmentService,
  ) {
    this.listServices$ = this.hireServicesService.listServices$;
    if (this.hasUserRole('repairman') || this.hasUserRole('administrator')) {
      this.establishmentId = this.establishmentService.getEstablishmentId();
    }
  }

  ngOnInit(): void {
  }

  changeTable(table: string) {
    console.log(table);
    switch (table) {
      case 'service':
        this.hireServicesService.getAllServices(this.establishmentId, 'notApproved').subscribe(hiredServices => {
          this.hireServicesService.creteListServices(hiredServices.hiredServices);
        });
        break;
      case 'approved':
        this.hireServicesService.getAllServices(this.establishmentId, 'approved').subscribe(hiredServices => {
          this.hireServicesService.creteListServices(hiredServices.hiredServices);
        });
        break;
      case 'course':
        this.hireServicesService.getAllServices(this.establishmentId, 'course').subscribe(hiredServices => {
          this.hireServicesService.creteListServices(hiredServices.hiredServices);
        });
        break;
      case 'finished':
        this.hireServicesService.getAllServices(this.establishmentId, 'finished').subscribe(hiredServices => {
          this.hireServicesService.creteListServices(hiredServices.hiredServices);
        });
        break;
      default:
        break;
    }
    this.tableEnable = table;
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
  openDialogCustomer(index: number): void {
    const dialogRef = this.dialog.open(DialogCustomerComponent, {
      width: '830px',
      height: '950px',
      disableClose: true,
      autoFocus: false,
      data: this.hiredServices[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      //this.animal = result;
    });
  }

  openDialogService(index: number): void {
    let behavior: BehaviorSubject<hiredService[]>;
    behavior = (this.listServices$.source) as BehaviorSubject<hiredService[]>;
    const dialogRef = this.dialog.open(DialogServiceComponent, {
      width: '1000px',
      height: '600px',
      disableClose: true,
      autoFocus: false,
      data: behavior.getValue()[index],
    });

    dialogRef.afterClosed().subscribe(repairmanId => {
      if (repairmanId) {
        this.hireServicesService.approveService(behavior.getValue()[index].id, repairmanId).subscribe(result => {
          console.log(result);
        });
      }
    });
  }
  openDialogApproved(index: number): void {
    let behavior: BehaviorSubject<hiredService[]>;
    behavior = (this.listServices$.source) as BehaviorSubject<hiredService[]>;
    const dialogRef = this.dialog.open(DialogApproveComponent, {
      width: '830px',
      height: '950px',
      disableClose: true,
      autoFocus: false,
      data: behavior.getValue()[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.hireServicesService.changeStatus(behavior.getValue()[index].id, 'course').subscribe(result => {
          console.log(result);
        });
      }
      //this.animal = result;
    });
  }
  openDialogCourse(index: number): void {
    let behavior: BehaviorSubject<hiredService[]>;
    behavior = (this.listServices$.source) as BehaviorSubject<hiredService[]>;
    const dialogRef = this.dialog.open(DialogCourseComponent, {
      width: '830px',
      height: '950px',
      disableClose: true,
      autoFocus: false,
      data: behavior.getValue()[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.hireServicesService.changeStatus(behavior.getValue()[index].id, 'finished').subscribe(result => {
          console.log(result);
        });
      }
      //this.animal = result;
    });
  }
  openDialogFinished(index: number): void {
    let behavior: BehaviorSubject<hiredService[]>;
    behavior = (this.listServices$.source) as BehaviorSubject<hiredService[]>;
    const dialogRef = this.dialog.open(DialogFinishedComponent, {
      width: '830px',
      height: '950px',
      disableClose: true,
      autoFocus: false,
      data: behavior.getValue()[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      //this.animal = result;
    });
  }
  newService() {
    const dialogRef = this.dialog.open(DialogNewServiceComponent, {
      width: '830px',
      height: '950px',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result.service.name as Partial<Service>);
      console.log(result);
      //this.animal = result;
    });
  }
}
