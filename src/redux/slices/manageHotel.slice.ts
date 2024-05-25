import { IHotel } from '../types/hotel';
import { createSlice } from '@reduxjs/toolkit';
import { IPaginateResponse } from '../types/page';

type IInitialState = {
  hotels: IHotel[];
  hotelDetail: IHotel;
  isLoading: boolean;
  isError: boolean;
  message: string;
  paginate: IPaginateResponse;
};

const initialState: IInitialState = {
  hotels: [],
  hotelDetail: {},
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

const getListHotelPending = requestPending;
const getListHotelError = requestError;
const getHotelDetailPending = requestPending;
const getHotelDetailError = requestError;
const createHotelError = requestError;
const createHotelPending = requestPending;
const updateHotelPending = requestPending;
const updateHotelError = requestError;
const deleteHotelPending = requestPending;
const deleteHotelError = requestError;

const getListHotelSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { hotels: IHotel[]; meta: IPaginateResponse };
  },
) => {
  state.hotels = action.payload.hotels;
  state.paginate = action.payload.meta;
  state.isLoading = false;
};

const getHotelDetailSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IHotel;
  },
) => {
  state.hotelDetail = action.payload;
  state.isLoading = false;
};

const createHotelSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IHotel;
  },
) => {
  state.hotels.push(action.payload);
  state.isLoading = false;
  state.isError = false;
};

const updateHotelSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IHotel;
  },
) => {
  state.hotelDetail = action.payload;
  const hotelIndex = state.hotels.findIndex(
    hotel => hotel.id === action.payload.id,
  );
  if (hotelIndex !== -1) {
    state.hotels[hotelIndex] = action.payload;
  }
  state.isLoading = false;
  state.isError = false;
};

const deleteHotelSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: number;
  },
) => {
  state.hotels = state.hotels.filter(hotel => hotel.id !== action.payload);
  state.isLoading = false;
  state.isError = false;
};

const manageHotel = createSlice({
  name: 'hotels',
  initialState: initialState,
  reducers: {
    getListHotelPending,
    getListHotelError,
    getListHotelSuccess,
    getHotelDetailPending,
    getHotelDetailError,
    getHotelDetailSuccess,
    createHotelError,
    createHotelPending,
    createHotelSuccess,
    updateHotelPending,
    updateHotelError,
    updateHotelSuccess,
    deleteHotelPending,
    deleteHotelError,
    deleteHotelSuccess,
  },
});

export default manageHotel.reducer;

export const manageHotelActions = manageHotel.actions;
