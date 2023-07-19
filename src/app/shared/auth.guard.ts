import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthserviceService } from '../authservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthserviceService, private route: Router) {}
  canActivate() {
    //debugger;
    if (this.service.isLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['']);
      return false;
    }
  }
}
