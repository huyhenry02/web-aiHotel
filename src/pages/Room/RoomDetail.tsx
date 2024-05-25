import { Button, Image, Offcanvas } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import './RoomDetail.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';
import { IoEyeOutline } from 'react-icons/io5';
import { TbHomeDot } from 'react-icons/tb';
import { initEcho, initPusher } from '../../services/ws.service';
import { IUser } from '../../redux/types/user';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { IReservationCreate } from '../../redux/types/dtos/createReservation';
import ReservationConfirmModal from '../../layouts/components/modals/ReservationConfirmModal';
import { manageReservationActions } from '../../redux/slices/manageReservation.slice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { IRoomDetail } from '../../redux/types/dtos/roomDetail';
import { eachDayOfInterval } from 'date-fns';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Review from './Review';

type IRoomDetailComponent = {
  show: boolean;
  handleClose: () => void;
  roomData: IRoomDetail;
};
const RoomDetail: React.FC<IRoomDetailComponent> = ({
  show,
  handleClose,
  roomData = {},
}) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dayNumbers, setDayNumbers] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [amountPeople, setAmountPeople] = useState<number>(1);
  const [showReservationConfirm, setShowReservationConfirm] = useState(false);
  const [reservationData, setReservationData] = useState({});
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  const [usersRoom, setUsersRoom] = useState<IUser[]>([]);
  const [roomSelected, setRoomSelected] = useState<number | undefined>(0);
  const [roomOldSelected, setRoomOldSelected] = useState<number | undefined>(0);
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const buildDateBooked = dateBooked => {
    const newDisabledDates: Date[] = [];
    dateBooked.forEach(booking => {
      const startDate = new Date(booking.start_date);
      const endDate = new Date(booking.end_date);
      const datesInBooking = eachDayOfInterval({
        start: startDate,
        end: endDate,
      });
      newDisabledDates.push(...datesInBooking);
    });
    setDisabledDates(newDisabledDates);
  };

  const applyJoin = () => {
    if (roomOldSelected) {
      (window as any).Echo?.leave(`presence.room.${roomOldSelected}`);
    }

    if (roomSelected) {
      (window as any).Echo?.join(`presence.room.${roomSelected}`)
        .here(users => {
          setUsersRoom(users);
        })
        .joining(user => {
          setUsersRoom(prevState => [...prevState, user]);
        })
        .leaving(user => {
          setUsersRoom(prevState => prevState.filter(u => u.id !== user.id));
        });
    }
  };

  const isRangeDisabled = (startDate, endDate, disabledDates) => {
    const datesInRange = eachDayOfInterval({ start: startDate, end: endDate });
    const dateStringArray = disabledDates.map(
      date => date.toISOString().split('T')[0],
    );
    return datesInRange.some(date =>
      dateStringArray.includes(date.toISOString().split('T')[0]),
    );
  };

  useEffect(() => {
    if (!(window as any).Echo) {
      (window as any).Echo = initEcho();
    }
    if (!(window as any).Pusher) {
      (window as any).Pusher = initPusher();
    }
  }, []);

  useEffect(() => {
    if (!show && roomSelected) {
      (window as any).Echo?.leave(`presence.room.${roomSelected}`);
      setRoomSelected(0);
    }
  }, [show]);

  useEffect(() => {
    if (roomSelected) {
      setRoomOldSelected(roomSelected);
    }
    setRoomSelected(roomData.id);

    if (roomData && roomData.reservations) {
      const date = roomData.reservations.map(r => ({
        start_date: r.start_date,
        end_date: r.end_date,
      }));
      buildDateBooked(date);
    }
  }, [roomData]);

  useEffect(() => {
    if (roomSelected) {
      applyJoin();
      if (roomSelected) {
        (window as any).Echo?.channel('booked-channel').listen(
          `.booked.event.${roomSelected}`,
          e => {
            setDisabledDates([
              ...disabledDates,
              ...eachDayOfInterval({
                start: new Date(e.start_date),
                end: new Date(e.end_date),
              }),
            ]);
          },
        );
      }
    }
  }, [roomSelected]);

  useEffect(() => {
    const isDisabled = isRangeDisabled(startDate, endDate, disabledDates);
    if (!isDisabled) {
      if (startDate && endDate) {
        setDayNumbers(differenceInDays(endDate, startDate) + 1);
      }
    } else {
      setStartDate('');
      setEndDate('');
      toast.error('Vui lòng chọn ngày trống!');
    }
  }, [endDate, startDate]);

  useEffect(() => {
    setTotalPrice(Number(roomData?.room_type?.price) * dayNumbers);
  }, [dayNumbers, roomData]);

  const inValidDate = () => {
    const currentDate = new Date();
    const startDateObj = new Date(startDate);
    const startDateDateOnly = new Date(
      startDateObj.getFullYear(),
      startDateObj.getMonth(),
      startDateObj.getDate(),
    );
    const currentDateDateOnly = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    return startDateDateOnly >= currentDateDateOnly;
  };

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const setDateRange = update => {
    if (update && update.length === 2) {
      setStartDate(update[0]);
      setEndDate(update[1]);
    }
  };

  const handleBookRoom = () => {
    if (startDate && endDate) {
      if (inValidDate()) {
        setReservationData({
          room_code: roomData.code,
          start_date: formatDate(startDate),
          end_date: formatDate(endDate),
          room_price: roomData.room_type?.price,
          days: dayNumbers,
          total: totalPrice,
          amount_person: amountPeople,
        });
        setShowReservationConfirm(true);
      } else {
        setStartDate('');
        setEndDate('');
        toast.error('Chọn ngày lớn hơn hoặc bằng hiện tại!');
      }
    } else {
      toast.error('Vui lòng chọn ngày đặt!');
    }
  };

  const handleConfirm = () => {
    const payload: IReservationCreate = {
      room_id: roomData.id,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      amount_person: amountPeople,
    };
    dispatch({
      type: `${manageReservationActions.createReservationPending}_saga`,
      payload: payload,
    });
    setShowReservationConfirm(false);
    const datesInBooking = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
    setDisabledDates([...disabledDates, ...datesInBooking]);
    setStartDate('');
    setEndDate('');
    setDayNumbers(0);
    setAmountPeople(1);
  };

  return (
    <>
      <div className={'container-fluid'}>
        <Offcanvas
          show={show}
          onHide={handleClose}
          style={{ width: '40%' }}
          placement={'end'}
        >
          <Offcanvas.Body>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Chi tiết phòng" value="1" />
                  <Tab label="Bình luận" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className={'room-status'}>
                  <div className={'custom-fill'}>Tầng {roomData.floor}</div>
                  <hr style={{ color: 'black' }} />
                  <div className={'custom-stroke'}>P.{roomData.code}</div>
                  <div>
                    <div className={'d-flex align-items-center'}>
                      <TbHomeDot style={{ color: 'green' }} />
                      <div className={'ms-1'}>Phòng trống</div>
                    </div>
                    <div className={'d-flex align-items-center'}>
                      <IoEyeOutline />
                      <div className={'ms-1'}>{usersRoom.length} views</div>
                    </div>
                  </div>
                </div>
                <div className={'room-content'}>
                  <div className={'room-image d-flex mb-2'}>
                    <div className={'p-1'}>
                      <Image
                        src={
                          'https://i.pinimg.com/564x/ea/9c/bf/ea9cbf76b7e727a9fbeab8d019661fed.jpg'
                        }
                        rounded
                        fluid
                        className={'image-main'}
                      />
                    </div>
                    <div>
                      <div className={'p-1'}>
                        <Image
                          src={
                            'https://i.pinimg.com/564x/70/66/61/70666160006b391a3158c6a8776b2e88.jpg'
                          }
                          rounded
                          fluid
                          className={'image-sub'}
                        />
                      </div>
                      <div className={'p-1'}>
                        <Image
                          src={
                            'https://i.pinimg.com/564x/ea/9c/bf/ea9cbf76b7e727a9fbeab8d019661fed.jpg'
                          }
                          rounded
                          fluid
                          className={'image-sub'}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={'custom-title'} style={{ color: 'white' }}>
                    {roomData?.room_type?.name}
                  </div>

                  <div className={'container-fluid'}>
                    <label className={'title-description'}>Description</label>
                    <div className={'room-detail-description'}>
                      <p>{roomData?.room_type?.description}</p>
                    </div>
                  </div>

                  <div
                    className={'custom-title d-flex justify-content-between'}
                    style={{ color: 'white' }}
                  >
                    <div>Price</div>
                    <div>${roomData?.room_type?.price}.00/day</div>
                  </div>

                  <div>
                    <label>Start date - End date</label>
                    <DatePicker
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={update => setDateRange(update)}
                      withPortal
                      className="form-control mb-2"
                      excludeDates={disabledDates}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>

                  <div>
                    <FloatingLabel label="Amount people">
                      <Form.Select
                        value={amountPeople}
                        onChange={e =>
                          setAmountPeople(parseInt(e.target.value))
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </Form.Select>
                    </FloatingLabel>
                  </div>

                  <div className={'container-fluid mb-2'}>
                    <hr />
                    <div className={'d-flex justify-content-between'}>
                      <div>Room rates</div>
                      <div>${roomData?.room_type?.price}.00</div>
                    </div>
                    <div className={'d-flex justify-content-between'}>
                      <div>Days</div>
                      <div>{dayNumbers} days</div>
                    </div>
                    <div className={'d-flex justify-content-between'}>
                      <div>Voucher</div>
                      <div>0</div>
                    </div>
                    <div className={'d-flex justify-content-between'}>
                      <div>Đặt cọc</div>
                      <div>$5</div>
                    </div>
                    <hr />
                    <div className={'d-flex justify-content-between'}>
                      <div>Total:</div>
                      <div>${totalPrice}.00</div>
                    </div>
                  </div>

                  <div className={'d-flex justify-content-center'}>
                    <Button onClick={handleBookRoom}>Book room</Button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <Review roomId={roomData.id} />
              </TabPanel>
            </TabContext>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      <ReservationConfirmModal
        isShow={showReservationConfirm}
        onClose={() => setShowReservationConfirm(false)}
        data={reservationData}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default RoomDetail;
