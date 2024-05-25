import { IPaginateResponse } from '../types/page';
import { IResponseReview, IReview } from '../types/Review/review';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  reviews: IReview[];
  responseReviews: IResponseReview[];
  reviewDetail: IReview;
  responseReviewDetail: IResponseReview;
  isLoading: boolean;
  isError: boolean;
  message: string;
  paginate: IPaginateResponse;
};

const initialState: IInitialState = {
  reviews: [],
  responseReviews: [],
  reviewDetail: {},
  responseReviewDetail: {},
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

const getListReviewPending = requestPending;
const getReviewDetailPending = requestPending;
const createReviewPending = requestPending;
const deleteReviewPending = requestPending;
const createResponseReviewPending = requestPending;
const getResponseOfReviewPending = requestPending;
const deleteResponseReviewPending = requestPending;
const filterReviewPending = requestPending;

const getReviewDetailError = requestError;
const createReviewError = requestError;
const getListReviewError = requestError;
const deleteReviewError = requestError;
const createResponseReviewError = requestError;
const getResponseOfReviewError = requestError;
const deleteResponseReviewError = requestError;
const filterReviewError = requestError;

const createReviewSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IReview;
  },
) => {
  state.reviews.push(action.payload);
  state.isLoading = false;
  state.isError = false;
};

const getListReviewSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { reviews: IReview[]; meta: IPaginateResponse };
  },
) => {
  state.reviews = action.payload.reviews;
  state.paginate = action.payload.meta;
  state.isLoading = false;
  state.isError = false;
};
const filterReviewSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IReview[];
  },
) => {
  state.reviews = action.payload;
  state.isLoading = false;
};

const getReviewDetailSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IReview;
  },
) => {
  state.reviewDetail = action.payload;
  state.isLoading = false;
};

const deleteReviewSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: number;
  },
) => {
  state.reviews = state.reviews.filter(review => review.id !== action.payload);
  state.isLoading = false;
  state.isError = false;
};

const createResponseReviewSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IResponseReview;
  },
) => {
  state.responseReviewDetail = action.payload;
  state.isLoading = false;
};

const getResponseOfReviewSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IResponseReview[];
  },
) => {
  state.responseReviews = action.payload;
  state.isLoading = false;
};

const deleteResponseReviewSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: number;
  },
) => {
  state.responseReviews = state.responseReviews.filter(
    response => response.id !== action.payload,
  );
  state.isLoading = false;
};
const manageReview = createSlice({
  name: 'reviews',
  initialState: initialState,
  reducers: {
    getListReviewPending,
    getListReviewError,
    getReviewDetailPending,
    getReviewDetailError,
    createReviewError,
    createReviewPending,
    createReviewSuccess,
    deleteReviewPending,
    createResponseReviewPending,
    getResponseOfReviewPending,
    deleteResponseReviewPending,
    filterReviewPending,
    filterReviewError,
    deleteReviewError,
    createResponseReviewError,
    getResponseOfReviewError,
    deleteResponseReviewError,
    getListReviewSuccess,
    getReviewDetailSuccess,
    deleteReviewSuccess,
    createResponseReviewSuccess,
    getResponseOfReviewSuccess,
    deleteResponseReviewSuccess,
    filterReviewSuccess,
  },
});

export default manageReview.reducer;

export const manageReviewActions = manageReview.actions;
