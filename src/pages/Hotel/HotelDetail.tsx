import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { manageRoomActions } from '../../redux/slices/manageRoom.slice';
import { useParams } from 'react-router';
import { RootState } from '../../redux/store';
import { IRoom } from '../../redux/types/room';
import HotelRooms from '../Room/HotelRooms';
import { Image } from 'react-bootstrap';
import { manageHotelActions } from '../../redux/slices/manageHotel.slice';
import { IHotel } from '../../redux/types/hotel';

const HotelDetail = () => {
  const dispatch = useDispatch();
  const hotelDetailState = useSelector(
    (state: RootState) => state.manageHotel.hotelDetail,
  );
  const listRoomState = useSelector(
    (state: RootState) => state.manageRoom.rooms,
  );
  const { hotel_id } = useParams();

  const [hotelDetailData, setHotelDetailData] = useState<IHotel>({});
  const [listRoomData, setListRoomData] = useState<IRoom[]>([]);

  useEffect(() => {
    dispatch({
      type: `${manageHotelActions.getHotelDetailPending}_saga`,
      payload: hotel_id,
    });
    dispatch({
      type: `${manageRoomActions.getListRoomPending}_saga`,
      payload: {
        hotel_id: hotel_id,
      },
    });
  }, [hotel_id]);

  useEffect(() => {
    setHotelDetailData(hotelDetailState);
    setListRoomData(listRoomState);
  }, [listRoomState, hotelDetailState]);

  return (
    <>
      <div className={'container-fluid'}>
        <div>
          <h4 style={{ textAlign: 'center' }}>{hotelDetailData.name}</h4>
          <p style={{ textAlign: 'center' }}>{hotelDetailData.address}</p>
        </div>
        <div
          className={'banner-hotel d-flex'}
          style={{ backgroundColor: '#cccc' }}
        >
          <div>
            <Image
              src="https://i.pinimg.com/564x/5b/5c/34/5b5c34981e9d2a6adbf7c062e0fd4857.jpg"
              className={'banner-main'}
              rounded
            />
          </div>
          <div className={'banner-sub'}>
            <div
              className={'d-flex'}
              style={{ justifyContent: 'space-evenly' }}
            >
              <Image
                src="https://i.pinimg.com/564x/ea/9c/bf/ea9cbf76b7e727a9fbeab8d019661fed.jpg"
                className={'banner-sub1'}
                rounded
              />
              <Image
                src="https://i.pinimg.com/564x/bc/a4/a5/bca4a5fc5d9315ee4099769d7a69ae96.jpg"
                className={'banner-sub1'}
                rounded
              />
            </div>
            <div
              className={'d-flex'}
              style={{ justifyContent: 'space-evenly' }}
            >
              <Image
                src="https://i.pinimg.com/564x/70/66/61/70666160006b391a3158c6a8776b2e88.jpg"
                className={'banner-sub1'}
                rounded
              />
              <Image
                src="https://i.pinimg.com/564x/ea/9c/bf/ea9cbf76b7e727a9fbeab8d019661fed.jpg"
                className={'banner-sub1'}
                rounded
              />
            </div>
          </div>
        </div>
        <HotelRooms roomsData={listRoomData} />
      </div>
    </>
  );
};

export default HotelDetail;
