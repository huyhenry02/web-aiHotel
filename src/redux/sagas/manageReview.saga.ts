import axiosInstance from '../../services/axios.service';
import { put, call, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { ICreateResponseReview, ICreateReview } from '../types/Review/review';
import { manageReviewActions } from '../slices/manageReview.slice';

const createReview = async (createReview: ICreateReview) => {
  return axiosInstance.post('/api/review/create', createReview);
};
const getListReview = async (payload: { per_page?: number; page?: number }) => {
  return axiosInstance.get('/api/review/list', {
    params: {
      per_page: payload?.per_page,
      page: payload?.page,
    },
  });
};

const getReview = async (reviewId: number) => {
  return axiosInstance.get('/api/review/detail', {
    params: {
      review_id: reviewId,
    },
  });
};

const filterReview = async (payload: {
  room_id?: number;
  start_date?: string;
  end_date?: string;
  rating?: number;
}) => {
  return axiosInstance.get('/api/review/filter', {
    params: payload,
  });
};

const deleteReview = async (review_id: number) => {
  return axiosInstance.delete('/api/review/delete', {
    params: {
      service_id: review_id,
    },
  });
};

const createResponseReview = async (
  createResponseReview: ICreateResponseReview,
) => {
  return axiosInstance.post(
    '/api/review/response/create',
    createResponseReview,
  );
};

const getResponseOfReview = async (reviewId: number) => {
  return axiosInstance.get('/api/review/response/list', {
    params: {
      review_id: reviewId,
    },
  });
};

const deleteResponseReview = async (responseId: number) => {
  return axiosInstance.delete('/api/review/response/delete', {
    params: {
      response_id: responseId,
    },
  });
};

const handleCreateReview = function* (action) {
  try {
    yield put({
      type: manageReviewActions.createReviewPending.type,
    });
    const response = yield call(createReview, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReviewActions.createReviewSuccess.type,
        payload: response.data.data,
      });
      toast.success(`Bạn đã bình luận thành công!`);
    }
  } catch (err) {
    yield put({
      type: manageReviewActions.createReviewError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleGetListReview = function* (action) {
  try {
    yield put({
      type: manageReviewActions.getListReviewPending.type,
    });
    const response = yield call(getListReview, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReviewActions.getListReviewSuccess.type,
        payload: {
          reviews: response.data.data,
          meta: response.data.meta.pagination,
        },
      });
    }
  } catch (err) {
    yield put({
      type: manageReviewActions.getListReviewError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleGetReview = function* (action) {
  try {
    yield put({
      type: manageReviewActions.getListReviewPending.type,
    });
    const response = yield call(getReview, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReviewActions.getReviewDetailSuccess.type,
        payload: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: manageReviewActions.getReviewDetailError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleFilterReview = function* (action) {
  try {
    yield put({
      type: manageReviewActions.filterReviewPending.type,
    });
    const response = yield call(filterReview, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReviewActions.filterReviewSuccess.type,
        payload: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: manageReviewActions.filterReviewError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleDeleteReview = function* (action) {
  try {
    yield put({
      type: manageReviewActions.deleteReviewPending.type,
    });
    const response = yield call(deleteReview, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReviewActions.deleteReviewSuccess.type,
        payload: action.payload,
      });
      toast.success(`Xóa thành công!`);
    }
  } catch (err) {
    yield put({
      type: manageReviewActions.deleteReviewError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    toast.error(get(err, 'response.data.message'));
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();
    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleCreateResponseReview = function* (action) {
  try {
    yield put({
      type: manageReviewActions.createResponseReviewPending.type,
    });
    const response = yield call(createResponseReview, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReviewActions.createResponseReviewSuccess.type,
        payload: response.data.data,
      });
      toast.success(`Bạn đã trả lời bình luận thành công!`);
    }
  } catch (err) {
    yield put({
      type: manageReviewActions.createResponseReviewError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();
    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleGetResponseOfReview = function* (action) {
  try {
    yield put({
      type: manageReviewActions.getResponseOfReviewPending.type,
    });
    const response = yield call(getResponseOfReview, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReviewActions.getResponseOfReviewSuccess.type,
        payload: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: manageReviewActions.getResponseOfReviewError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();
    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleDeleteResponseReview = function* (action) {
  try {
    yield put({
      type: manageReviewActions.deleteResponseReviewPending.type,
    });
    const response = yield call(deleteResponseReview, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReviewActions.deleteResponseReviewSuccess.type,
        payload: action.payload,
      });
      toast.success(`Xóa thành công!`);
    }
  } catch (err) {
    yield put({
      type: manageReviewActions.deleteResponseReviewError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    toast.error(get(err, 'response.data.message'));
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();
    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const manageReviewSage = function* () {
  yield takeLatest(
    `${manageReviewActions.createReviewPending}_saga`,
    handleCreateReview,
  );
  yield takeLatest(
    `${manageReviewActions.getListReviewPending}_saga`,
    handleGetListReview,
  );
  yield takeLatest(
    `${manageReviewActions.getReviewDetailPending}_saga`,
    handleGetReview,
  );
  yield takeLatest(
    `${manageReviewActions.filterReviewPending}_saga`,
    handleFilterReview,
  );
  yield takeLatest(
    `${manageReviewActions.deleteReviewPending}_saga`,
    handleDeleteReview,
  );
  yield takeLatest(
    `${manageReviewActions.createResponseReviewPending}_saga`,
    handleCreateResponseReview,
  );
  yield takeLatest(
    `${manageReviewActions.getResponseOfReviewPending}_saga`,
    handleGetResponseOfReview,
  );
  yield takeLatest(
    `${manageReviewActions.deleteResponseReviewPending}_saga`,
    handleDeleteResponseReview,
  );
};

export default manageReviewSage;
