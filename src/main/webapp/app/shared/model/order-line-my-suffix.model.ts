export interface IOrderLineMySuffix {
    id?: number;
    quantity?: number;
    rate?: number;
    totalPrice?: number;
    discount?: number;
    orderBookId?: number;
    itemId?: number;
}

export class OrderLineMySuffix implements IOrderLineMySuffix {
    constructor(
        public id?: number,
        public quantity?: number,
        public rate?: number,
        public totalPrice?: number,
        public discount?: number,
        public orderBookId?: number,
        public itemId?: number
    ) {}
}
