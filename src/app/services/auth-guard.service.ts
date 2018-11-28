import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(){
    if(this.authService.isLoggedIn()){
      console.log('Sí puede entrar a dashboard');
      return true;
    }
    console.log('No puede entrar a dashboard, redirecting');
    this.router.navigate(['/login']);
    return false;
  }
}
