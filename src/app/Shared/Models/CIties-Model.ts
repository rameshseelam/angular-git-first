export class CitiesModel {
    cityPk: number;
    cityId: string;
    cityNameEn: string;
    cityNameAr: string;
    isActive: number;
    createdByFk?: any;
    createdOn?: any;
    lastUpdatedByFk?: any;
    lastUpdatedOn?: any;
}