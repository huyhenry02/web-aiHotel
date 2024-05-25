import { put, call, takeLatest } from 'redux-saga/effects';
import { testActions } from '../slices/test.slice';

const fetchData = () => {
  return 1;
};

const handleAddCount = function* () {
  try {
    const response: number = yield call(fetchData);
    console.log(response);
    yield put({
      type: testActions.increment.type,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: testActions.resetState.type,
    });
  }
};

const testSaga = function* () {
  yield takeLatest(`${testActions.increment.type}_saga`, handleAddCount);
};

export default testSaga;
