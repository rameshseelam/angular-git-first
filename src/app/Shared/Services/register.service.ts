import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TerminalMerchantModel } from '../Models/Terminal-Merchant-Model';
import {TerminalModel} from '../Models/Terminal-Model';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  readonly rootURI="https://localhost:44331/api/";
  GetTerminal(terminal:TerminalModel){
    var reqHeader=new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.rootURI+"Terminal/SearchTerminal",terminal,{headers:reqHeader});
  }
 
  AddTerminal(terminal:TerminalModel){
    var reqHeader=new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.rootURI+"Terminal/AddTerminal",terminal,{headers:reqHeader});
  }

  GetCiites(){
    return this.http.get(this.rootURI+"Terminal/FetchCities");
  }

  SaveTerminalMerchant(terminalMerchant:TerminalMerchantModel){
    terminalMerchant.createdByFk=Number(localStorage.getItem('UserPk'));
    terminalMerchant.lastUpatedByFk=Number(localStorage.getItem('UserPk'));
    terminalMerchant.isActive=1;
    var reqHeader=new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.rootURI+"Terminal/SaveTerminalMerchant",terminalMerchant,{headers:reqHeader});
  }

  DeleteTerminal(terminalPk:number){
    return this.http.delete(this.rootURI+"Terminal/DeleteTerminalMerchant?terminalPk="+terminalPk);
  }


}
