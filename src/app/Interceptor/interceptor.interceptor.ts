import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
console.log("interceptor");

    const isLoginOrSignUp = request.url.includes('login') || request.url.includes('signup');
    const token = localStorage.getItem('userToken');
    if (!isLoginOrSignUp && token) {
      request = request.clone({
        setHeaders: {
          Authorization:`Bearer ${token}`,
        },

      });
    }
    return next.handle(request);
  }
}

