import { Injectable } from '@angular/core';
import { Customer } from '@core/models/customer.model';
import { Employee } from '@core/models/employee.model';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  saveUser(token: string) {
    if (token !== '' && token !== undefined && token !== null) {
      const tokenPayload: any = decode(token);
      if (tokenPayload.role == undefined || tokenPayload.role == null) {
        const customer: Partial<Customer> = this.createCustomer(tokenPayload);
        localStorage.setItem('user', JSON.stringify(customer));
      }
      else{
        const employee: Partial<Employee> = this.createEmployee(tokenPayload);
        localStorage.setItem('user', JSON.stringify(employee));
      }
    }
  }

  createCustomer(tokenPayload: any): Partial<Customer> {
    return {
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

}
