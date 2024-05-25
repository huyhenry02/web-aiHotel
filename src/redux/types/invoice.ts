import { IUser } from './user';
import { IService } from './service';

export type IInvoice = {
  id?: number;
  code?: string;
  status?: string;
  total_day?: string;
  total_price?: string;
  pay_method?: string;
  payment_intent_id?: string;
  currency?: string;
  userCheckIn?: IUser;
  userCheckOut?: IUser;
  userPaid?: IUser;
  services?: IService;
};
