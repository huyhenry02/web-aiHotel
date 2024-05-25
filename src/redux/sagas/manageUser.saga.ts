import { put, takeLatest, call } from 'redux-saga/effects';
import axiosInstance from '../../services/axios.service';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { ICreateUser } from '../types/dtos/createUser';
import { manageUserActions } from '../slices/manageUser.slice';
import { IUpdateInfo } from '../types/dtos/updateInfo';

const getListUser = async (payload: {
  per_page: number;
  page: number;
  role_type: string;
}) => {
  return axiosInstance.get('/api/auth/list-user', {
    params: {
      per_page: payload.per_page,
      page: payload.page,
      type: payload.role_type,
    },
  });
};

const createUser = async (createUser: ICreateUser) => {
  return axiosInstance.post('/api/auth/create-user', createUser);
};

const getUser = async (userId: number) => {
  return axiosInstance.get('/api/auth/user-information', {
    params: {
      user_id: userId,
    },
  });
};

const updateUser = async (updateUser: IUpdateInfo) => {
  return axiosInstance.put('/api/auth/update-user', updateUser);
};

const deleteUser = async (user_id: number) => {
  const data = { user_id: user_id };
  return axiosInstance.delete('/api/auth/delete-user', { data });
};

const handleGetListUser = function* (action) {
  try {
    yield put({
      type: manageUserActions.getListUserPending.type,
    });
    const response = yield call(getListUser, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageUserActions.getListUserSuccess.type,
        payload: {
          users: response.data.data,
          meta: response.data.meta.pagination,
        },
      });
      // toast.success('Danh sách người dùng ')
    }
  } catch (err) {
    yield put({
      type: manageUserActions.getListUserError.type,
      payload: { message: get(err, 'message') },
    });
    console.log(err);

    toast.error(get(err, 'message'));
  }
};

const handleCreateUser = function* (action) {
  try {
    yield put({
      type: manageUserActions.createUserPending.type,
    });
    const response = yield call(createUser, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageUserActions.createUserSuccess.type,
        payload: response.data.data,
      });
      toast.success('Bạn đã thêm người dùng thành công');
    }
  } catch (err) {
    yield put({
      type: manageUserActions.createUserError.type,
      payload: { message: get(err, 'message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleGetUser = function* (action) {
  try {
    yield put({
      type: manageUserActions.getUserDetailPending.type,
    });

    const response = yield call(getUser, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageUserActions.getUserDetailSuccess.type,
        payload: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: manageUserActions.getUserDetailError.type,
      payload: { message: get(err, 'message') },
    });
    toast.error(get(err, 'response.data.message'));
    console.log(err);
  }
};

const handleUpdateUser = function* (action) {
  try {
    yield put({
      type: manageUserActions.updateUserPending.type,
    });
    const response = yield call(updateUser, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageUserActions.updateUserSuccess.type,
        payload: response.data.data,
      });
      toast.success('Cập nhật thông tin người dùng thành công');
    }
  } catch (err) {
    yield put({
      type: manageUserActions.getListUserError.type,
      payload: { message: get(err, 'message') },
    });
    toast.error(get(err, 'response.data.message'));
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleDeleteUser = function* (action) {
  try {
    yield put({
      type: manageUserActions.deleteUserPending.type,
    });
    const response = yield call(deleteUser, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageUserActions.deleteUserSuccess.type,
        payload: action.payload,
      });
      toast.success(`Xóa thành công!`);
    }
  } catch (err) {
    yield put({
      type: manageUserActions.deleteUserError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    toast.error(get(err, 'response.data.message'));
  }
};
const manageUserSaga = function* () {
  yield takeLatest(
    `${manageUserActions.getListUserPending}_saga`,
    handleGetListUser,
  );
  yield takeLatest(
    `${manageUserActions.createUserPending}_saga`,
    handleCreateUser,
  );
  yield takeLatest(
    `${manageUserActions.getUserDetailPending}_saga`,
    handleGetUser,
  );
  yield takeLatest(
    `${manageUserActions.updateUserPending}_saga`,
    handleUpdateUser,
  );
  yield takeLatest(
    `${manageUserActions.deleteUserPending}_saga`,
    handleDeleteUser,
  );
};

export default manageUserSaga;
