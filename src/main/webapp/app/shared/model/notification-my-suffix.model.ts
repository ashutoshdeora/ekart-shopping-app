import { Moment } from 'moment';

export interface INotificationMySuffix {
    id?: number;
    notificationDate?: Moment;
    notificationStatus?: number;
    reciepentAddress?: string;
    notificationBody?: string;
    orderDetailsId?: number;
}

export class NotificationMySuffix implements INotificationMySuffix {
    constructor(
        public id?: number,
        public notificationDate?: Moment,
        public notificationStatus?: number,
        public reciepentAddress?: string,
        public notificationBody?: string,
        public orderDetailsId?: number
    ) {}
}
