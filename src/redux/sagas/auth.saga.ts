import { put, call, takeLatest } from 'redux-saga/effects';
import { authActions } from '../slices/auth.slice';
import { ILogin } from '../types/dtos/login';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import axiosInstance from '../../services/axios.service';
import { IUpdateInfo } from '../types/dtos/updateInfo';
import { IResetPassword } from '../types/dtos/resetPassword';
import { IRegister } from '../types/dtos/register';
import { IChangePassword } from '../types/dtos/changePassword';

const login = async (dataLogin: ILogin) => {
  return axiosInstance.post('api/auth/login', dataLogin);
};

const userInfo = async () => {
  return axiosInstance.get('api/auth/my-information');
};

const logout = async () => {
  return axiosInstance.get('api/auth/logout');
};

const register = async (dataRegister: IRegister) => {
  return axiosInstance.post('api/auth/sign-up-for-customer', dataRegister);
};

const changePassword = async (dataChangePassword: IChangePassword) => {
  return axiosInstance.put('/api/auth/change-password', dataChangePassword);
};

const updateInfo = async (dataUpdateInfo: IUpdateInfo) => {
  return axiosInstance.put('/api/auth/update-user', dataUpdateInfo);
};

const resetPassword = async (dataResetPassword: IResetPassword) => {
  return axiosInstance.put('/api/auth/reset-password', dataResetPassword);
};

const handleLogin = function* (action) {
  try {
    yield put({
      type: authActions.loginPending.type,
    });
    const response = yield call(login, action.payload);
    if (response.data.statusCode === 200) {
      const resultLogin = response.data.data;
      const token = resultLogin.access_token;
      yield put({
        type: authActions.loginSuccess.type,
        payload: token,
      });
      yield put({
        type: `${authActions.getInfoPending}_saga`,
      });
      toast.success(`Welcome to my web!`);
    } else {
      throw new Error();
    }
  } catch (err) {
    yield put({
      type: authActions.loginError.type,
      payload: { message: get(err, 'message') },
    });
    toast.error('Tài khoản hoặc mật khẩu không đúng!');
  }
};

const handleGetInfo = function* () {
  try {
    yield put({
      type: authActions.getInfoPending.type,
    });
    const response = yield call(userInfo);
    if (response.data.statusCode === 200) {
      yield put({
        type: authActions.getInfoSuccess.type,
        payload: response.data.data,
      });
    } else {
      throw new Error(response.data.message || 'Server error');
    }
  } catch (err) {
    yield put({
      type: authActions.getInfoError.type,
      payload: { message: get(err, 'message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleLogout = function* () {
  try {
    yield put({
      type: authActions.logoutPending.type,
    });
    const response = yield call(logout);
    if (response.status === 200) {
      yield put({
        type: authActions.logoutSuccess.type,
      });
    } else {
      throw new Error(response.data.message || 'Server error');
    }
  } catch (err) {
    yield put({
      type: authActions.logoutError.type,
      payload: { message: get(err, 'message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleRegister = function* (action) {
  try {
    yield put({
      type: authActions.registerPending.type,
    });
    const response = yield call(register, action.payload);
    if (response.data.statusCode === 200) {
      const token = response.data.data.access_token;
      yield put({
        type: authActions.registerSuccess.type,
        payload: token,
      });
      yield put({
        type: `${authActions.getInfoPending}_saga`,
      });
      toast.success(`Welcome to my web!`);
    } else {
      throw new Error(response.data.message || 'Server error');
    }
  } catch (err) {
    yield put({
      type: authActions.registerError.type,
      payload: { message: get(err, 'message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleChangePassword = function* (action) {
  try {
    yield put({
      type: authActions.changePasswordPending.type,
    });
    const response = yield call(changePassword, action.payload);
    console.log('response', response);

    if (response.data.status === 200) {
      yield put({
        type: authActions.changePasswordSuccess.type,
        payload: response.data.message,
      });
      toast.success(`Thay đổi mật khẩu thành công!`);
    } else {
      console.log('throw err');

      throw new Error(response.data.message || 'Sever Error');
    }
  } catch (err) {
    yield put({
      type: authActions.changePasswordError.type,
      payload: { message: get(err, 'message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleUpdateInfo = function* (action) {
  try {
    yield put({
      type: authActions.updateInfoPending.type,
    });
    const response = yield call(updateInfo, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: authActions.updateInfoSuccess.type,
        payload: response.data.data,
      });
      toast.success(`Cập nhật thông tin thành công!`);
    } else {
      console.log('throw err');

      throw new Error(response.data.message || 'Sever Error');
    }
  } catch (err) {
    yield put({
      type: authActions.changePasswordError.type,
      payload: { message: get(err, 'message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};
const handleResetPassword = function* (action) {
  try {
    yield put({
      type: authActions.resetPasswordPending.type,
    });
    const response = yield call(resetPassword, action.payload);

    if (response.data.status === 200) {
      yield put({
        type: authActions.resetPasswordSuccess.type,
        payload: response.data.data,
      });
      toast.success('success');
    } else {
      console.log('throw err');

      throw new Error(response.data.message || 'Sever Error');
    }
  } catch (err) {
    yield put({
      type: authActions.resetPasswordError.type,
      payload: { message: get(err, 'message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const authSaga = function* () {
  yield takeLatest(`${authActions.loginPending}_saga`, handleLogin);
  yield takeLatest(`${authActions.getInfoPending}_saga`, handleGetInfo);
  yield takeLatest(`${authActions.logoutPending}_saga`, handleLogout);
  yield takeLatest(`${authActions.registerPending}_saga`, handleRegister);
  yield takeLatest(
    `${authActions.changePasswordPending}_saga`,
    handleChangePassword,
  );
  yield takeLatest(`${authActions.updateInfoPending}_saga`, handleUpdateInfo);
  yield takeLatest(
    `${authActions.resetPasswordPending}_saga`,
    handleResetPassword,
  );
};

export default authSaga;
