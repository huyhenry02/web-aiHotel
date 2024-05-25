import axiosInstance from '../../services/axios.service';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { manageRoomTypeActions } from '../slices/manageRoomType.slice';

const getListRoomType = async () => {
  return axiosInstance.get('/api/room-type/get-list');
};

const handleGetListRoomType = function* () {
  try {
    yield put({
      type: manageRoomTypeActions.getListRoomTypePending.type,
    });
    const response = yield call(getListRoomType);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageRoomTypeActions.getListRoomTypeSuccess.type,
        payload: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: manageRoomTypeActions.getListRoomTypeError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    console.log(err);
    toast.error(get(err, 'response.data.message'));
  }
};

const manageRoomTypeSaga = function* () {
  yield takeLatest(
    `${manageRoomTypeActions.getListRoomTypePending}_saga`,
    handleGetListRoomType,
  );
};

export default manageRoomTypeSaga;
