import { Injectable } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req,next){
    let tokenizedReq=req.clone({
      setHeaders:{
        Authorization: 'Bearer '+localStorage.getItem('Token')
      }
    })
    return next.handle(tokenizedReq);
  }
}
