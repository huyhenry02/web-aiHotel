import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { IResetPassword } from '../../redux/types/dtos/resetPassword';
import { authActions } from '../../redux/slices/auth.slice';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token') || '';
  const [inputValue, setInputValue] = useState({
    new_password: '',
    password_confirm: '',
  });

  const checkInValid = () => {
    let isValid = false;
    if (
      !isEmpty(inputValue.new_password) &&
      !isEmpty(inputValue.password_confirm)
    ) {
      isValid = true;
    } else {
      isValid = false;
    }
    return isValid;
  };

  const checkConfirmPassword = () => {
    if (inputValue.new_password === inputValue.password_confirm) {
      if (inputValue.new_password.length >= 8) {
        return true;
      } else {
        toast.error('Mật khẩu phải đủ 8 ký tự');
        return false;
      }
    } else {
      toast.error('Mật khẩu không khớp');
      return false;
    }
  };

  const handleSubmit = () => {
    if (checkInValid()) {
      if (checkConfirmPassword()) {
        const payload: IResetPassword = {
          token: token,
          new_password: inputValue.new_password,
          password_confirm: inputValue.password_confirm,
        };
        dispatch({
          type: `${authActions.resetPasswordPending}_saga`,
          payload: payload,
        });
      }
      navigate('/');
    } else {
      toast.error('Các trường không được để trống');
    }
  };

  return (
    <>
      <div className="wrapper_resetPassword">
        <div className="container_resetPassword">
          <h1 className="text-center">Lấy lại mật khẩu</h1>
          <div className="top">
            <input
              type="text"
              placeholder="Mật khẩu (*)"
              value={inputValue.new_password}
              onChange={e =>
                setInputValue({
                  ...inputValue,
                  new_password: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Nhập lại mật khẩu (*)"
              value={inputValue.password_confirm}
              onChange={e =>
                setInputValue({
                  ...inputValue,
                  password_confirm: e.target.value,
                })
              }
            />
          </div>
          <div className="reset">
            <button type="submit" className="confirm" onClick={handleSubmit}>
              Gửi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
