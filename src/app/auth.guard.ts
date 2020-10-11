import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/app/Shared/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _authService:AuthService,private route:Router){

  }

  canActivate():boolean{
    if(this._authService.IsLoggedIn()){
      return true
    }
    else{
      this.route.navigate(['/login']);
      return false;
    }
  }
  
}
