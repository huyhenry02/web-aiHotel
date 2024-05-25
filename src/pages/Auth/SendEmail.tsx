import { useNavigate } from 'react-router';
import './SendEmail.scss';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import axiosInstance from '../../services/axios.service';
import { toast } from 'react-toastify';
import { get } from 'lodash';

const sendMail = async (email: string) => {
  try {
    const response = await axiosInstance.post(
      '/api/auth/send-reset-password-email',
      { email: email },
    );
    toast.success('Bạn đã gửi email thành công');
    return response;
  } catch (err) {
    toast.error(get(err, 'response.data.message'));
  }
};

const SendEmail = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // sendMail(email)
    console.log(await sendMail(email));
  };

  return (
    <>
      <div className="wrapper_resetPassword">
        <div className="container_resetPassword">
          <h1 className="text-center">Quên mật khẩu</h1>
          <p className="text-center">
            Nhập email của bạn để thiết lập mật khẩu của bạn{' '}
          </p>
          <div className="top">
            <input
              type="text"
              placeholder="Email của bạn"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="reset">
            <button type="submit" className="confirm" onClick={handleSubmit}>
              Xác nhận
            </button>
            <button
              type="submit"
              className="reject"
              onClick={() => navigate('/login')}
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendEmail;
