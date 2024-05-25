import Image from 'react-bootstrap/Image';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { IoIosArrowForward } from 'react-icons/io';
import './ListHotels.css';
import { IHotel } from '../../redux/types/hotel';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { isEmpty, map } from 'lodash';
import { useLocation } from 'react-router';

type IListHotelComponent = {
  listHotelData: IHotel[];
  onCheckHotel: (hotelId: number) => void;
};

const ListHotels: React.FC<IListHotelComponent> = ({
  listHotelData = [],
  onCheckHotel,
}) => {
  return (
    <>
      <div className={'container-fluid'}>
        {!isEmpty(listHotelData) &&
          map(listHotelData, (hotel, i_index) => (
            <div className={'container-hotel'} key={i_index}>
              <Image
                src={
                  'https://i.pinimg.com/564x/5b/5c/34/5b5c34981e9d2a6adbf7c062e0fd4857.jpg'
                }
                rounded
                className={'object-fit-cover h-100'}
                style={{ width: '30%' }}
              />
              <div
                className={'ms-3 content-hotel'}
                style={{ width: '50%', maxHeight: '100%' }}
              >
                <h5 className={'custom-inline'}>{hotel.name}</h5>
                <p className={'custom-inline'}>{hotel.address}</p>
                <Stack
                  direction="horizontal"
                  gap={2}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    maxHeight: '25%',
                    overflow: 'hidden',
                  }}
                  className={'mb-3'}
                >
                  {!isEmpty(hotel.room_types) &&
                    map(hotel.room_types, (type, t_index) => (
                      <Badge bg="secondary" key={t_index}>
                        {type.name}
                      </Badge>
                    ))}
                </Stack>
                <label style={{ fontSize: '15px' }}>Description:</label>
                <p
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    maxHeight: '100%',
                  }}
                >
                  {hotel.description}
                </p>
              </div>
              <div
                style={{ width: '20%', textAlign: 'end', height: '100%' }}
                className={'d-flex justify-content-between flex-column'}
              >
                <div>
                  <Button style={{ backgroundColor: '#51A9FF' }}>4.8</Button>
                </div>
                <div>
                  <Button
                    style={{ backgroundColor: '#51A9FF' }}
                    onClick={() => onCheckHotel(Number(hotel.id))}
                  >
                    Check room
                    <i>
                      <IoIosArrowForward size={'20px'} />
                    </i>
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ListHotels;
