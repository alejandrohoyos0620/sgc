import { Injectable } from '@angular/core';
import { Customer } from '@core/models/customer.model';
import { Employee } from '@core/models/employee.model';
import {BehaviorSubject} from 'rxjs';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user = new BehaviorSubject<Partial<Employee> | Partial<Customer>>({});

  user$ = this.user.asObservable();

  constructor() { }

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

}
