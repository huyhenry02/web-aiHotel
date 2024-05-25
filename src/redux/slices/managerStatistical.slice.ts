import { IStatistical } from '../types/statistical';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  statistical: IStatistical[];
  isLoading: boolean;
  isError: boolean;
  message: string;
};

const initialState: IInitialState = {
  statistical: [],
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

const getListStatisticalPending = requestPending;
const getListStatisticalError = requestError;

const getListStatisticalSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IStatistical[];
  },
) => {
  state.statistical = action.payload;
  state.isLoading = false;
};

const manageStatistical = createSlice({
  name: 'statistical',
  initialState: initialState,
  reducers: {
    getListStatisticalPending,
    getListStatisticalError,
    getListStatisticalSuccess,
  },
});

export default manageStatistical.reducer;

export const manageStatisticalActions = manageStatistical.actions;
