import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

type IReservationConfirmModal = {
  isShow: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: {
    room_code?: number;
    start_date?: string;
    end_date?: string;
    room_price?: number;
    days?: number;
    total?: number;
    amount_person?: number;
  };
};

const ReservationConfirmModal: React.FC<IReservationConfirmModal> = ({
  isShow,
  onClose,
  data = {},
  onConfirm,
}) => {
  return (
    <>
      <Modal show={isShow} onHide={onClose} backdrop="static">
        <Modal.Body>
          <div className={'d-flex justify-content-center mb-3'}>
            <div className={''}>
              <div className={'custom-fill'}>P.{data.room_code}</div>
            </div>
          </div>

          <hr />

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Lịch đặt phòng</Form.Label>
              <div className={'d-flex align-items-center'}>
                <p className={'m-auto me-2'} style={{ fontWeight: 'bold' }}>
                  Từ:{' '}
                </p>
                <Form.Control
                  type="text"
                  placeholder="start date"
                  value={data.start_date}
                  readOnly
                />
                <p
                  className={'m-auto me-2 ms-2'}
                  style={{ fontWeight: 'bold' }}
                >
                  Đến:{' '}
                </p>
                <Form.Control
                  type="text"
                  placeholder="end date"
                  value={data.end_date}
                  readOnly
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số người:</Form.Label>
              <div className={'d-flex align-items-center'}>
                <Form.Control
                  type="text"
                  placeholder="amount of people"
                  value={data.amount_person}
                  readOnly
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <div
                className={'d-flex justify-content-between mb-1'}
                style={{ fontWeight: 'bold' }}
              >
                <div>Giá phòng:</div>
                <div>${data.room_price}.00</div>
              </div>
              <div className={'d-flex justify-content-between mb-1'}>
                <div>Số ngày:</div>
                <div>{data.days} ngày</div>
              </div>
              <div className={'d-flex justify-content-between mb-1'}>
                <div>Voucher:</div>
                <div>0</div>
              </div>
              <div className={'d-flex justify-content-between'}>
                <div>Đặt cọc </div>
                <div>$5</div>
              </div>
            </Form.Group>
            <hr />
            <Form.Group className="mb-3">
              <div
                className={'d-flex justify-content-between mb-1'}
                style={{ fontWeight: 'bold' }}
              >
                <div>Tổng: </div>
                {/* <div>${data?.total}.00</div> */}
                <div>${data?.total ? data.total - 5 : 'N/A'}</div>
              </div>
            </Form.Group>
          </Form>

          <div className={'d-flex justify-content-end'}>
            <Button variant="secondary" onClick={onClose} className={'me-2'}>
              Quay lại
            </Button>
            <Button variant="primary" className={'me-2'} onClick={onConfirm}>
              Đặt phòng
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReservationConfirmModal;
