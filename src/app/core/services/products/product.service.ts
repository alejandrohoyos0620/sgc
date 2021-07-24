import { Injectable } from '@angular/core';
import {Product} from '../../models/product.model';
import {environment} from '@environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError, retry} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getAllProductsByEstablishment(establishmentIdSend: number): any{
    const establishmentId = establishmentIdSend.toString();
    return this.http.get<Product[]>(`${environment.url_api}/products/filterByEstablishment`, { params: { establishmentId } })
    .pipe(
      catchError(this.handleError),
    );
  }
  getAllProductsByCatalog(establishmentIdSend: number, page: string): any{
    const establishmentId = establishmentIdSend.toString();
    if(page=='0'){
      return this.http.get<Product[]>(`${environment.url_api}/products/filterEnabledByEstablishment`, { params: { establishmentId} })
      .pipe(
        catchError(this.handleError),
      );
    }else{
      return this.http.get<Product[]>(`${environment.url_api}/products/filterEnabledByEstablishment`, { params: { establishmentId, page } })
      .pipe(
        catchError(this.handleError),
      );
    }
    
  }

  getAllProductsByCategory(category_Id: number): any{
    const categoryId = category_Id.toString();
    return this.http.get<Product[]>(`${environment.url_api}/products/filterByCategory`, { params: { categoryId } })
    .pipe(
      catchError(this.handleError),
    );
  }

  getProduct(id: string): Observable<any>{
    return this.http.get<any>(`${environment.url_api}/products`, { params: { id } })
    .pipe(
      catchError(this.handleError),
    );
  }

  createProduct(product: Partial<Product>, establishmentIdSend: number): any{
    const products: any = product;
    products.establishmentId = establishmentIdSend;
    return this.http.post(`${environment.url_api}/products`, products)
    .pipe(
      catchError(this.handleError),
    );
  }

  updateProduct(id: string, changes: Partial<Product>, establishmentIdSend: number): any{
    const product: any = changes;
    product.establishmentId = establishmentIdSend;
    product.id = id;
    return this.http.put(`${environment.url_api}/products`, product)
    .pipe(
      catchError(this.handleError),
    );
  }

  deleteProduct(idIn: number): any{
    const id = idIn.toString();
    return this.http.delete(`${environment.url_api}/products` , { params: { id }})
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return  throwError('ups algo salió mal');
  }
}
