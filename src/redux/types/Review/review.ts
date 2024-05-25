import { IRoom } from '../room';
import { IUser } from '../user';
import { IHotel } from '../hotel';
import { IRoomType } from '../roomType';

export type IReview = {
  id?: number;
  content?: string;
  rating?: number;
  room?: IRoom;
  hotel?: IHotel;
  room_type?: IRoomType;
  user?: IUser;
  created_at?: string;
};

export type IResponseReview = {
  id?: number;
  content?: string;
  review?: IReview;
  user?: IUser;
  created_at?: string;
};

export type ICreateReview = {
  id?: number;
  room_id?: number;
  content?: string;
  rating?: number;
};

export type ICreateResponseReview = {
  id?: number;
  review_id?: number;
  content?: string;
};
