import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../Models/User-Model';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  readonly rootURI="https://localhost:44331/api/";
  Login(user:UserModel){
    var reqHeader=new HttpHeaders({'Content-Type':'application/json'});

    return this.http.post(this.rootURI+"login/Login",user,{headers:reqHeader});
  }
}
