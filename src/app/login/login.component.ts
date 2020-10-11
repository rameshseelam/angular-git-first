import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserModel} from '../Shared/Models/User-Model';
import {LoginService} from '../Shared/Services/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user=new UserModel();
  constructor(private _loginServie:LoginService,private _toastr: ToastrService,
    private _route: Router) { }

    
  ngOnInit(): void {
  }

  //#region  login
  OnLogin(form:NgForm){
    this._loginServie.Login(form.value).subscribe((res:any)=>{
      if(res.Token!=null){
        localStorage.setItem('Token', res.Token);
        localStorage.setItem('UserPk', res.UserPk);
        localStorage.setItem('UserName', res.UserName);
        this._route.navigate(['/register']);
      }
      else{
        this._toastr.warning(''+res.ErrorMessage+'', 'Login');
      }
    },
    (err:HttpErrorResponse)=>{
      this._toastr.warning(''+err.error.error_description+'', ''+err.error.error+'');
    })
  }
  //#endregion

}
