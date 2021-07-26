import { Component, OnInit } from '@angular/core';
import { hiredService } from '@core/models/hiredService.model';
import { DialogServiceComponent } from '../../modals/dialog-service/dialog-service.component';
import { DialogApproveComponent } from '../../modals/dialog-approve/dialog-approve.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogCourseComponent } from '../../modals/dialog-course/dialog-course.component';
import { DialogFinishedComponent } from '../../modals/dialog-finished/dialog-finished.component';
import { DialogCustomerComponent } from '../../modals/dialog-customer/dialog-customer.component';
import { DialogNewServiceComponent } from '../../modals/dialog-new-service/dialog-new-service.component';
import { Service } from '@core/models/service.model';
import { HireServicesService } from '@core/services/hiredServices/hire-services.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { UsersService } from '@core/services/users/users.service';
import { DialogNewServiceTypeComponent } from '../../modals/dialog-new-service-type/dialog-new-service-type.component';
import { DialogRatingComponent } from '../../modals/dialog-rating/dialog-rating.component';

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
    private user: UsersService
  ) {
    this.listServices$ = this.hireServicesService.listServices$;
    this.totalPrimero$ = this.hireServicesService.totalPrimero$;
    this.totalSegundo$ = this.hireServicesService.totalSegundo$;
    this.totalTercero$ = this.hireServicesService.totalTercero$;
    this.totalCuarto$ = this.hireServicesService.totalCuarto$;
  }

  ngOnInit(): void {
    if (this.hasUserRole('repairman') || this.hasUserRole('administrator')) {
      this.establishmentId = this.establishmentService.getEstablishmentId();
      this.getAllBadges();
    }
    else{
      this.changeTable('customer');
    }
  }

  changeTable(table: string): void{
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
      case 'customer':
        this.hireServicesService.getAllServices(0, 'notApproved').subscribe(hiredServices => {
          this.hireServicesService.creteListServices(hiredServices.hiredServices);
        });
        break;
      default:
        break;
    }
    this.tableEnable = table;
  }
  getAllBadges(): void{
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

  hasUser(): any{
    if (this.authService.hasUser()) {
      return true;
    }
    else {
      return false;
    }
  }
  hasUserRole(role: string): any{
    if (this.authService.hasUserRole(role)) {
      return true;
    }
    else {
      return false;
    }
  }
  openDialogCustomer(index: number): void {
    let behavior: BehaviorSubject<hiredService[]>;
    behavior = (this.listServices$.source) as BehaviorSubject<hiredService[]>;
    const dialogRef = this.dialog.open(DialogCustomerComponent, {
      width: '830px',
      height: '750px',
      disableClose: true,
      autoFocus: false,
      data: behavior.getValue()[index]
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openDialogRating(hiredId: number): void {
    const dialogRef = this.dialog.open(DialogRatingComponent, {
      width: '800px',
      height: '300px',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(value => {
      if(value != '0')
        this.createRating(hiredId, value);
    });
  }
  createRating(hiredId, value){
    this.hireServicesService.saveRating(hiredId, value).subscribe((response) => {
      if(response.status == "success"){
        window.location.reload();
      }
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
      console.log(repairmanId);
      if (repairmanId) {
        this.hireServicesService.approveService(behavior.getValue()[index].id, repairmanId).subscribe(result => {
          this.getAllBadges();
        });
      }
      else{
        this.hireServicesService.changeStatusReject(behavior.getValue()[index].id, 'rejected').subscribe(result => {
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
  newService(): void{
    const customerId = this.user.getUserId();
    const dialogRef = this.dialog.open(DialogNewServiceTypeComponent, {
      width: '830px',
      height: '300px',
      disableClose: true,
      autoFocus: false,
      data: customerId
    });

    dialogRef.afterClosed().subscribe(result => {
      this.changeTable('customer');
    });
  }
}
