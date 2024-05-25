import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { authActions } from '../../../redux/slices/auth.slice';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import './SingUpModal.scss';
import { IRegister } from '../../../redux/types/dtos/register';

type ISignUpModal = {
  isShow: boolean;
  onClose: () => void;
  onChangeModal: () => void;
  isSingUpError: boolean;
};

const SingUpModal: React.FC<ISignUpModal> = ({
  isShow = false,
  onClose,
  onChangeModal,
  isSingUpError,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [identification, setIdentification] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFullNameChange = e => {
    setFullName(e.target.value);
  };
  const handlePhoneNumberChange = e => {
    setPhoneNumber(e.target.value);
  };
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handleIdentificationChange = e => {
    setIdentification(e.target.value);
  };
  const handleAgeChange = e => {
    setAge(e.target.value);
  };
  const handleAddressChange = e => {
    setAddress(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
  };

  const checkInValid = () => {
    let isValid = false;
    if (
      !isEmpty(fullName) &&
      !isEmpty(phoneNumber) &&
      !isEmpty(email) &&
      !isEmpty(address) &&
      !isEmpty(age) &&
      !isEmpty(identification) &&
      !isEmpty(password) &&
      !isEmpty(confirmPassword)
    ) {
      isValid = true;
    } else {
      isValid = false;
    }
    return isValid;
  };

  const checkPassword = () => {
    let isValid = false;
    if (password === confirmPassword) {
      isValid = true;
    } else {
      isValid = false;
    }
    return isValid;
  };

  const clearValue = () => {
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setAge('');
    setAddress('');
    setPassword('');
    setConfirmPassword('');
    setIdentification('');
  };

  const handleSubmit = async () => {
    if (checkInValid()) {
      if (checkPassword()) {
        const payload: IRegister = {
          name: fullName,
          phone: phoneNumber,
          email: email,
          password: password,
          age: age,
          address: address,
          identification: identification,
        };
        dispatch({
          type: `${authActions.registerPending}_saga`,
          payload: payload,
        });

        if (!isSingUpError) {
          clearValue();
          onClose();
        } else {
          clearValue();
        }
      } else {
        toast.error('Mật khẩu không khớp');
      }
    } else {
      toast.error('Các trường không được để trống');
    }
  };
  return (
    <Modal show={isShow} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Đăng Ký Tài Khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-lg">
        <div className="wrapper-top">
          <div className="top-header">
            <h2 className="text">Đăng Ký Tài Khoản</h2>
            <input
              type="text"
              placeholder="Họ tên(*)"
              value={fullName}
              onChange={handleFullNameChange}
            />
            <input
              type="text"
              placeholder="SĐT(*)"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <input
              type="email"
              placeholder="Email(*)"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type=""
              placeholder="Address(*)"
              value={address}
              onChange={handleAddressChange}
            />
            <input
              type=""
              placeholder="Identification(*)"
              value={identification}
              onChange={handleIdentificationChange}
            />
            <input
              type=""
              placeholder="Age(*)"
              value={age}
              onChange={handleAgeChange}
            />
            <input
              type="password"
              placeholder="Nhập mật khẩu(*)"
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu(*)"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div className="btn_group">
              <div onClick={onChangeModal}>
                <span>Về trang đăng nhập</span>
              </div>
              <button type="submit" onClick={handleSubmit}>
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default SingUpModal;
