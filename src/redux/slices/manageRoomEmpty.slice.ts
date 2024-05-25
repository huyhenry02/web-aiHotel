import { IRoomEmpty } from '../types/dtos/roomEmpty';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  roomEmpty: IRoomEmpty[];
  isLoading: boolean;
  isError: boolean;
  message: string;
};

const initialState: IInitialState = {
  roomEmpty: [],
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

const getListRoomEmptyPending = requestPending;
const getListRoomEmptyError = requestError;

const getListRoomEmptySuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IRoomEmpty[];
  },
) => {
  state.roomEmpty = action.payload;
  state.isLoading = false;
};

const manageRoomEmpty = createSlice({
  name: 'room_empty',
  initialState: initialState,
  reducers: {
    getListRoomEmptyPending,
    getListRoomEmptyError,
    getListRoomEmptySuccess,
  },
});

export default manageRoomEmpty.reducer;

export const manageRoomEmptyActions = manageRoomEmpty.actions;
