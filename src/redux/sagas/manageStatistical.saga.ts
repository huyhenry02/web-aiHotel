import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../services/axios.service';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { IStatisticalParams } from '../types/dtos/statisticalParams';
import { manageStatisticalActions } from '../slices/managerStatistical.slice';

const getListStatistical = async (payload: IStatisticalParams) => {
  return axiosInstance.get('/api/statistic/data', {
    params: payload,
  });
};

const handleGetListStatistical = function* (action) {
  try {
    yield put({
      type: manageStatisticalActions.getListStatisticalPending.type,
    });
    const response = yield call(getListStatistical, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageStatisticalActions.getListStatisticalSuccess.type,
        payload: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: manageStatisticalActions.getListStatisticalError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const manageStatisticalSaga = function* () {
  yield takeLatest(
    `${manageStatisticalActions.getListStatisticalPending}_saga`,
    handleGetListStatistical,
  );
};

export default manageStatisticalSaga;
