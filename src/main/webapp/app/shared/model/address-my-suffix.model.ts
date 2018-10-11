export interface IAddressMySuffix {
    id?: number;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    countryId?: number;
}

export class AddressMySuffix implements IAddressMySuffix {
    constructor(
        public id?: number,
        public address1?: string,
        public address2?: string,
        public city?: string,
        public state?: string,
        public zip?: string,
        public countryId?: number
    ) {}
}
