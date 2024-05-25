import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../services/axios.service';
import { manageServiceActions } from '../slices/manageService.slice';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { ICreateService } from '../types/createService';
import { IUpdateService } from '../types/updateService';

const getListService = async (payload: {
  per_page?: number;
  page?: number;
}) => {
  return axiosInstance.get('/api/service/get-list', {
    params: {
      per_page: payload.per_page,
      page: payload.page,
    },
  });
};

const getService = async (serviceId: number) => {
  return axiosInstance.get('/api/service/detail', {
    params: {
      service_id: serviceId,
    },
  });
};

const createService = async (createService: ICreateService) => {
  return axiosInstance.post('/api/service/create', createService);
};

const updateService = async (updateService: IUpdateService) => {
  return axiosInstance.post('/api/service/update', updateService);
};

const deleteService = async (service_id: number) => {
  // const data = {service_id: service_id}
  return axiosInstance.delete('/api/service/delete', {
    params: {
      service_id: service_id,
    },
  });
};

const handleGetListService = function* (action) {
  try {
    yield put({
      type: manageServiceActions.getListServicePending.type,
    });
    const response = yield call(getListService, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageServiceActions.getListServiceSuccess.type,
        payload: {
          services: response.data.data,
          meta: response.data.meta.pagination,
        },
      });
    }
  } catch (err) {
    yield put({
      type: manageServiceActions.getListServiceError.type,
      payload: { message: get(err, 'message') },
    });
    console.log(err);
    toast.error(get(err, 'message'));
  }
};

const handleGetService = function* (action) {
  try {
    yield put({
      type: manageServiceActions.getServicePending.type,
    });

    const response = yield call(getService, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageServiceActions.getServiceSuccess.type,
        payload: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: manageServiceActions.getServiceError.type,
      payload: { message: get(err, 'message') },
    });
    toast.error(get(err, 'response.data.message'));
    console.log(err);
  }
};
const handleCreateService = function* (action) {
  try {
    yield put({
      type: manageServiceActions.createServicePending.type,
    });
    const response = yield call(createService, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageServiceActions.createServiceSuccess.type,
        payload: response.data.data,
      });
      toast.success('Bạn đã thêm dịch vụ thành công');
    }
  } catch (err) {
    yield put({
      type: manageServiceActions.createServiceError.type,
      payload: { message: get(err, 'message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleUpdateService = function* (action) {
  try {
    yield put({
      type: manageServiceActions.updateServicePending.type,
    });
    const response = yield call(updateService, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageServiceActions.updateServiceSuccess.type,
        payload: response.data.data,
      });
      toast.success('Cập nhật thông dịch vụ thành công');
    }
  } catch (err) {
    yield put({
      type: manageServiceActions.getListServiceError.type,
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

const handleDeleteService = function* (action) {
  try {
    yield put({
      type: manageServiceActions.deleteServicePending.type,
    });
    const response = yield call(deleteService, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageServiceActions.deleteServiceSuccess.type,
        payload: action.payload,
      });
      toast.success(`Xóa thành công!`);
    }
  } catch (err) {
    yield put({
      type: manageServiceActions.deleteServiceError.type,
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

const manageServiceSaga = function* () {
  yield takeLatest(
    `${manageServiceActions.getListServicePending}_saga`,
    handleGetListService,
  );
  yield takeLatest(
    `${manageServiceActions.getServicePending}_saga`,
    handleGetService,
  );
  yield takeLatest(
    `${manageServiceActions.createServicePending}_saga`,
    handleCreateService,
  );
  yield takeLatest(
    `${manageServiceActions.updateServicePending}_saga`,
    handleUpdateService,
  );
  yield takeLatest(
    `${manageServiceActions.deleteServicePending}_saga`,
    handleDeleteService,
  );
};

export default manageServiceSaga;
