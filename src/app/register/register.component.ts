import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CitiesModel } from '../Shared/Models/CIties-Model';
import { TerminalModel } from '../Shared/Models/Terminal-Model';
import { RegisterService } from '../Shared/Services/register.service';
import {NgForm} from '@angular/forms';
import { TerminalMerchantModel } from '../Shared/Models/Terminal-Merchant-Model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  terminal=new TerminalMerchantModel();
  ter=new TerminalModel();
  cities:CitiesModel[];

  constructor(private _terminalService:RegisterService,private _toastr: ToastrService,private _route: Router) { 
    this.terminal.terminalId=null;
    this.cities=[];
   
  }

  ngOnInit(): void {
    this.GetCities();
  
  }

  OnSearch(form:NgForm){
    this.ter.TerminalId=form.value.terminalId;
    this.ter.TerminalPK=0;
    this._terminalService.GetTerminal(this.ter).subscribe((res:any)=>{
       if(res.Status=="Success"){
         
          this.terminal=res.Data;
       }
       else{
        this._toastr.warning('No Terminal Found', 'Terminal');
        this.ResetForm();
        
       }
    });
  }

  AddTerminal(form:NgForm){
    if(this.terminal.terminalId!=0 && this.terminal.terminalId!=null){
      this.ter.TerminalId=form.value.terminalId;
      this.ter.TerminalPK=0;
      this._terminalService.AddTerminal(this.ter).subscribe((res:any)=>{
        if(res.Status=="Success"){
          this._toastr.success('Terminal Saved Successfully', 'Terminal');
          this.terminal.terminalFk=res.PKValue;
        }
        else{
         this._toastr.warning(res.ErrorMessage, 'Terminal');

        }
      });
    }
    else{
      this._toastr.warning('Please enter Terminal ID', 'Terminal');
    }
  }

  GetCities(){
    this._terminalService.GetCiites().subscribe((res:any)=>{
        if(res.Status=="Success"){
          this.cities=res.Data;
        }
    })
  }

  SaveTerminalMerchant(form:NgForm){

   if(form.value.TerminalFk!=0){
    this._terminalService.SaveTerminalMerchant(form.value).subscribe((res:any)=>{
      if(res.Status=="Success"){
        this._toastr.success('Terminal Saved Successfully', 'Terminal');
      }
      else{
       this._toastr.warning(res.ErrorMessage, 'Terminal');
      }
    });
   }else{
    this._toastr.warning('Pleaes check entered Terminal Id is available or not', 'Terminal');
   }
  }

  OnChangeCity(event:any){
    let city = this.cities.find(i => i.cityPk === Number(event));
    if(city!=undefined){
      this.terminal.cityFk=city.cityPk;
      this.terminal.cityId=city.cityId;
      this.terminal.cityNameEn=city.cityNameEn;
      this.terminal.cityNameAr=city.cityNameAr;
    }else{
      this.terminal.cityFk=0;
      this.terminal.cityId='';
      this.terminal.cityNameEn='';
      this.terminal.cityNameAr='';
    }
  }

   ResetForm(){
     this.terminal.merchantPk=0;
     this.terminal.terminalFk=0;
    this.terminal.terminalId=null;
     this.terminal.merchantAddressEn='';
     this.terminal.merchantAddressAr='';
     this.terminal.merchantNameEn='';
     this.terminal.merchantNameAr='';
     this.terminal.isActive=1;
     this.terminal.createdByFk=Number(localStorage.getItem('UserPk'));
     this.terminal.lastUpdatedOn=null;
     this.terminal.createdOn=null;
     this.terminal.lastUpatedByFk=Number(localStorage.getItem('UserPk'));
     this.terminal.cityFk=0;
     this.terminal.cityId='';
     this.terminal.cityNameEn='';
     this.terminal.cityNameAr='';
     
    
   }

   DeleteTerminalMerchant(form:NgForm){
     this._terminalService.DeleteTerminal(form.value.terminalFk).subscribe((res:any)=>{
      if(res.Status=="Success"){
        this._toastr.success('Terminal deleted Successfully', 'Terminal');
        this.ResetForm();
      }
      else{
       this._toastr.warning(res.ErrorMessage, 'Terminal');
      }
     })
   }

   LogOut(){
     localStorage.clear();
     this._route.navigate(['/login']);
   }
}
