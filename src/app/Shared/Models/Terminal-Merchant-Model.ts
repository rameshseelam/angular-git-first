export class TerminalMerchantModel {
    merchantPk:number=0;
    terminalFk:number=0;
    merchantNameEn:string;
    merchantNameAr:string;
    merchantAddressEn:string;
    merchantAddressAr:string;
    cityFk:number;
    isActive:number=1;
    createdByFk:number=Number(localStorage.getItem('UserPk'));
    createdOn:Date=null;
    lastUpatedByFk:number=Number(localStorage.getItem('UserPk'));;
    lastUpdatedOn:Date=null;
    terminalId:number=null;

    cityId:string;
    cityNameEn:string;
    cityNameAr:string;
 }
 
 