import { IRoom } from '../types/room';
import { IPaginateResponse } from '../types/page';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  rooms: IRoom[];
  roomDetail: IRoom;
  isLoading: boolean;
  isError: boolean;
  message: string;
  paginate: IPaginateResponse;
};

const initialState: IInitialState = {
  rooms: [],
  roomDetail: {},
  isLoading: false,
  isError: false,
  message: '',
  paginate: {
    count: 0,
    current_page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    links: {},
  },
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

const getListRoomPending = requestPending;
const getListRoomError = requestError;
const getRoomDetailPending = requestPending;
const getRoomDetailError = requestError;
const createRoomPending = requestPending;
const createRoomError = requestError;
const updateRoomError = requestError;
const updateRoomPending = requestPending;
const deleteRoomPending = requestPending;
const deleteRoomError = requestError;

const getListRoomSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: {
      rooms: IRoom[];
      meta: IPaginateResponse;
    };
  },
) => {
  state.rooms = action.payload.rooms;
  state.paginate = action.payload.meta;
  state.isLoading = false;
  state.isError = false;
};

const createRoomSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IRoom;
  },
) => {
  state.rooms.push(action.payload);
  state.isLoading = false;
  state.isError = false;
};

const getRoomDetailSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IRoom;
  },
) => {
  state.roomDetail = action.payload;
  state.isLoading = false;
  state.isError = false;
};

const updateRoomSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IRoom;
  },
) => {
  const roomIndex = state.rooms.findIndex(
    room => room.id === action.payload.id,
  );
  if (roomIndex !== -1) {
    state.rooms[roomIndex] = action.payload;
  }
  state.isLoading = false;
  state.isError = false;
};

const deleteRoomSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: number;
  },
) => {
  state.rooms = state.rooms.filter(room => room.id !== action.payload);
  state.isLoading = false;
  state.isError = false;
};

const manageRoomSlice = createSlice({
  name: 'rooms',
  initialState: initialState,
  reducers: {
    getListRoomPending,
    getListRoomError,
    getListRoomSuccess,
    getRoomDetailPending,
    getRoomDetailError,
    getRoomDetailSuccess,
    createRoomPending,
    createRoomError,
    createRoomSuccess,
    updateRoomError,
    updateRoomPending,
    updateRoomSuccess,
    deleteRoomError,
    deleteRoomPending,
    deleteRoomSuccess,
  },
});

export default manageRoomSlice.reducer;

export const manageRoomActions = manageRoomSlice.actions;
