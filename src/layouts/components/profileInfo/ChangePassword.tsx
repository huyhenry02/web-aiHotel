import React, { useState } from 'react';
import './ChangePassword.scss';
import { IChangePassword } from '../../../redux/types/dtos/changePassword';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { authActions } from '../../../redux/slices/auth.slice';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const checkInValid = () => {
    let isValid = false;
    if (
      !isEmpty(inputValue.oldPassword) &&
      !isEmpty(inputValue.newPassword) &&
      !isEmpty(inputValue.confirmPassword)
    ) {
      isValid = true;
    } else {
      isValid = false;
    }
    return isValid;
  };

  const checkConfirmPassword = () => {
    if (inputValue.newPassword === inputValue.confirmPassword) {
      if (inputValue.newPassword.length >= 8) {
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
        const payload: IChangePassword = {
          old_password: inputValue.oldPassword,
          new_password: inputValue.newPassword,
          password_confirm: inputValue.confirmPassword,
        };
        dispatch({
          type: `${authActions.changePasswordPending}_saga`,
          payload: payload,
        });
        setInputValue({
          confirmPassword: '',
          newPassword: '',
          oldPassword: '',
        });
      }
    } else {
      toast.error('Các trường không được để trống');
      console.log('');
    }
  };
  return (
    <div className="d-flex justify-content-center p-5">
      <div className="content_changePassword">
        <div className="from_group">
          <label>Mật khẩu cũ *</label>
          <input
            type="text"
            value={inputValue.oldPassword}
            onChange={e =>
              setInputValue({
                ...inputValue,
                oldPassword: e.target.value,
              })
            }
          />
        </div>
        <div className="from_group">
          <label>Mật khẩu mới *</label>
          <input
            type="text"
            value={inputValue.newPassword}
            onChange={e =>
              setInputValue({
                ...inputValue,
                newPassword: e.target.value,
              })
            }
          />
        </div>
        <div className="from_group">
          <label>Nhập lại mật khẩu mới* </label>
          <input
            type="text"
            value={inputValue.confirmPassword}
            onChange={e =>
              setInputValue({
                ...inputValue,
                confirmPassword: e.target.value,
              })
            }
          />
        </div>
        <button className="change_password" onClick={handleSubmit}>
          Thay đổi mật khẩu
        </button>
      </div>
    </div>
  );
};
export default ChangePassword;
