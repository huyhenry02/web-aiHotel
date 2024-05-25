import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { manageHotelActions } from '../../../redux/slices/manageHotel.slice';
import { RootState } from '../../../redux/store';
import { IHotel } from '../../../redux/types/hotel';
import { map } from 'lodash';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import CreateHotelModal from '../../../layouts/components/modals/CreateHotelModal';
import { manageRoomTypeActions } from '../../../redux/slices/manageRoomType.slice';
import { IRoomType } from '../../../redux/types/roomType';
import { ICreateHotel } from '../../../redux/types/dtos/createHotel';
import { IPaginateResponse } from '../../../redux/types/page';
import TableThree from '../../../layouts/components/table/TableThree';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import AddHomeIcon from '@mui/icons-material/AddHome';
import Box from '@mui/material/Box';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ConfirmModal from '../../../layouts/components/modals/ConfirmModal';

const typeActions = ['delete', 'update'];

const ManageHotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hotelsState: IHotel[] = useSelector(
    (state: RootState) => state.manageHotel.hotels,
  );
  const metaState = useSelector(
    (state: RootState) => state.manageHotel.paginate,
  );
  const roomTypesState: IRoomType[] = useSelector(
    (state: RootState) => state.manageRoomType.room_types,
  );

  const [hotelsData, setHotelsData] = useState<IHotel[]>([]);
  const [hotelDetail, setHotelDetail] = useState<IHotel | undefined>({});
  const [roomTypesData, setRoomTypesData] = useState<IRoomType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [action, setAction] = useState<'create' | 'update'>('create');
  const [metaData, setMetaData] = useState<IPaginateResponse>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const buildUserData = (data: IHotel[]) => {
    return data.map(hotel => {
      return {
        id: hotel.id,
        image: hotel.file,
        name: hotel.name,
        address: hotel.address,
        description: hotel.description,
      };
    });
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  const handleCreateHotel = (createHotelData: ICreateHotel) => {
    console.log('data create: ', createHotelData);
    dispatch({
      type: `${manageHotelActions.createHotelPending}_saga`,
      payload: createHotelData,
    });
  };

  const handleShowDelete = (recordId: number) => {
    const hotel = hotelsState.find(hotel => hotel.id === recordId);
    setHotelDetail(hotel);
    setShowConfirmModal(true);
  };

  const handleShowCreate = () => {
    setAction('create');
    setShowModal(true);
  };

  const handleUpdateHotel = (updateHotelData: ICreateHotel) => {
    dispatch({
      type: `${manageHotelActions.updateHotelPending}_saga`,
      payload: updateHotelData,
    });
  };

  const handleShowUpdate = (recordId: number) => {
    const hotel = hotelsState.find(hotel => hotel.id === recordId);
    setHotelDetail(hotel);
    setAction('update');
    setShowModal(true);
  };

  const handleOnAction = (recordId, action) => {
    if (action === 'detail') {
      return navigate(`/manage-hotel/${recordId}`);
    }
    if (action === 'delete') {
      handleShowDelete(recordId);
    }
    if (action === 'update') {
      handleShowUpdate(recordId);
    }
  };

  const onConfirmDeleteHotel = (recordId: number) => {
    dispatch({
      type: `${manageHotelActions.deleteHotelPending}_saga`,
      payload: recordId,
    });
    setShowConfirmModal(false);
  };

  useEffect(() => {
    dispatch({
      type: `${manageRoomTypeActions.getListRoomTypePending}_saga`,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: `${manageHotelActions.getListHotelPending}_saga`,
      payload: {
        per_page: 5,
        page: currentPage,
      },
    });
  }, [currentPage]);

  useEffect(() => {
    setHotelsData(buildUserData(hotelsState));
    setMetaData(metaState);
    setRoomTypesData(roomTypesState);
  }, [hotelsState, roomTypesState]);

  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <h4 className={'d-flex align-items-center'}>
          <ArrowRightRoundedIcon /> Quản lý khách sạn
        </h4>
      </Box>

      <div className={'d-flex justify-content-end mb-3'}>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            startIcon={<AddHomeIcon />}
            onClick={handleShowCreate}
          >
            Thêm
          </Button>
        </Stack>
      </div>

      <TableThree
        columns={['STT', 'Image', 'Name', 'Address', 'Description', 'Actions']}
        rows={hotelsData}
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

      <CreateHotelModal
        isShow={showModal}
        onClose={() => setShowModal(false)}
        roomTypesData={roomTypesData}
        onCreateHotel={handleCreateHotel}
        onUpdateHotel={handleUpdateHotel}
        action={action}
        hotelDetail={hotelDetail}
      />

      <ConfirmModal
        show={showConfirmModal}
        title={'Xóa khách sạn'}
        action={'delete'}
        message={'Bạn có chắc muốn xóa khách sạn này không?'}
        data={hotelDetail}
        onConfirm={onConfirmDeleteHotel}
        onClose={() => setShowConfirmModal(false)}
      />
    </>
  );
};

export default ManageHotel;
