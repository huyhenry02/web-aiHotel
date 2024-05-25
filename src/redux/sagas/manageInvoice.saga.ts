import axiosInstance from '../../services/axios.service';
import { put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { manageInvoiceActions } from '../slices/manageInvoice.slice';

const getListInvoice = async (payload: {
  per_page?: number;
  page?: number;
}) => {
  return axiosInstance.get('/api/invoice/list-invoices', {
    params: {
      per_page: payload?.per_page,
      page: payload?.page,
    },
  });
};

const getInvoiceDetail = async (invoiceId: number) => {
  return axiosInstance.get(`/api/invoice/detail`, {
    params: {
      invoice_id: invoiceId,
    },
  });
};

const handleGetListInvoice = function* (action) {
  try {
    yield put({
      type: manageInvoiceActions.getListInvoicePending.type,
    });
    const response = yield call(getListInvoice, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageInvoiceActions.getListInvoiceSuccess.type,
        payload: {
          invoices: response.data.data,
          meta: response.data.meta.pagination,
        },
      });
    }
  } catch (err) {
    yield put({
      type: manageInvoiceActions.getListInvoiceError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const handleGetInvoiceDetail = function* (action) {
  try {
    yield put({
      type: manageInvoiceActions.getInvoiceDetailPending.type,
    });
    const response = yield call(getInvoiceDetail, action.payload);
    if (response.data.statusCode === 200) {
      yield put({
        type: manageInvoiceActions.getInvoiceDetailSuccess.type,
        payload: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: manageInvoiceActions.getInvoiceDetailError.type,
      payload: { message: get(err, 'response.data.message') },
    });
    const errorData = get(err, 'response.data.errors', {});
    const errorMessages = Object.values(errorData).flat();

    errorMessages.forEach(messageErr => {
      toast.error(messageErr + '');
    });
  }
};

const manageInvoiceSaga = function* () {
  yield takeLatest(
    `${manageInvoiceActions.getListInvoicePending}_saga`,
    handleGetListInvoice,
  );
  yield takeLatest(
    `${manageInvoiceActions.getInvoiceDetailPending}_saga`,
    handleGetInvoiceDetail,
  );
};

export default manageInvoiceSaga;
