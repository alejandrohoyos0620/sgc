import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Service } from '@core/models/service.model';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getAllServices(establishmentIdSend: number): any {
    const establishmentId = establishmentIdSend.toString();
    return this.http.get(`${environment.url_api}/services/establishmentServices`, { params: { establishmentId } })
      .pipe(
        map(
          (result: { services: Service[] }) => result.services
        ),
        catchError(this.handleError),
      );
  }

  getAllServicesByType(establishmentIdSend: number, type: string): any {
    const establishmentId = establishmentIdSend.toString();
    return this.http.get(`${environment.url_api}/services/toRequest`, { params: { establishmentId, type } })
      .pipe(
        map(
          (result: { services: Service[] }) => result.services
        ),
        catchError(this.handleError),
      );
  }

  getService(id: string): Observable<Service> {
    return this.http.get(`${environment.url_api}/services`, { params: { id } })
      .pipe(
        map((data: { service: Service }) => data.service),
        catchError(this.handleError),
      );
  }

  createService(service: Partial<Service>, establishmentIdSend: number): any {
    const establishmentId = establishmentIdSend.toString();
    const services: any = service;
    services.establishmentId = establishmentIdSend;
    return this.http.post(`${environment.url_api}/services`, service)
      .pipe(
        catchError(this.handleError),
      );
  }

  updateService(id: string, service: Partial<Service>, establishmentIdSend: number): any {
    const establishmentId = establishmentIdSend.toString();
    const services: any = service;
    services.establishmentId = establishmentIdSend;
    services.id = id;
    return this.http.put(`${environment.url_api}/services`, services)
      .pipe(
        catchError(this.handleError),
      );
  }


  deleteService(id_number: number): any {
    const id = id_number.toString();
    return this.http.delete(`${environment.url_api}/services`, { params: { id } })
      .pipe(
        catchError(this.handleError),
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('ups algo salió mal');
  }
}
