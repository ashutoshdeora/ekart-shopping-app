export interface ICountryMySuffix {
    id?: number;
    countryName?: string;
}

export class CountryMySuffix implements ICountryMySuffix {
    constructor(public id?: number, public countryName?: string) {}
}
