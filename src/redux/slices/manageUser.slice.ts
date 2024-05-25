import { IHotel } from '../types/hotel';
import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../types/user';
import { IPaginateResponse } from '../types/page';

type IInitialState = {
  users: IUser[];
  userDetail: IUser;
  isLoading: boolean;
  isError: boolean;
  message: string;
  paginate: IPaginateResponse;
};
const initialState: IInitialState = {
  users: [],
  userDetail: {},
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

const getListUserPending = requestPending;
const getListUserError = requestError;
const getUserDetailPending = requestPending;
const getUserDetailError = requestError;
const createUserError = requestError;
const createUserPending = requestPending;
const updateUserError = requestError;
const updateUserPending = requestPending;
const deleteUserError = requestError;
const deleteUserPending = requestPending;

const getListUserSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: {
      users: IUser[];
      meta: IPaginateResponse;
    };
  },
) => {
  state.users = action.payload.users;
  state.paginate = action.payload.meta;
  state.isLoading = false;
};

const createUserSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IHotel;
  },
) => {
  state.users.push(action.payload);
  state.isLoading = false;
  state.isError = false;
};
const getUserDetailSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IUser;
  },
) => {
  state.userDetail = action.payload;
  state.isLoading = false;
  state.isError = false;
};

const updateUserSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IUser;
  },
) => {
  const userIndex = state.users.findIndex(
    user => user.id === action.payload.id,
  );
  if (userIndex !== -1) {
    state.users[userIndex] = action.payload;
  }
  state.isLoading = false;
  state.isError = false;
};

const deleteUserSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: number;
  },
) => {
  state.users = state.users.filter(user => user.id !== action.payload);
  state.isLoading = false;
  state.isError = false;
};
const manageUser = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    getListUserError,
    getListUserPending,
    getListUserSuccess,
    createUserError,
    createUserPending,
    createUserSuccess,
    getUserDetailError,
    getUserDetailPending,
    getUserDetailSuccess,
    updateUserError,
    updateUserPending,
    updateUserSuccess,
    deleteUserError,
    deleteUserPending,
    deleteUserSuccess,
  },
});

export default manageUser.reducer;

export const manageUserActions = manageUser.actions;
