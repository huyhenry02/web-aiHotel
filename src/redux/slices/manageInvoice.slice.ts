import { IPaginateResponse } from '../types/page';
import { IInvoice } from '../types/invoice';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  invoices: IInvoice[];
  invoiceDetail: IInvoice;
  isLoading: boolean;
  isError: boolean;
  message: string;
  paginate: IPaginateResponse;
};

const initialState: IInitialState = {
  invoices: [],
  invoiceDetail: {},
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

const getListInvoicePending = requestPending;
const getListInvoiceError = requestError;
const getInvoiceDetailPending = requestPending;
const getInvoiceDetailError = requestError;
const updateListInvoicePending = requestPending;
const updateListInvoiceError = requestError;

const getListInvoiceSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: {
      invoices: IInvoice[];
      meta: IPaginateResponse;
    };
  },
) => {
  state.invoices = action.payload.invoices;
  state.paginate = action.payload.meta;
  state.isLoading = false;
  state.isError = false;
};

const getInvoiceDetailSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IInvoice;
  },
) => {
  state.invoiceDetail = action.payload;
  const invoiceIndex = state.invoices.findIndex(
    inv => inv.id === action.payload.id,
  );
  if (invoiceIndex !== -1) {
    state.invoices[invoiceIndex] = action.payload;
  }
  state.isLoading = false;
  state.isError = false;
};

const updateListInvoiceSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IInvoice;
  },
) => {
  state.isLoading = false;
  state.isError = false;
};

const manageInvoice = createSlice({
  name: 'invoice',
  initialState: initialState,
  reducers: {
    getListInvoicePending,
    getListInvoiceError,
    getListInvoiceSuccess,
    getInvoiceDetailPending,
    getInvoiceDetailError,
    getInvoiceDetailSuccess,
    updateListInvoicePending,
    updateListInvoiceError,
    updateListInvoiceSuccess,
  },
});

export default manageInvoice.reducer;

export const manageInvoiceActions = manageInvoice.actions;
