import { IPaginateResponse } from '../types/page';
import { createSlice } from '@reduxjs/toolkit';
import { IReservation } from '../types/reservation';

type IInitialState = {
  reservations: IReservation[];
  reservation: IReservation;
  isLoading: boolean;
  isError: boolean;
  message: string;
  paginate: IPaginateResponse;
};

const initialState: IInitialState = {
  reservations: [],
  reservation: {},
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

const createReservationPending = requestPending;
const createReservationError = requestError;
const getListReservationPending = requestPending;
const getListReservationError = requestError;
const getReservationDetailError = requestError;
const getReservationPending = requestPending;
const checkInReservationPending = requestPending;
const checkInReservationError = requestError;
const checkOutReservationPending = requestPending;
const checkOutReservationError = requestError;
const updateReservationPending = requestPending;
const updateReservationError = requestError;

const createReservationSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IReservation;
  },
) => {
  state.reservation = action.payload;
  state.isLoading = false;
  state.isError = false;
};

const getListReservationSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: {
      reservations: IReservation[];
      meta: IPaginateResponse;
    };
  },
) => {
  state.reservations = action.payload.reservations;
  state.paginate = action.payload.meta;
  state.isLoading = false;
  state.isError = false;
};
const getReservationSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IReservation;
  },
) => {
  state.reservation = action.payload;
  state.isLoading = false;
};
const checkInReservationSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IReservation;
  },
) => {
  state.reservation = action.payload;
  state.isLoading = false;
};
const checkOutReservationSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IReservation;
  },
) => {
  state.reservation = action.payload;
  state.isLoading = false;
};
const updateReservationSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IReservation;
  },
) => {
  state.reservation = action.payload;
  state.isLoading = false;
};
const manageReservation = createSlice({
  name: 'reservation',
  initialState: initialState,
  reducers: {
    createReservationPending,
    createReservationError,
    createReservationSuccess,
    getListReservationPending,
    getListReservationError,
    getListReservationSuccess,
    getReservationSuccess,
    getReservationDetailError,
    getReservationPending,
    checkInReservationPending,
    checkInReservationError,
    checkOutReservationPending,
    checkOutReservationError,
    updateReservationPending,
    updateReservationError,
    checkInReservationSuccess,
    checkOutReservationSuccess,
    updateReservationSuccess,
  },
});

export default manageReservation.reducer;

export const manageReservationActions = manageReservation.actions;
