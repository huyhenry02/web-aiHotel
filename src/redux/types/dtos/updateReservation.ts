import { IUser } from '../user';
import { IHotel } from '../hotel';
import { IRoomType } from '../roomType';
import { IRoom } from '../room';

export type IUpdateReservation = {
  reservation_id?: number;
  code?: string;
  user?: IUser;
  hotel?: IHotel;
  room_type?: IRoomType;
  room?: IRoom;
  start_date?: string;
  end_date?: string;
  check_in?: string;
  check_out?: string;
  amount_person?: number;
  status?: string;
  reject_reason?: string;
};
