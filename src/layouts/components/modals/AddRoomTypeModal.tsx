import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Badge, Col, Row } from 'react-bootstrap';
import { IRoomType } from '../../../redux/types/roomType';
import { isEmpty, map } from 'lodash';

type IAddRoomTypeModal = {
  isShow: boolean;
  onClose: () => void;
  onDeleteRoomType: (roomTypeId: number | undefined) => void;
  onAddRoomType: (roomType: IRoomType) => void;
  roomTypeCurrent: IRoomType[] | undefined;
  roomTypeData: IRoomType[];
};

const AddRoomTypeModal: React.FC<IAddRoomTypeModal> = ({
  isShow,
  onClose,
  roomTypeCurrent,
  roomTypeData,
  onDeleteRoomType,
  onAddRoomType,
}) => {
  const [remainingRoomType, setRemainingRoomType] = useState<IRoomType[]>([]);

  useEffect(() => {
    if (roomTypeCurrent) {
      const roomTypeIds = roomTypeCurrent.map(t => t.id);
      const result = roomTypeData.filter(t => !roomTypeIds.includes(t.id));
      setRemainingRoomType(result);
    } else {
      setRemainingRoomType(roomTypeData);
    }
  }, [roomTypeData, roomTypeCurrent]);

  return (
    <Modal show={isShow} onHide={onClose} size={'lg'}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Loại phòng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Loại phòng hiện tại:</Form.Label>
              <div className={'d-flex custom-fill'}>
                <div className={'container-fluid d-flex flex-wrap'}>
                  {!isEmpty(roomTypeCurrent) &&
                    map(roomTypeCurrent, (t, i_index) => (
                      <div key={i_index} className={'p-1'}>
                        <Button variant="secondary" className="mb-2 me-2">
                          {t.name}
                          <Badge
                            bg="dark"
                            className={'ms-2'}
                            onClick={() => onDeleteRoomType(t.id)}
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

          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Các loại phòng:</Form.Label>
              <div className={'d-flex custom-stroke'}>
                <div className={'container-fluid d-flex flex-wrap'}>
                  {!isEmpty(remainingRoomType) &&
                    map(remainingRoomType, (t, i_index) => (
                      <div key={i_index} className={'p-1'}>
                        <Button
                          variant="secondary"
                          className="mb-2 me-2"
                          onClick={() => onAddRoomType(t)}
                        >
                          {t.name}
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRoomTypeModal;
