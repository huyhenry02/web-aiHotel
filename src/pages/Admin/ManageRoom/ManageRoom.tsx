import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { map } from 'lodash';
import { IRoom } from '../../../redux/types/room';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { IPaginateResponse } from '../../../redux/types/page';
import PaginationComponent from '../../../layouts/components/pagination/PaginationComponent';
import { manageRoomTypeActions } from '../../../redux/slices/manageRoomType.slice';
import { manageRoomActions } from '../../../redux/slices/manageRoom.slice';
import { manageHotelActions } from '../../../redux/slices/manageHotel.slice';
import CreateRoomModal from '../../../layouts/components/modals/CreateRoomModal';
import { ICreateRoom } from '../../../redux/types/createRoom';
import { IHotel } from '../../../redux/types/hotel';
import TableThree from '../../../layouts/components/table/TableThree';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Box from '@mui/material/Box';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import DeleteRoomModal from '../../../layouts/components/modals/DeleteRoomModal';
import { IUpdateRoom } from '../../../redux/types/updateRoom';

const typeActions = ['update', 'delete'];

const ManageRoom = () => {
  const metaState = useSelector(
    (state: RootState) => state.manageHotel.paginate,
  );

  const roomsState: IRoom[] = useSelector(
    (state: RootState) => state.manageRoom.rooms,
  );

  const roomState: IRoom = useSelector(
    (state: RootState) => state.manageRoom.roomDetail,
  );

  const hotelsState: IHotel[] = useSelector(
    (state: RootState) => state.manageHotel.hotels,
  );

  const [showCreate, setShowCreate] = useState(false);
  const [roomsData, setRoomsData] = useState<object[]>([]);
  const [metaData, setMetaData] = useState<IPaginateResponse>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roomDetail, setRoomDetail] = useState<IRoom>({});

  const [showDelete, setShowDelete] = useState(false);

  const dispatch = useDispatch();

  const handleOnAction = (recordId, action) => {
    if (action === 'update') {
      dispatch({
        type: `${manageRoomActions.getRoomDetailPending}_saga`,
        payload: recordId,
      });

      setShowCreate(true);
    }
    if (action === 'delete') {
      dispatch({
        type: `${manageRoomActions.getRoomDetailPending}_saga`,
        payload: recordId,
      });
      setShowDelete(true);
    }
  };

  const handleCreateRoom = (createRoomData: ICreateRoom) => {
    dispatch({
      type: `${manageRoomActions.createRoomPending}_saga`,
      payload: createRoomData,
    });
  };

  useEffect(() => {
    setRoomDetail(roomState);
  }, [roomState]);

  const handleUpdateRoom = (updateRoomData: IUpdateRoom) => {
    dispatch({
      type: `${manageRoomActions.updateRoomPending}_saga`,
      payload: updateRoomData,
    });
    setShowCreate(false);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  const buildRoomData = (data: IRoom[]) => {
    return data.map(room => {
      return {
        id: room.id,
        hotel: room.hotel?.name,
        room_type: room.room_type?.name,
        floor: room.floor,
        code: room.code,
      };
    });
  };

  const handleShowCreate = () => {
    setRoomDetail({});
    setShowCreate(true);
  };

  const confirmDelete = (recordId: number) => {
    dispatch({
      type: `${manageRoomActions.deleteRoomPending}_saga`,
      payload: recordId,
    });
    setShowDelete(false);
  };

  useEffect(() => {
    setMetaData(metaState);
    setRoomsData(buildRoomData(roomsState));
    setRoomDetail(roomState);
  }, [roomsState, metaState]);

  useEffect(() => {
    dispatch({
      type: `${manageHotelActions.getListHotelPending}_saga`,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: `${manageRoomActions.getListRoomPending}_saga`,
      payload: {
        per_page: 2,
        page: currentPage,
      },
    });
  }, [currentPage]);

  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <h4 className={'d-flex align-items-center'}>
          <ArrowRightRoundedIcon /> Quản lý phòng
        </h4>
      </Box>

      <div className={'d-flex justify-content-end mb-3'}>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            startIcon={<AddBoxIcon />}
            onClick={handleShowCreate}
          >
            Thêm
          </Button>
        </Stack>
      </div>

      <TableThree
        columns={[
          'STT',
          'Khách Sạn',
          'Loại Phòng',
          'Tầng',
          'Số Phòng',
          'Actions',
        ]}
        rows={roomsData}
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

      <CreateRoomModal
        isShow={showCreate}
        onClose={() => setShowCreate(false)}
        onCreateRoom={handleCreateRoom}
        onUpdateRoom={handleUpdateRoom}
        roomData={roomDetail}
        hotelsData={hotelsState}
      />

      <DeleteRoomModal
        isShow={showDelete}
        onClose={() => setShowDelete(false)}
        roomDelete={roomDetail}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default ManageRoom;
