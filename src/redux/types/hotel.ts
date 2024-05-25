import { IRoomType } from './roomType';

export type IHotel = {
  id?: number;
  name?: string;
  address?: string;
  description?: string;
  room_types?: IRoomType[];
  file?: string;
};
