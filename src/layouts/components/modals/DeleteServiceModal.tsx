import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteServiceModal({ isShow, onClose, serviceDelete, onConfirm }) {
  return (
    <>
      <Modal show={isShow} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xóa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn chắc chắn muốn xóa dịch vụ {serviceDelete.name}!!!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => onConfirm(serviceDelete.id)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteServiceModal;
