import { Image } from 'react-bootstrap';
import './RoomOlderDetail.scss';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import React, { useEffect, useState } from 'react';
import { IReservation } from '../../redux/types/reservation';
import { isEmpty } from 'lodash';
import SupportModal from '../../layouts/components/modals/SupportModal';

const RoomOlderDetail = () => {
  const reservationsState = useSelector(
    (state: RootState) => state.auth.userInfo.reservations,
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [reservationDetail, setReservationDetail] = useState<IReservation>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if (reservationsState) {
      setReservations(reservationsState);
    }
  }, [reservationsState]);

  // useEffect(() => {
  //     if (!isEmpty(reservations)) {
  //         const reserDetail = reservations.find(reser => reser.id === Number(id));
  //         if (reserDetail) {
  //           setReservationDetail(reserDetail);
  //           setIsLoading(false)
  //         }
  //     }
  // }, [id, reservationsState])

  useEffect(() => {
    if (!isEmpty(reservationsState)) {
      const reserDetail = reservationsState?.find(
        reser => reser.id === Number(id),
      );
      if (reserDetail) {
        setReservationDetail(reserDetail);
        setIsLoading(false);
      }
    }
  }, [id, reservationsState]);

  return (
    <div className="roomOlderDetail">
      <div style={{ fontSize: '54px', fontStyle: 'italic' }}>
        Xin chào {reservationDetail.user?.name}
      </div>
      <div style={{ fontSize: '34px' }}>Chi tiết Phòng bạn đã đặt.</div>
      <div className="roomOlderDetail_item">
        <Image
          src={
            'https://i.pinimg.com/564x/5b/5c/34/5b5c34981e9d2a6adbf7c062e0fd4857.jpg'
          }
          rounded
          className={'object-fit-cover h-100'}
          style={{ width: '50%' }}
        />
        <div className="roomOlderDetail_text">
          <p>Tên khách sạn: {reservationDetail.hotel?.name}</p>
          <p>Địa điểm: {reservationDetail.hotel?.address}</p>
          <p>Phòng: {reservationDetail.room?.code}</p>
          <p>Gía phòng: {reservationDetail.room_type?.price}</p>
          <p>Ngày bắt đầu: {reservationDetail.start_date}</p>
          <p>Ngày kết thúc: {reservationDetail.end_date}</p>
          <p>Mô tả: {reservationDetail.hotel?.description}</p>
        </div>
      </div>

      <div>
        <Button variant="contained" onClick={() => setIsShow(true)}>
          Hủy đặt phòng
        </Button>
        <Button
          variant="outlined"
          style={{ marginLeft: '12px' }}
          onClick={() => navigate('/')}
        >
          Đóng
        </Button>
      </div>
      <SupportModal isShow={isShow} onClose={() => setIsShow(false)} />
    </div>
  );
};

export default RoomOlderDetail;
