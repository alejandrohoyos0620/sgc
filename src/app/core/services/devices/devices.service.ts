import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '@environments/environment';
import {map, catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import { Device } from '@core/models/device.model';
@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient) { }
  getAllDevicesByCustomer(ownerId: string){
    return this.http.get(`${environment.url_api}/devices/customerDevices`,{params: {ownerId}})
    .pipe(
      map(
        (result: {devices: Device[]}) => result.devices
      ),
      catchError(this.handleError),
    )
    ;
  }
  createDevice(device: Partial<Device>): any{
    return this.http.post(`${environment.url_api}/devices`, device)
    .pipe(
      catchError(this.handleError),
    );
  }
  private handleError(error: HttpErrorResponse ) {
    console.log(error);
    return  throwError('ups algo salió mal');
  }
}
