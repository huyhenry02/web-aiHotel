import { IRoomType } from '../types/roomType';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  room_types: IRoomType[];
  isLoading: boolean;
  isError: boolean;
  message: string;
};

const initialState: IInitialState = {
  room_types: [],
  isLoading: false,
  isError: false,
  message: '',
};

const requestPending = (state: IInitialState) => {
  state.isLoading = true;
  state.isError = false;
  state.message = '';
};

const requestError = (
  state: IInitialState,
  action: { type: string; payload: { message: string } },
) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload.message;
};

const getListRoomTypePending = requestPending;
const getListRoomTypeError = requestError;

const getListRoomTypeSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IRoomType[];
  },
) => {
  state.room_types = action.payload;
  state.isLoading = false;
};

const manageRoomType = createSlice({
  name: 'room_type',
  initialState: initialState,
  reducers: {
    getListRoomTypePending,
    getListRoomTypeError,
    getListRoomTypeSuccess,
  },
});

export default manageRoomType.reducer;

export const manageRoomTypeActions = manageRoomType.actions;
