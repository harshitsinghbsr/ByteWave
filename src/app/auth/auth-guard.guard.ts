import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    console.log("token2" , token);

    // If token exists, allow access
    if (token) {
      return true;
    }

    // If no token, redirect to login page
    console.log('AuthGuard: No token found, redirecting to login');
    this.router.navigate(['/loginpage'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
