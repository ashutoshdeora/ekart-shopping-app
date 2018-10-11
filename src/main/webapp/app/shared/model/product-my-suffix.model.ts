export interface IProductMySuffix {
    id?: number;
    productName?: string;
    productDescription?: string;
    productCategory?: number;
    availableStock?: string;
    cost?: number;
}

export class ProductMySuffix implements IProductMySuffix {
    constructor(
        public id?: number,
        public productName?: string,
        public productDescription?: string,
        public productCategory?: number,
        public availableStock?: string,
        public cost?: number
    ) {}
}
