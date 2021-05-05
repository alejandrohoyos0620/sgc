import { Injectable } from '@angular/core';
import { Customer } from '@core/models/customer.model';
import { Employee } from '@core/models/employee.model';
import { environment } from '@environments/environment';
import { map, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user = new BehaviorSubject<Partial<Employee> | Partial<Customer>>({});

  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  updateUser(user: Partial<Employee> | Partial<Customer> | any): any {
    this.user.next(user);
    this.saveUpdatedUser(user);
  }


  saveUser(tokenPayload: any): any {
    if (tokenPayload.role === undefined || tokenPayload.role === null) {
      const customer: Partial<Customer> = this.createCustomer(tokenPayload);
      localStorage.setItem('user', JSON.stringify(customer));
    }
    else {
      const employee: Partial<Employee> = this.createEmployee(tokenPayload);
      localStorage.setItem('user', JSON.stringify(employee));
    }
  }

  saveUpdatedUser(user: Partial<Employee> | Partial<Customer>): any {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser(): void {
    const user = localStorage.getItem('user');
    const userDecode = JSON.parse(user);
    if (userDecode.role !== '' && userDecode.role !== undefined && userDecode.role !== null) {
      const customer: Partial<Customer> = userDecode;
      this.user.next(customer);
    }
    else {
      const employee: Partial<Employee> = userDecode;
      this.user.next(employee);
    }
  }

  getAllRepairmans(establishmentIdSend: number): any {
    const establishmentId = establishmentIdSend.toString();
    return this.http.get(`${environment.url_api}/establishments/repairmans`, { params: { establishmentId } })
      .pipe(
        map((result: { repairmans: [] }) => result.repairmans),
        catchError(this.handleError),
      );
  }
  hasUser(): any{
    return this.user.getValue().address === undefined ? false : true;
  }

  getUserId(): any {
    const user = localStorage.getItem('user');
    const userDecode = JSON.parse(user);
    if (userDecode !== '' && userDecode !== undefined && userDecode !== null){
      return userDecode.id;
    }
  }
  createCustomer(tokenPayload: any): Partial<Customer> {
    return {
      id: tokenPayload.id,
      sub: tokenPayload.sub,
      address: tokenPayload.address,
      city: tokenPayload.city,
      email: tokenPayload.email,
      phone: tokenPayload.phone
    };
  }

  createEmployee(tokenPayload: any): Partial<Employee> {
    return {
      id: tokenPayload.id,
      sub: tokenPayload.sub,
      address: tokenPayload.address,
      email: tokenPayload.email,
      phone: tokenPayload.phone,
      role: tokenPayload.role,
      establishment: tokenPayload.Establishment
    };
  }
  private handleError(error: HttpErrorResponse): any{
    console.log(error);
    return throwError('ups algo salió mal');
  }

}
