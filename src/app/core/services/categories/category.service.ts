import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError, retry} from 'rxjs/operators';
import { Service } from '@core/models/service.model';
import { Category } from '@core/models/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAllCategories(): any{
    return this.http.get<Category[]>(`${environment.url_api}/category`)
    .pipe(
      catchError(this.handleError),
    );
  }

  getCategory(id: number): Observable<Category>{
    return this.http.get<Category>(`${environment.url_api}/category/${id}`)
    .pipe(
      catchError(this.handleError),
    );
  }

  createCategory(product: Category): any{
    return this.http.post(`${environment.url_api}/category`, product)
    .pipe(
      catchError(this.handleError),
    );
  }

  updateCategory(id: number, changes: Partial<Category> ): any{
    return this.http.put(`${environment.url_api}/category/${id}`, changes)
    .pipe(
      catchError(this.handleError),
    );
  }

  deleteCategory(id: number): any{
    return this.http.delete(`${environment.url_api}/category/${id}`)
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse ) {
    console.log(error);
    return  throwError('ups algo salió mal');
  }
}
