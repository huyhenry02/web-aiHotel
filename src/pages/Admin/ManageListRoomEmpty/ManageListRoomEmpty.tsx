import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import './ManageListRoomEmpty.scss';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { IHotel } from '../../../redux/types/hotel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { manageHotelActions } from '../../../redux/slices/manageHotel.slice';
import { manageRoomEmptyActions } from '../../../redux/slices/manageRoomEmpty.slice';
import { isEmpty } from 'lodash';

const ManageListRoomEmpty = () => {
  const dispatch = useDispatch();
  const listHotelState = useSelector(
    (state: RootState) => state.manageHotel.hotels,
  );
  const listRoomEmptyState = useSelector(
    (state: RootState) => state.manageRoomEmpty.roomEmpty,
  );

  const [listHotelData, setListHotelData] = useState<IHotel[]>([]);
  const [listRoomEmpty, setListRoomEmpty] = useState({});
  const [hotelIdSelected, setHotelIdSelected] = useState<number>(0);

  const handleHotelSelection = (event, value) => {
    if (value === '--none--') {
      setHotelIdSelected(0);
    } else {
      const hotel = listHotelData.find(hotel => hotel.name === value);
      if (hotel && hotel.id) {
        setHotelIdSelected(hotel.id);
      } else {
        setHotelIdSelected(0);
      }
    }
  };

  const groupRoomsByFloor = listRoom => {
    const groupedRooms = {};
    listRoom.forEach(room => {
      if (!groupedRooms[room.floor]) {
        groupedRooms[room.floor] = [];
      }
      groupedRooms[room.floor].push(room);
    });
    return groupedRooms;
  };

  useEffect(() => {
    dispatch({
      type: `${manageHotelActions.getListHotelPending}_saga`,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: `${manageRoomEmptyActions.getListRoomEmptyPending}_saga`,
      payload: hotelIdSelected,
    });
  }, [hotelIdSelected]);

  useEffect(() => {
    setListHotelData(listHotelState);
  }, [listHotelState]);

  useEffect(() => {
    setListRoomEmpty(groupRoomsByFloor(listRoomEmptyState));
  }, [listRoomEmptyState]);

  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <h4 className={'d-flex align-items-center'}>
          <ArrowRightRoundedIcon /> Danh sách phòng trống
        </h4>
      </Box>
      <div className={'d-flex mb-3'}>
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
      </div>

      <div className={'list_room'}>
        <div className={'manage_rooms'}>
          {!isEmpty(listRoomEmpty) &&
            Object.keys(listRoomEmpty).map((floor, f_index) => (
              <div className={'room_empty_item'} key={f_index}>
                <div className={'manage_room_empty_floor'}>Tầng {floor}</div>
                <div className={'list_room_empty'}>
                  {listRoomEmpty[floor].map((room, r_index) => (
                    <div
                      className={
                        room.status === 'empty' ? 'room_empty' : 'room_booked'
                      }
                      key={r_index}
                    >
                      <h3>Số phòng: {room.code}</h3>
                      <h4>Trạng thái: {room.status}</h4>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ManageListRoomEmpty;
