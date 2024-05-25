import axiosInstance from '../../services/axios.service';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { manageRoomEmptyActions } from '../slices/manageRoomEmpty.slice';

const getListRoomEmpty = async (payload: number) => {
  return axiosInstance.get('/api/room/get-status-rooms', {
    params: {
      hotel_id: payload,
    },
  });
};

const handleGetListRoomEmpty = function* (action) {
  try {
    yield put({
      type: manageRoomEmptyActions.getListRoomEmptyPending.type,
    });
    const response = yield call(getListRoomEmpty, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageRoomEmptyActions.getListRoomEmptySuccess.type,
        payload: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: manageRoomEmptyActions.getListRoomEmptyError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const manageRoomEmptySaga = function* () {
  yield takeLatest(
    `${manageRoomEmptyActions.getListRoomEmptyPending}_saga`,
    handleGetListRoomEmpty,
  );
};

export default manageRoomEmptySaga;
