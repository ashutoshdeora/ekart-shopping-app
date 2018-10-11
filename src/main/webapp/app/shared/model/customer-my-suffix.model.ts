export interface ICustomerMySuffix {
    id?: number;
    customerName?: string;
    customerCategory?: number;
    userId?: string;
    creditRating?: string;
    billToAddressId?: number;
    shipToAddressId?: number;
    contactDetailsId?: number;
}

export class CustomerMySuffix implements ICustomerMySuffix {
    constructor(
        public id?: number,
        public customerName?: string,
        public customerCategory?: number,
        public userId?: string,
        public creditRating?: string,
        public billToAddressId?: number,
        public shipToAddressId?: number,
        public contactDetailsId?: number
    ) {}
}
