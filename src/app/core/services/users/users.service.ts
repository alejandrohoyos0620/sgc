import { Injectable } from '@angular/core';
import { Customer } from '@core/models/customer.model';
import { Employee } from '@core/models/employee.model';
import {environment} from '@environments/environment';
import {map, catchError, retry, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user = new BehaviorSubject<Partial<Employee> | Partial<Customer>>({});

  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient
    ) { }

  updateUser(user: Partial<Employee> | Partial<Customer> | any){
    user.fullName=user.sub;
    delete user['sub'];
    console.log(typeof(user));
    this.user.next(user);
    this.saveUpdatedUser(user);
  }
  

  saveUser(tokenPayload: any) {
      if (tokenPayload.role == undefined || tokenPayload.role == null) {
        const customer: Partial<Customer> = this.createCustomer(tokenPayload);
        localStorage.setItem('user', JSON.stringify(customer));
      }
      else{
        const employee: Partial<Employee> = this.createEmployee(tokenPayload);
        localStorage.setItem('user', JSON.stringify(employee));
      }
    }

  saveUpdatedUser(user: Partial<Employee> | Partial<Customer> ){
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser(): void {
    let user = localStorage.getItem('user');
    let userDecode = JSON.parse(user);
    if (userDecode.role !== '' && userDecode.role !== undefined && userDecode.role !== null) {
      let customer: Partial<Customer> = userDecode;
      this.user.next(customer);
    }
    else{
      let employee: Partial<Employee> = userDecode;
      this.user.next(employee);
    }
  }

  getAllRepairmans(establishment_id:number){
    const establishmentId=establishment_id.toString();
    return this.http.get(`${environment.url_api}/establishments/repairmans`,{params: {establishmentId}})
    .pipe(
      map((result: {repairmans: []}) => result.repairmans),
      catchError(this.handleError),
    );
  }
  hasUser(){
   return this.user.getValue().address === undefined? false : true;
  }
  createCustomer(tokenPayload: any): Partial<Customer> {
    return {
      id: tokenPayload.id,
      fullName: tokenPayload.sub,
      address: tokenPayload.address,
      city: tokenPayload.city,
      email: tokenPayload.email,
      phone: tokenPayload.phone
    }
  }

  createEmployee(tokenPayload: any): Partial<Employee>{
    return {
      id:  tokenPayload.id,
      fullName: tokenPayload.sub,
      address: tokenPayload.address,
      email: tokenPayload.email,
      phone: tokenPayload.phone,
      role: tokenPayload.role,
      establishment: tokenPayload.Establishment
    }
  }
  private handleError(error: HttpErrorResponse ) {
    console.log(error);
    return  throwError('ups algo salió mal');
  }

}
