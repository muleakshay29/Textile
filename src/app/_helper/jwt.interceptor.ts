import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      return next.handle(request);
    }

    if (currentUser && currentUser.token) {
      const req1 = request.clone({
        headers: request.headers.set(
          "Authorization",
          `Bearer ${currentUser.token}`
        ),
      });

      return next.handle(req1);
    }
  }
}
