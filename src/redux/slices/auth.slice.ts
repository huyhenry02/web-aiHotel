import { IUser } from '../types/user';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  userInfo: IUser;
  token: string;
  isLoading: boolean;
  isError: boolean;
  message: string;
};

const initialState: IInitialState = {
  userInfo: {},
  token: '',
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

const loginPending = requestPending;
const loginError = requestError;
const getInfoPending = requestPending;
const getInfoError = requestError;
const logoutPending = requestPending;
const logoutError = requestError;
const registerPending = requestPending;
const registerError = requestError;
const changePasswordPending = requestPending;
const changePasswordError = requestError;
const updateInfoPending = registerPending;
const updateInfoError = requestError;
const resetPasswordPending = requestPending;
const resetPasswordError = requestError;

const loginSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: string;
  },
) => {
  state.token = action.payload;
  state.isLoading = false;
  state.isError = false;
};

const getInfoSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IUser;
  },
) => {
  state.userInfo = action.payload;
  state.isLoading = false;
  state.isError = false;
};

const logoutSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: string;
  },
) => {
  state.token = '';
  state.userInfo = {};
  state.isLoading = false;
  localStorage.clear();
};

const registerSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: string;
  },
) => {
  state.token = action.payload;
  state.isLoading = false;
  state.isError = false;
};

const changePasswordSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: string;
  },
) => {
  // state.token = action.payload;
  state.isLoading = false;
};

const updateInfoSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: object;
  },
) => {
  state.userInfo = action.payload;
  state.isLoading = false;
};
const resetPasswordSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: object;
  },
) => {
  state.userInfo = action.payload;
  state.isLoading = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginPending,
    loginError,
    loginSuccess,
    getInfoPending,
    getInfoError,
    getInfoSuccess,
    logoutPending,
    logoutError,
    logoutSuccess,
    registerPending,
    registerError,
    registerSuccess,
    changePasswordPending,
    changePasswordError,
    changePasswordSuccess,
    updateInfoPending,
    updateInfoError,
    updateInfoSuccess,
    resetPasswordError,
    resetPasswordPending,
    resetPasswordSuccess,
  },
});

export default authSlice.reducer;

export const authActions = authSlice.actions;
