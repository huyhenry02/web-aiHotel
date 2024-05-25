import { createSlice } from '@reduxjs/toolkit';
import { IPaginateResponse } from '../types/page';
import { IService } from '../types/service';

type IInitialState = {
  services: IService[];
  serviceDetail: IService;
  isLoading: boolean;
  isError: boolean;
  message: string;
  paginate: IPaginateResponse;
};
const initialState: IInitialState = {
  services: [],
  serviceDetail: {},
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

const getListServicePending = requestPending;
const getListServiceError = requestError;
const getServicePending = requestPending;
const getServiceError = requestError;
const createServicePending = requestPending;
const createServiceError = requestError;
const updateServicePending = requestPending;
const updateServiceError = requestError;
const deleteServicePending = requestPending;
const deleteServiceError = requestError;

const getListServiceSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: {
      services: IService[];
      meta: IPaginateResponse;
    };
  },
) => {
  state.services = action.payload.services;
  state.paginate = action.payload.meta;
  state.isLoading = false;
};

const getServiceSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IService;
  },
) => {
  state.serviceDetail = action.payload;
  state.isLoading = false;
  state.isError = false;
};

const createServiceSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IService;
  },
) => {
  state.services.push(action.payload);
  state.isLoading = false;
  state.isError = false;
};

const updateServiceSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IService;
  },
) => {
  const serviceIndex = state.services.findIndex(
    service => service.id === action.payload.id,
  );
  if (serviceIndex !== -1) {
    state.services[serviceIndex] = action.payload;
  }
  state.isLoading = false;
  state.isError = false;
};

const deleteServiceSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: number;
  },
) => {
  state.services = state.services.filter(
    service => service.id !== action.payload,
  );
  state.isLoading = false;
  state.isError = false;
};

const manageService = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {
    getListServiceError,
    getListServicePending,
    getListServiceSuccess,
    getServiceError,
    getServicePending,
    getServiceSuccess,
    createServiceError,
    createServicePending,
    createServiceSuccess,
    updateServiceError,
    updateServicePending,
    updateServiceSuccess,
    deleteServiceError,
    deleteServicePending,
    deleteServiceSuccess,
  },
});

export default manageService.reducer;
export const manageServiceActions = manageService.actions;
