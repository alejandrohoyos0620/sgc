import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError, retry} from 'rxjs/operators';
import { Service } from '@core/models/service.model';
import { Establishment } from '@core/models/establishment.model';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getAllServices(establishment_id: number): any{
    const establishmentId = establishment_id.toString();
    return this.http.get(`${environment.url_api}/services/establishmentServices`,{params: {establishmentId}})
    .pipe(
      map(
        (result: {services: Service[]}) => result.services
      ),
      catchError(this.handleError),
    )
    ;
  }
  getService(id: string): Observable<Service>{
    return this.http.get(`${environment.url_api}/services` , {params: {id}})
    .pipe(
      map((data:{service: Service})=> data.service),
      catchError(this.handleError),
    );
  }

  createService(service: Partial<Service>, establishment_id: number): any{
    const establishmentId = establishment_id.toString();
    let services: any = service;
    services.establishmentId=establishment_id;
    return this.http.post(`${environment.url_api}/services`, service)
    .pipe(
      catchError(this.handleError),
    );
  }
  updateService(id: string, service: Partial<Service>, establishment_id: number): any{
    const establishmentId = establishment_id.toString();
    let services: any = service;
    services.establishmentId=establishment_id;
    services.id = id;
    return this.http.put(`${environment.url_api}/services`, services)
    .pipe(
      catchError(this.handleError),
    );
  }
 

  deleteService(id_number: number): any{
    const id = id_number.toString();
    return this.http.delete(`${environment.url_api}/services`, {params: {id}})
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse ) {
    console.log(error);
    return  throwError('ups algo salió mal');
  }
}
