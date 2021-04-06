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
  totalPrimero$: Observable<number>;
  totalSegundo$: Observable<number>;
  totalTercero$: Observable<number>;
  totalCuarto$: Observable<number>;
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
  hiredServices: hiredService[];
  constructor(
    public dialog: MatDialog,
    public hireServicesService: HireServicesService,
    private authService: AuthService,
    private establishmentService: EstablishmentService,
  ) {
    this.listServices$ = this.hireServicesService.listServices$;
    this.totalPrimero$ = this.hireServicesService.totalPrimero$;
    this.totalSegundo$ = this.hireServicesService.totalSegundo$;
    this.totalTercero$ = this.hireServicesService.totalTercero$;
    this.totalCuarto$ = this.hireServicesService.totalCuarto$;
    if (this.hasUserRole('repairman') || this.hasUserRole('administrator')) {
      this.establishmentId = this.establishmentService.getEstablishmentId();
      this.getAllBadges();
    }
  }

  ngOnInit(): void {
  }

  changeTable(table: string) {
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
  getAllBadges() {
    if (this.hasUserRole('administrator')) {
      this.hireServicesService.getAllServices(this.establishmentId, 'notApproved').subscribe(hiredServices => {
        this.hireServicesService.getAllBadges(hiredServices.hiredServices, 1);
      });
    }
    this.hireServicesService.getAllServices(this.establishmentId, 'approved').subscribe(hiredServices => {
      this.hireServicesService.getAllBadges(hiredServices.hiredServices, 2);
    });
    this.hireServicesService.getAllServices(this.establishmentId, 'course').subscribe(hiredServices => {
      this.hireServicesService.getAllBadges(hiredServices.hiredServices, 3);
    });
    this.hireServicesService.getAllServices(this.establishmentId, 'finished').subscribe(hiredServices => {
      this.hireServicesService.getAllBadges(hiredServices.hiredServices, 4);
    });
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
          this.getAllBadges();
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
      if (result) {
        this.hireServicesService.changeStatus(behavior.getValue()[index].id, 'course').subscribe(result => {
          this.getAllBadges();
        });
      }
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
      if (result) {
        this.hireServicesService.changeStatus(behavior.getValue()[index].id, 'finished').subscribe(result => {
          this.getAllBadges();
        });
      }
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
    });
  }
}
