import './LoginModal.scss';
import React from 'react';
import Modal from 'react-bootstrap/Modal';

type ISupportModal = {
  isShow: boolean;
  onClose: () => void;
};
const SupportModal: React.FC<ISupportModal> = ({ isShow = false, onClose }) => {
  return (
    <>
      <Modal show={isShow} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Hủy đặt phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-lg">
          <div className={'container-fluid  support'}>
            <div className="help_support">
              Bạn muốn hủy đặt phòng hãy liên hệ với chúng tôi???
            </div>
            <div className="hotline">Hotline:</div>
            <div className="phone">
              <div>
                <span>Hà Nội</span>
                <span>19002310</span>
              </div>
              <div>
                <span>Lào Cai</span>
                <span>19000711</span>
              </div>
              <div>
                <span>Quảng Ninh</span>
                <span>19000608</span>
              </div>
              <div>
                <span>Hải Phòng</span>
                <span>19000616</span>
              </div>
              <div>
                <span>Vĩnh Phúc</span>
                <span>19000618</span>
              </div>
            </div>
            <div className="help_email">Email:</div>
            <div className="email">aihotel123@gmail.com</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SupportModal;
