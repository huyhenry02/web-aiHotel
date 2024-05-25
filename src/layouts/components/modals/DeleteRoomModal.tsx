import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

function DeleteRoomModal({ isShow, onClose, roomDelete, onConfirm }) {
  return (
    <>
      <Modal show={isShow} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xóa phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn chắc chắn muốn xóa phòng!!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => onConfirm(roomDelete.id)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteRoomModal;
