import { IReservationCreate } from '../types/dtos/createReservation';
import axiosInstance from '../../services/axios.service';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { manageReservationActions } from '../slices/manageReservation.slice';
import { authActions } from '../slices/auth.slice';

const createReservation = async (payload: IReservationCreate) => {
  return axiosInstance.post('/api/reservation/create', payload);
};

const getListReservation = async (payload: {
  per_page: number;
  page: number;
}) => {
  return axiosInstance.get('/api/reservation/list', {
    params: {
      per_page: payload.per_page,
      page: payload.page,
    },
  });
};

const getListReservationFilter = async (payload: {
  hotel_id?: number;
  room_type_id?: number;
  phone?: string;
  per_page?: number;
  page?: number;
}) => {
  return axiosInstance.get('/api/reservation/filter-reservation', {
    params: payload,
  });
};

const getReservation = async (reservationId: number) => {
  return axiosInstance.get('/api/reservation/detail', {
    params: {
      reservation_id: reservationId,
    },
  });
};
const checkInReservation = async (reservationId: number) => {
  return axiosInstance.put('/api/reservation/check-in', {
    reservation_id: reservationId,
  });
};
const checkOutReservation = async (reservationId: number) => {
  return axiosInstance.put('/api/reservation/check-out', {
    reservation_id: reservationId,
  });
};
const updateReservation = async (updateReservationData: IReservationCreate) => {
  return axiosInstance.put('/api/reservation/update', updateReservationData);
};
const handleCreateReservation = function* (action) {
  try {
    yield put({
      type: manageReservationActions.createReservationPending.type,
    });
    const response = yield call(createReservation, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReservationActions.createReservationSuccess.type,
        payload: response.data.data,
      });
      yield put({
        type: `${authActions.getInfoPending}_saga`,
      });
      toast.success(`Đặt phòng thành công!`);
    }
  } catch (err) {
    yield put({
      type: manageReservationActions.createReservationError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleGetListReservation = function* (action) {
  try {
    yield put({
      type: manageReservationActions.getListReservationPending.type,
    });
    const response = yield call(getListReservation, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReservationActions.getListReservationSuccess.type,
        payload: {
          reservations: response.data.data,
          meta: response.data.meta.pagination,
        },
      });
    }
  } catch (err) {
    yield put({
      type: manageReservationActions.getListReservationError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleGetListReservationFilter = function* (action) {
  try {
    yield put({
      type: manageReservationActions.getListReservationPending.type,
    });
    const response = yield call(getListReservationFilter, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReservationActions.getListReservationSuccess.type,
        payload: {
          reservations: response.data.data,
          meta: response.data.meta.pagination,
        },
      });
    }
  } catch (err) {
    yield put({
      type: manageReservationActions.getListReservationError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};
const handleGetReservation = function* (action) {
  try {
    yield put({
      type: manageReservationActions.getReservationPending.type,
    });
    const response = yield call(getReservation, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReservationActions.getReservationSuccess.type,
        payload: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: manageReservationActions.getReservationDetailError.type,
      payload: { message: get(err, 'message') },
    });
    toast.error(get(err, 'response.data.message'));
  }
};
const handleCheckInReservation = function* (action) {
  try {
    yield put({
      type: manageReservationActions.checkInReservationPending.type,
    });
    const response = yield call(checkInReservation, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReservationActions.checkInReservationSuccess.type,
        payload: response.data.data,
      });
      toast.success(`Check in thành công!`);
    }
  } catch (err) {
    yield put({
      type: manageReservationActions.checkInReservationError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    toast.error(get(err, 'response.data.message'));
  }
};
const handleCheckOutReservation = function* (action) {
  try {
    yield put({
      type: manageReservationActions.checkOutReservationPending.type,
    });
    const response = yield call(checkOutReservation, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReservationActions.checkOutReservationSuccess.type,
        payload: response.data.data,
      });
      toast.success(`Check out thành công!`);
    }
  } catch (err) {
    yield put({
      type: manageReservationActions.checkOutReservationError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    toast.error(get(err, 'response.data.message'));
  }
};
const handleUpdateReservation = function* (action) {
  try {
    yield put({
      type: manageReservationActions.updateReservationPending.type,
    });
    const response = yield call(updateReservation, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageReservationActions.updateReservationSuccess.type,
        payload: response.data.data,
      });
      toast.success(`Cập nhật thành công!`);
    }
  } catch (err) {
    yield put({
      type: manageReservationActions.updateReservationError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    toast.error(get(err, 'response.data.message'));
  }
};
const manageReservationSaga = function* () {
  yield takeLatest(
    `${manageReservationActions.createReservationPending}_saga`,
    handleCreateReservation,
  );
  yield takeLatest(
    `${manageReservationActions.getListReservationPending}_saga`,
    handleGetListReservation,
  );
  yield takeLatest(
    `${manageReservationActions.getListReservationPending}_filter_saga`,
    handleGetListReservationFilter,
  );
  yield takeLatest(
    `${manageReservationActions.getReservationPending}_saga`,
    handleGetReservation,
  );
  yield takeLatest(
    `${manageReservationActions.checkInReservationPending}_saga`,
    handleCheckInReservation,
  );
  yield takeLatest(
    `${manageReservationActions.checkOutReservationPending}_saga`,
    handleCheckOutReservation,
  );
  yield takeLatest(
    `${manageReservationActions.updateReservationPending}_saga`,
    handleUpdateReservation,
  );
};

export default manageReservationSaga;
