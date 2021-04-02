import { Injectable } from '@angular/core';
import {Product} from '../../models/product.model';
import {environment} from '@environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError, retry, tap} from 'rxjs/operators';
import { hiredService } from '@core/models/hiredService.model';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HireServicesService {
  private listServices = new BehaviorSubject<Partial<hiredService>[]>([]);

  listServices$ = this.listServices.asObservable();
  constructor(private http: HttpClient) { }

  getAllServices(establishment_id: number, status: string): any{
    const establishmentId=establishment_id.toString();
    console.log('aquí igual');
    return this.http.get<hiredService[]>(`${environment.url_api}/hiredServices/establishmentServices`,{params: {establishmentId, status}})
    .pipe(
      catchError(this.handleError),
    );
  }
  approveService(hiredservicesId:number, repairmanId: number){
    const data={
      id:hiredservicesId,
      repairmanId:repairmanId
    }
    return this.http.put(`${environment.url_api}/hiredServices/approve`,data)
    .pipe(
      tap((data :{approvedHiredService:{}}) =>{
        const index = this.listServices.getValue().findIndex((hireService) => hireService.id === hiredservicesId);
        this.listServices.getValue().splice(index, 1);
        this.listServices.getValue().push(data.approvedHiredService);
        this.listServices.next([...this.listServices.getValue()]);
        
        console.log(this.listServices.getValue());
      }),
      catchError(this.handleError),
    );
  }
  changeStatus(hiredservicesId:number, status:string){
    const data={
      id:hiredservicesId,
      status:status
    }
    return this.http.put(`${environment.url_api}/hiredServices/change`,data)
    .pipe(
      tap((data :{approvedHiredService:{}}) =>{
        const index = this.listServices.getValue().findIndex((hireService) => hireService.id === hiredservicesId);
        this.listServices.getValue().splice(index, 1);
        this.listServices.getValue().push(data.approvedHiredService);
        this.listServices.next([...this.listServices.getValue()]);
        console.log(this.listServices.getValue());
      }),
      catchError(this.handleError),
    );
  }
  creteListServices(hiredservices:hiredService[]){
    this.listServices.next(hiredservices);
  }
  private handleError(error: HttpErrorResponse ) {
    console.log(error);
    return  throwError('ups algo salió mal');
  }
}
