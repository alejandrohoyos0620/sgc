import { Injectable } from '@angular/core';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from '@core/services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addToken(request);
    console.log(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>): any{
    const Authorization = 'bearer ' + this.tokenService.getToken();
    if (Authorization) {
      request = request.clone({
        setHeaders: {
            Authorization,
        },
      });
      return request;
    }
    return request;
  }
}
