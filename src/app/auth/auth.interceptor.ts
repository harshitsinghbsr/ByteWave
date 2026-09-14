import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('authToken');
    console.log("token1" , token);
    // If token exists, clone the request and add the Authorization header
    if (token) {
      // Clone the request to add the new header
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 200 && error.error.message === 'Token Expired') {
            localStorage.removeItem('authToken');  // Clear expired token
            // this.router.navigate(['/loginpage']);  // Redirect to login page
          }
          return throwError(error);
        })
      );  // Send the cloned request with the Authorization header
    }
    return next.handle(request);
  }
}
