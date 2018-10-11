import { Moment } from 'moment';
import { IOrderLineMySuffix } from 'app/shared/model//order-line-my-suffix.model';

export interface IOrderBookMySuffix {
    id?: number;
    orderDate?: Moment;
    totalPrice?: number;
    discount?: string;
    priceAfterDiscount?: number;
    orderStatus?: string;
    customerId?: number;
    deliveryAddressId?: number;
    orderLineItems?: IOrderLineMySuffix[];
}

export class OrderBookMySuffix implements IOrderBookMySuffix {
    constructor(
        public id?: number,
        public orderDate?: Moment,
        public totalPrice?: number,
        public discount?: string,
        public priceAfterDiscount?: number,
        public orderStatus?: string,
        public customerId?: number,
        public deliveryAddressId?: number,
        public orderLineItems?: IOrderLineMySuffix[]
    ) {}
}
