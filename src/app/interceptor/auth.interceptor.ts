import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // execute this block if not login
    const loginUrl = `${environment.restApiUrl}api/signin`;

    if(request.url !== loginUrl){
      // Get auth token for service
      // Set header
      const headers = new HttpHeaders()
        .set('Authorization',`Token ${this.auth.accessToken.value}`)
        .set('Accept','*/*')
        // .set('content-type', 'multipart/form-data')
      
      // Clone headers, update with authorization
      const authReq = request.clone({
        headers
      });

      // send  cloned request with headerto the next handler
      return next.handle(authReq).pipe(
        filter(event => event instanceof HttpResponse),
        tap((event) => {})
      )
    }

    const paramReq = request.clone();
    return next.handle(paramReq);
  }
}
