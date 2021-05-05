import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Category } from '@core/models/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAllCategories(establishmentIdSend: number): any {
    const establishmentId = establishmentIdSend.toString();
    return this.http.get(`${environment.url_api}/categories/establishmentCategories`,
      {
        params:
        {
          establishmentId
        }
      }).pipe(
        map(
          (result: { categories: Category[] }) => result.categories
        ),
        catchError(this.handleError),
      )
      ;
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get(`${environment.url_api}/categories`, { params: { id } })
      .pipe(
        map((data: { category: Category }) => data.category),
        catchError(this.handleError),
      );
  }
  createCategory(category: Partial<Category>, establishmentIdSend: number): any {
    const establishmentId = establishmentIdSend.toString();
    const categories: any = category;
    categories.establishmentId = establishmentIdSend;
    return this.http.post(`${environment.url_api}/categories`, categories)
      .pipe(
        catchError(this.handleError),
      );
  }
  updateCategory(id: string, category: Partial<Category>, establishmentIdSend: number): any {
    const establishmentId = establishmentIdSend.toString();
    const categories: any = category;
    categories.establishmentId = establishmentIdSend;
    categories.id = id;
    return this.http.put(`${environment.url_api}/categories`, categories)
      .pipe(
        catchError(this.handleError),
      );
  }


  deleteCategory(idNumber: number): any {
    const id = idNumber.toString();
    return this.http.delete(`${environment.url_api}/categories`, { params: { id } })
      .pipe(
        catchError(this.handleError),
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('ups algo salió mal');
  }
}
