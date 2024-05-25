import { Button, Pagination, Stack } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TableThree from '../../../layouts/components/table/TableThree';
import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
import { IService } from '../../../redux/types/service';
import { useDispatch, useSelector } from 'react-redux';
import { manageServiceActions } from '../../../redux/slices/manageService.slice';
import { RootState } from '../../../redux/store';
import { IPaginateResponse } from '../../../redux/types/page';
import CreateServiceModal from '../../../layouts/components/modals/CreateServiceModal';
import { ICreateService } from '../../../redux/types/createService';
import { IUpdateService } from '../../../redux/types/updateService';
import DeleteServiceModal from '../../../layouts/components/modals/DeleteServiceModal';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import Box from '@mui/material/Box';

const typeActions = ['update', 'delete'];

const ManageService = () => {
  const manageServiceState = useSelector(
    (state: RootState) => state.manageService.services,
  );
  const serviceDetailState = useSelector(
    (state: RootState) => state.manageService.serviceDetail,
  );
  const metaState = useSelector(
    (state: RootState) => state.manageService.paginate,
  );

  const dispatch = useDispatch();
  const [showCreate, setShowCreate] = useState(false);
  const [serviceData, setServiceData] = useState<IService[]>([]);
  const [metaData, setMetaData] = useState<IPaginateResponse>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [serviceDetail, setServiceDetail] = useState<IService>({});
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    dispatch({
      type: `${manageServiceActions.getListServicePending}_saga`,
      payload: {
        per_page: 15,
        page: currentPage,
      },
    });
  }, [currentPage]);

  const buildServiceData = (data: IService[]) => {
    let newData;
    if (data) {
      newData = data.map(c => {
        return {
          id: c.id,
          name: c.name,
          description: c.description,
          price: c.price,
        };
      });
    }
    return newData;
  };

  const handleOnAction = (recordId, action) => {
    if (action === 'update') {
      dispatch({
        type: `${manageServiceActions.getServicePending}_saga`,
        payload: recordId,
      });

      setShowCreate(true);
    }
    if (action === 'delete') {
      dispatch({
        type: `${manageServiceActions.getServicePending}_saga`,
        payload: recordId,
      });
      setShowDelete(true);
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  const handleCreateService = (createServiceData: ICreateService) => {
    dispatch({
      type: `${manageServiceActions.createServicePending}_saga`,
      payload: createServiceData,
    });
  };
  const handleUpdateService = (updateServiceData: IUpdateService) => {
    dispatch({
      type: `${manageServiceActions.updateServicePending}_saga`,
      payload: updateServiceData,
    });
    setShowCreate(false);
  };

  const confirmDelete = (recordId: number) => {
    dispatch({
      type: `${manageServiceActions.deleteServicePending}_saga`,
      payload: recordId,
    });
    setShowDelete(false);
  };

  useEffect(() => {
    setMetaData(metaState);
    setServiceData(buildServiceData(manageServiceState));
    setShowCreate(false);
  }, [manageServiceState]);

  useEffect(() => {
    setServiceDetail(serviceDetailState);
  }, [serviceDetailState]);

  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <h4 className={'d-flex align-items-center'}>
          <ArrowRightRoundedIcon /> Quản lý dịch vụ
        </h4>
      </Box>
      <div className={'d-flex justify-content-end mb-3'}>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            color="success"
            startIcon={<PersonAddIcon />}
            onClick={() => setShowCreate(true)}
          >
            Thêm
          </Button>
        </Stack>
      </div>

      <TableThree
        columns={['STT', 'Name', 'Description', 'Price', 'Actions']}
        rows={serviceData}
        actions={map(typeActions, action => ({ type: action }))}
        onAction={handleOnAction}
      />

      <div className={'d-flex justify-content-center'}>
        <Pagination
          count={metaData.total_pages}
          shape="rounded"
          onChange={handleChangePage}
        />
      </div>

      <CreateServiceModal
        isShow={showCreate}
        onClose={() => setShowCreate(false)}
        onCreateService={handleCreateService}
        onUpdateService={handleUpdateService}
        serviceData={serviceDetail}
      />

      <DeleteServiceModal
        isShow={showDelete}
        onClose={() => setShowDelete(false)}
        serviceDelete={serviceDetail}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default ManageService;
