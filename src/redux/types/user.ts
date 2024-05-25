import { IReservation } from './reservation';

export type IUser = {
  id?: number;
  name?: string;
  role_type?: string;
  address?: string;
  phone?: string;
  identification?: string;
  email?: string;
  age?: number;
  reservations?: IReservation[];
};
