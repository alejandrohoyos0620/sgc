import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { hiredService } from '@core/models/hiredService.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsersService } from '../users/users.service';
@Injectable({
  providedIn: 'root'
})
export class HireServicesService {
  private listServices = new BehaviorSubject<Partial<hiredService>[]>([]);
  private totalPrimero = new BehaviorSubject<number>(0);
  private totalSegundo = new BehaviorSubject<number>(0);
  private totalTercero = new BehaviorSubject<number>(0);
  private totalCuarto = new BehaviorSubject<number>(0);
  totalPrimero$ = this.totalPrimero.asObservable();
  totalSegundo$ = this.totalSegundo.asObservable();
  totalTercero$ = this.totalTercero.asObservable();
  totalCuarto$ = this.totalCuarto.asObservable();
  listServices$ = this.listServices.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private user: UsersService
  ) { }

  getAllServices(establishmentIdSend: number, status: string): any {
    const establishmentId = establishmentIdSend.toString();

    if (this.auth.hasUserRole('administrator')) {
      return this.http.get<hiredService[]>(`${environment.url_api}/hiredServices/establishmentServices`,
      {
        params:
        {
          establishmentId,
          status
        }
      }).pipe(
          catchError(this.handleError),
        );
    }
    else if (this.auth.hasUserRole('repairman')) {
      const repairmanId = this.user.getUserId();
      return this.http.get<hiredService[]>(`${environment.url_api}/hiredServices/repairmanServices`,
      {
        params:
        {
          repairmanId,
          status
        }
      }).pipe(
          catchError(this.handleError),
        );
    }
    else {
      const customerId = this.user.getUserId();
      return this.http.get<hiredService[]>(`${environment.url_api}/hiredServices/customerServices`,
      {
        params:
        {
          customerId
        }
      })
        .pipe(
          catchError(this.handleError),
        );
    }
  }

  getAllBadges(hiredservices: hiredService[], index: number): any{
    switch (index) {
      case 1:
        this.totalPrimero.next(hiredservices.length);
        break;
      case 2:
        this.totalSegundo.next(hiredservices.length);
        break;
      case 3:
        this.totalTercero.next(hiredservices.length);
        break;
      case 4:
        this.totalCuarto.next(hiredservices.length);
        break;
      default:
        break;
    }

  }
  approveService(hiredservicesId: number, repairmanIdSend: number): any{
    const data = {
      id: hiredservicesId,
      repairmanId: repairmanIdSend
    };
    return this.http.put(`${environment.url_api}/hiredServices/approve`, data)
      .pipe(
        tap((data: { approvedHiredService: {} }) => {
          const index = this.listServices.getValue().findIndex((hireService) => hireService.id === hiredservicesId);
          this.listServices.getValue().splice(index, 1);
          this.listServices.getValue().push(data.approvedHiredService);
          this.listServices.next([...this.listServices.getValue()]);
        }),
        catchError(this.handleError),
      );
  }
  changeStatus(hiredservicesId: number, statusSend: string): any{
    const data = {
      id: hiredservicesId,
      status: statusSend
    };
    return this.http.put(`${environment.url_api}/hiredServices/change`, data)
      .pipe(
        tap((data: { approvedHiredService: {} }) => {
          const index = this.listServices.getValue().findIndex((hireService) => hireService.id === hiredservicesId);
          this.listServices.getValue().splice(index, 1);
          this.listServices.getValue().push(data.approvedHiredService);
          this.listServices.next([...this.listServices.getValue()]);
        }),
        catchError(this.handleError),
      );
  }
  creteListServices(hiredservices: hiredService[]): void{
    this.listServices.next(hiredservices);
  }
  createHiredService(customerIdSend, serviceIdSend, deviceIdSend, typeSend, dateSend, hourSend, descriptionSend): any{
    const hired = {
      customerId: customerIdSend,
      serviceId: serviceIdSend,
      deviceId: deviceIdSend,
      description: descriptionSend,
      hour: hourSend,
      type: typeSend,
      date: dateSend
    };
    return this.http.post(`${environment.url_api}/hiredServices`, hired)
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('ups algo salió mal');
  }
}
