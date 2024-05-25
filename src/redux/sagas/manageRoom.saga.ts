import axiosInstance from '../../services/axios.service';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { manageRoomActions } from '../slices/manageRoom.slice';
import { ICreateRoom } from '../types/createRoom';
import { IUpdateRoom } from '../types/updateRoom';

const getListRoom = async (payload: {
  hotel_id: number;
  per_page?: number;
  page?: number;
}) => {
  return axiosInstance.get('/api/room/get-list', {
    params: {
      hotel_id: payload.hotel_id,
      per_page: payload.per_page,
      page: payload.page,
    },
  });
};

const getRoomDetail = async (room_id: number) => {
  return axiosInstance.get('/api/room/detail', {
    params: {
      room_id: room_id,
    },
  });
};

// const getRoom = async (roomId: number) => {
//     return axiosInstance.get('/api/room/detail', {
//         params:{
//             room_id :roomId,
//         }
//     })
// }

const createRoom = async (createRoom: ICreateRoom) => {
  return axiosInstance.post('/api/room/create', createRoom);
};
const updateRoom = async (updateRoom: IUpdateRoom) => {
  return axiosInstance.post('/api/room/update', updateRoom);
};
const deleteRoom = async (room_id: number) => {
  const data = { room_id: room_id };
  return axiosInstance.delete('/api/room/delete', { data });
};

const handleCreateRoom = function* (action) {
  try {
    yield put({
      type: manageRoomActions.createRoomPending.type,
    });
    const response = yield call(createRoom, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageRoomActions.createRoomSuccess.type,
        payload: response.data.data,
      });
      toast.success('Bạn đã thêm phòng thành công');
    }
  } catch (err) {
    yield put({
      type: manageRoomActions.createRoomError.type,
      payload: { message: get(err, 'message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleGetListRoomByIdHotel = function* (action) {
  try {
    yield put({
      type: manageRoomActions.getListRoomPending.type,
    });
    const response = yield call(getListRoom, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageRoomActions.getListRoomSuccess.type,
        payload: {
          rooms: response.data.data,
          // meta: response.data.meta.pagination,
        },
      });
    }
  } catch (err) {
    yield put({
      type: manageRoomActions.getListRoomError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    toast.error(get(err, 'response.data.message'));
  }
};

const handleGetRoomDetail = function* (action) {
  try {
    yield put({
      type: manageRoomActions.getRoomDetailPending.type,
    });
    const response = yield call(getRoomDetail, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageRoomActions.getRoomDetailSuccess.type,
        payload: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: manageRoomActions.getRoomDetailError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();
    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleUpdateRoom = function* (action) {
  try {
    yield put({
      type: manageRoomActions.updateRoomPending.type,
    });
    const response = yield call(updateRoom, action.payload);

    if (response.data.statusCode === 200) {
      yield put({
        type: manageRoomActions.updateRoomSuccess.type,
        payload: response.data.data,
      });
      toast.success('Cập nhật thông tin phòng thành công');
    }
  } catch (err) {
    yield put({
      type: manageRoomActions.getListRoomError.type,
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

const handleDeleteRoom = function* (action) {
  try {
    yield put({
      type: manageRoomActions.deleteRoomPending.type,
    });
    const response = yield call(deleteRoom, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageRoomActions.deleteRoomSuccess.type,
        payload: action.payload,
      });
      toast.success(`Xóa thành công!`);
    }
  } catch (err) {
    yield put({
      type: manageRoomActions.deleteRoomError.type,
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

const manageRoomSaga = function* () {
  yield takeLatest(
    `${manageRoomActions.getListRoomPending}_saga`,
    handleGetListRoomByIdHotel,
  );
  yield takeLatest(
    `${manageRoomActions.createRoomPending}_saga`,
    handleCreateRoom,
  );
  // yield takeLatest(
  //     `${manageRoomActions.getRoomDetailPending}_saga`,
  //     handleGetRoom
  // );
  yield takeLatest(
    `${manageRoomActions.getRoomDetailPending}_saga`,
    handleGetRoomDetail,
  );
  yield takeLatest(
    `${manageRoomActions.updateRoomPending}_saga`,
    handleUpdateRoom,
  );
  yield takeLatest(
    `${manageRoomActions.deleteRoomPending}_saga`,
    handleDeleteRoom,
  );
  // yield takeLatest(
  //     `${manageRoomActions.getRoomDetailPending}_saga`,
  //     handleGetRoomDetail,
  // )
};

export default manageRoomSaga;
