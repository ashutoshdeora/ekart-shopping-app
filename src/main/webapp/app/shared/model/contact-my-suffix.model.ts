export interface IContactMySuffix {
    id?: number;
    mobile?: string;
    workPhone?: string;
    homePhone?: string;
    email?: string;
}

export class ContactMySuffix implements IContactMySuffix {
    constructor(public id?: number, public mobile?: string, public workPhone?: string, public homePhone?: string, public email?: string) {}
}
