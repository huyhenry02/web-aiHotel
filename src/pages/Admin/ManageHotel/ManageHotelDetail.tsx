import { Badge, Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { manageHotelActions } from '../../../redux/slices/manageHotel.slice';
import { RootState } from '../../../redux/store';
import { IHotel } from '../../../redux/types/hotel';
import { isEmpty, map } from 'lodash';
import { IUpdateHotel } from '../../../redux/types/dtos/updateHotel';
import { IRoomType } from '../../../redux/types/roomType';
import { IoMdAddCircleOutline } from 'react-icons/io';
import AddRoomTypeModal from '../../../layouts/components/modals/AddRoomTypeModal';
import { manageRoomTypeActions } from '../../../redux/slices/manageRoomType.slice';

const ManageHotelDetail = () => {
  const dispatch = useDispatch();
  const { hotel_id } = useParams();
  const hotelState = useSelector(
    (state: RootState) => state.manageHotel.hotelDetail,
  );
  const roomTypesState: IRoomType[] = useSelector(
    (state: RootState) => state.manageRoomType.room_types,
  );

  const [showAddRoomType, setShowAddRoomType] = useState(false);
  const [roomTypeData, setRoomTypeData] = useState<IRoomType[]>([]);
  const [formValueHotel, setFormValueHotel] = useState<IHotel>({
    name: '',
    description: '',
    address: '',
    room_types: [],
  });
  const [selectRoomTypes, setSelectRoomTypes] = useState<number[]>([]);

  useEffect(() => {
    dispatch({
      type: `${manageHotelActions.getHotelDetailPending}_saga`,
      payload: hotel_id,
    });
    dispatch({
      type: `${manageRoomTypeActions.getListRoomTypePending}_saga`,
    });
  }, [hotel_id]);

  useEffect(() => {
    setFormValueHotel({
      name: hotelState.name,
      description: hotelState.description,
      address: hotelState.address,
      room_types: hotelState.room_types,
    });
    setRoomTypeData(roomTypesState);
  }, [hotelState, roomTypesState]);

  const handleDeleteRoomType = (roomTypeId: number | undefined) => {
    if (roomTypeId && formValueHotel.room_types) {
      const updatedRoomTypes = formValueHotel.room_types.filter(
        roomType => roomType.id !== roomTypeId,
      );
      setFormValueHotel({
        ...formValueHotel,
        room_types: updatedRoomTypes,
      });
    }
  };

  const handleAddRoomType = (roomType: IRoomType) => {
    if (roomType && formValueHotel.room_types) {
      setFormValueHotel({
        ...formValueHotel.room_types,
        room_types: [...formValueHotel.room_types, roomType],
      });
    }
  };

  const buildRoomTypeData = (roomTypeData: IRoomType[] | undefined) => {
    let data;
    if (roomTypeData) {
      data = roomTypeData.map(item => item.id);
    }
    return data;
  };

  const handleSubmit = () => {
    const updateHotelData: IUpdateHotel = {
      hotel_id: hotelState.id + '',
      address: formValueHotel.address,
      name: formValueHotel.name,
      description: formValueHotel.description,
      room_types: buildRoomTypeData(formValueHotel.room_types),
    };
    dispatch({
      type: `${manageHotelActions.updateHotelPending}_saga`,
      payload: updateHotelData,
    });
  };

  return (
    <>
      <div className={'container-fluid'}>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md={4}>
              <Form.Label>Hotel name:</Form.Label>
              <Form.Control
                required
                type="text"
                value={formValueHotel.name}
                onChange={e =>
                  setFormValueHotel({
                    ...formValueHotel,
                    name: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4}>
              <Form.Label>Address:</Form.Label>
              <Form.Control
                required
                type="text"
                value={formValueHotel.address}
                onChange={e =>
                  setFormValueHotel({
                    ...formValueHotel,
                    address: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="8">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={formValueHotel.description}
                onChange={e =>
                  setFormValueHotel({
                    ...formValueHotel,
                    description: e.target.value,
                  })
                }
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="8">
              <Form.Label className={'d-flex justify-content-between'}>
                Room types:
                <Button
                  variant={'primary'}
                  onClick={() => setShowAddRoomType(true)}
                >
                  <IoMdAddCircleOutline className={'me-2'} />
                  Thêm loại phòng
                </Button>
              </Form.Label>
              <div className={'d-flex custom-fill'}>
                <div className={'container-fluid d-flex flex-wrap'}>
                  {!isEmpty(formValueHotel.room_types) &&
                    map(formValueHotel.room_types, (t, i_index) => (
                      <div key={i_index} className={'p-1'}>
                        <Button variant="secondary" className="mb-2 me-2">
                          {t.name}
                          <Badge
                            bg="dark"
                            className={'ms-2'}
                            onClick={() => handleDeleteRoomType(t.id)}
                          >
                            x
                          </Badge>
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </Form.Group>
          </Row>
          <Button onClick={e => handleSubmit()}>Xác nhận</Button>
        </Form>
      </div>

      <AddRoomTypeModal
        isShow={showAddRoomType}
        onClose={() => setShowAddRoomType(false)}
        roomTypeData={roomTypeData}
        roomTypeCurrent={formValueHotel.room_types}
        onDeleteRoomType={handleDeleteRoomType}
        onAddRoomType={handleAddRoomType}
      />
    </>
  );
};

export default ManageHotelDetail;
