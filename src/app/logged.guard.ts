import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
    constructor(
      private authService: AuthService,
      private router: Router
    ) {
  
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.authService.hasUserAdmin(route.data.expectedRole)){
        this.router.navigate(['/auth/login']);
        return false;
      }
    return true;
  }
  
}
