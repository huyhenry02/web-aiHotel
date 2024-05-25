import React, { useEffect } from 'react';
import { useState } from 'react';
import './UpdateInfo.scss';
import { IUser } from '../../../redux/types/user';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../redux/slices/auth.slice';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';

type IUpdateInfoComponent = {
  userInfo: IUser;
};

const UpdateInfo: React.FC<IUpdateInfoComponent> = ({ userInfo = {} }) => {
  const [showBtnUpdate, setShowBtnUpdate] = useState(false);
  const [inputValue, setInputValue] = useState<IUser>({
    name: '',
    phone: '',
    address: '',
    identification: '',
    age: 0,
  });

  const [newInputValue, setNewInputValue] = useState<IUser>({
    name: '',
    phone: '',
    address: '',
    identification: '',
    age: 0,
  });

  useEffect(() => {
    setInputValue({
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address,
      identification: userInfo.identification,
      age: userInfo.age,
    });
    setNewInputValue({
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address,
      identification: userInfo.identification,
      age: userInfo.age,
    });
  }, [userInfo]);

  useEffect(() => {
    const isDifferent =
      JSON.stringify(inputValue) !== JSON.stringify(newInputValue);
    setShowBtnUpdate(isDifferent);
  }, [inputValue, newInputValue]);

  const dispatch = useDispatch();

  const checkInValid = () => {
    let isValid;
    if (
      isEmpty(newInputValue.name) ||
      isEmpty(newInputValue.address) ||
      isEmpty(newInputValue.identification) ||
      isEmpty(newInputValue.phone)
    ) {
      isValid = false;
    } else {
      isValid = true;
    }
    return isValid;
  };

  const handleProcessData = (inputValue, newInputValue) => {
    const keys = Object.keys(inputValue);
    const result = {};
    keys.forEach(key => {
      if (key in newInputValue && inputValue[key] !== newInputValue[key]) {
        result[key] = newInputValue[key];
      }
    });

    return result;
  };

  const handleSubmit = () => {
    if (checkInValid()) {
      const dataChange = handleProcessData(inputValue, newInputValue);
      const newProfileData = {
        ...dataChange,
        user_id: userInfo.id + '',
      };
      dispatch({
        type: `${authActions.updateInfoPending}_saga`,
        payload: newProfileData,
      });
    } else {
      toast.error('Các trường không được để trống');
    }
  };

  return (
    <div className="update_info">
      <div className="container">
        <h1>Xin chào {userInfo.name}</h1>
        <h2>Thông tin tài khoản:</h2>
        <div className="content">
          <div className="from_group">
            <label>Họ tên *</label>
            <input
              value={newInputValue?.name}
              onChange={e =>
                setNewInputValue({
                  ...newInputValue,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="from_group">
            <label>Email *</label>
            <input readOnly value={newInputValue?.email} />
          </div>
          <div className="from_group">
            <label>SĐT </label>
            <input
              value={newInputValue?.phone}
              onChange={e =>
                setNewInputValue({
                  ...newInputValue,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className="from_group">
            <label>Địa chỉ</label>
            <input
              value={newInputValue?.address}
              onChange={e =>
                setNewInputValue({
                  ...newInputValue,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className="from_group">
            <label>Tuổi</label>
            <input
              value={newInputValue?.age}
              onChange={e =>
                setNewInputValue({
                  ...newInputValue,
                  age: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="from_group">
            <label>CCCD</label>
            <input
              value={newInputValue?.identification}
              onChange={e =>
                setNewInputValue({
                  ...newInputValue,
                  identification: e.target.value,
                })
              }
            />
          </div>
        </div>
        {showBtnUpdate ? (
          <button className="update" onClick={handleSubmit}>
            Cập nhật tài khoản
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default UpdateInfo;
