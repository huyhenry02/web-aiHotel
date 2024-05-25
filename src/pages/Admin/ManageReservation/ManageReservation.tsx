import { isEmpty, map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import React, { useEffect, useState } from 'react';
import { manageReservationActions } from '../../../redux/slices/manageReservation.slice';
import { IPaginateResponse } from '../../../redux/types/page';
import { IReservation } from '../../../redux/types/reservation';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IHotel } from '../../../redux/types/hotel';
import { manageHotelActions } from '../../../redux/slices/manageHotel.slice';
import { IRoomType } from '../../../redux/types/roomType';
import TableThree from '../../../layouts/components/table/TableThree';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

const typeActions = ['delete', 'detail'];

const ManageReservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listReservationState = useSelector(
    (state: RootState) => state.manageReservation.reservations,
  );
  const metaState = useSelector(
    (state: RootState) => state.manageReservation.paginate,
  );
  const listHotelState = useSelector(
    (state: RootState) => state.manageHotel.hotels,
  );

  const [listReservationData, setReservationData] = useState<object[]>([]);
  const [metaData, setMetaData] = useState<IPaginateResponse>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputHotelId, setInputHotelId] = useState<number | undefined>(
    undefined,
  );
  const [inputRoomTypeId, setInputRoomTypeId] = useState<number | undefined>(
    undefined,
  );
  const [listHotelData, setListHotelData] = useState<IHotel[]>([]);
  const [listRoomType, setListRoomType] = useState<IRoomType[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const buildUserData = (data: IReservation[]) => {
    let newData: object[] = [];
    if (!isEmpty(data)) {
      newData = data.map(r => {
        return {
          id: r.id,
          hotel: r.hotel?.name,
          room: r.room?.code,
          room_type: r.room_type?.name,
          user: r.user?.name,
          start_date: r.start_date,
          end_date: r.end_date,
          status: r.status,
        };
      });
    }
    return newData;
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  const handleOnAction = (recordId, action) => {
    if (action === 'detail') {
      return navigate(`/manage-reservation/${recordId}`);
    }
  };

  const handleHotelSelection = (event, value) => {
    if (value === '--none--') {
      setListRoomType([]);
      setCurrentPage(1);
      setInputHotelId(undefined);
    } else {
      const selectedHotel = listHotelData.find(hotel => hotel.name === value);
      if (selectedHotel) {
        setInputHotelId(selectedHotel.id);
        setListRoomType(selectedHotel.room_types || []);
      } else {
        setInputHotelId(undefined);
      }
    }
  };

  const handleRoomTypeSelection = (event, value) => {
    if (value === '--none--') {
      setInputRoomTypeId(undefined);
    } else {
      const selectedRoomType = listRoomType.find(type => type.name === value);
      if (selectedRoomType) {
        setInputRoomTypeId(selectedRoomType.id);
      } else {
        setInputRoomTypeId(undefined);
      }
    }
  };

  const handleFilterByPhone = () => {
    if (!isEmpty(phoneNumber)) {
      dispatch({
        type: `${manageReservationActions.getListReservationPending}_filter_saga`,
        payload: {
          hotel_id: inputHotelId,
          phone: phoneNumber,
          per_page: 15,
          page: currentPage,
        },
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: `${manageHotelActions.getListHotelPending}_saga`,
    });
  }, []);

  useEffect(() => {
    setListHotelData(listHotelState);
  }, [listHotelState]);

  useEffect(() => {
    if (inputHotelId !== undefined) {
      dispatch({
        type: `${manageReservationActions.getListReservationPending}_filter_saga`,
        payload: {
          hotel_id: inputHotelId,
          ...(inputRoomTypeId !== undefined && {
            room_type_id: inputRoomTypeId,
          }),
          per_page: 15,
          page: currentPage,
        },
      });
    } else {
      dispatch({
        type: `${manageReservationActions.getListReservationPending}_saga`,
        payload: {
          per_page: 15,
          page: currentPage,
        },
      });
    }
  }, [inputHotelId, inputRoomTypeId, currentPage]);

  useEffect(() => {
    setMetaData(metaState);
    setReservationData(buildUserData(listReservationState));
  }, [listReservationState, metaState]);

  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <h4 className={'d-flex align-items-center'}>
          <ArrowRightRoundedIcon /> Quản lý đơn đặt phòng
        </h4>
      </Box>

      <div className={'d-flex mb-3 justify-content-between'}>
        <div className={'d-flex'}>
          <Autocomplete
            className={'me-2'}
            disableClearable
            sx={{ width: 300 }}
            options={['--none--', ...listHotelData.map(option => option.name)]}
            onChange={handleHotelSelection}
            renderInput={params => (
              <TextField
                {...params}
                label="Tên khách sạn"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />

          {!isEmpty(listRoomType) ? (
            <Autocomplete
              className={'me-2 ms-2'}
              disableClearable
              sx={{ width: 200 }}
              options={['--none--', ...listRoomType.map(option => option.name)]}
              onChange={handleRoomTypeSelection}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Loại phòng"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
          ) : (
            ''
          )}
        </div>

        {inputHotelId ? (
          <Stack direction="row" spacing={2}>
            <TextField
              label="Số điện thoại"
              variant="outlined"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={handleFilterByPhone}
            >
              Search
            </Button>
          </Stack>
        ) : (
          ''
        )}
      </div>

      <TableThree
        columns={[
          'STT',
          'Khách sạn',
          'Phòng',
          'Loại phòng',
          'Người đặt',
          'Từ ngày',
          'Đến đến',
          'Trạng thái',
          'Tùy chọn',
        ]}
        rows={listReservationData}
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
    </>
  );
};

export default ManageReservation;
