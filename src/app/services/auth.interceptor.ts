import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  debugger
  console.log('interceptor called')
  const router = inject(Router);
  const token = localStorage.getItem('token')
  console.log(token)
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Token ${token}` }
    })
  }
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          console.error('Unauthorized request:', err);
          router.navigateByUrl('login')      
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          console.error('HTTP error:', err);
          router.navigateByUrl('login') 
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
        router.navigateByUrl('login') 
      }
      // Re-throw the error to propagate it further
      router.navigateByUrl('login') 
      return throwError(() => err); 
    })
  );;
};
