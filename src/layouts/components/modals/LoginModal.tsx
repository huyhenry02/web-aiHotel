import './LoginModal.scss';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { authActions } from '../../../redux/slices/auth.slice';
import Modal from 'react-bootstrap/Modal';

type ILoginModal = {
  isShow: boolean;
  onClose: () => void;
  onChangeModal: () => void;
  isLoginError: boolean;
};
const LoginModal: React.FC<ILoginModal> = ({
  isShow = false,
  onClose,
  onChangeModal,
  isLoginError,
}) => {
  const navigate = useNavigate();
  const [inputLogin, setInputLogin] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch({
      type: `${authActions.loginPending.type}_saga`,
      payload: {
        email: inputLogin.email,
        password: inputLogin.password,
      },
    });
    if (!isLoginError) {
      setInputLogin({
        email: '',
        password: '',
      });
      onClose();
    } else {
      setInputLogin({
        email: '',
        password: '',
      });
    }
  };
  return (
    <>
      <Modal show={isShow} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Đăng Nhập Tài Khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-lg">
          <div className="wrapper-top">
            <div className="container_top">
              <h1 className="text-center" style={{ marginTop: '-64px' }}>
                Đăng nhập
              </h1>
              <div className="top_container">
                <input
                  type="text"
                  placeholder="Email của bạn"
                  value={inputLogin.email}
                  onChange={e =>
                    setInputLogin({
                      ...inputLogin,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={inputLogin.password}
                  onChange={e =>
                    setInputLogin({
                      ...inputLogin,
                      password: e.target.value,
                    })
                  }
                />
                <p
                  className="forgot_password"
                  onClick={() => navigate('/sendEmail')}
                >
                  Forgot Password ?
                </p>
                <button type="submit" onClick={handleLogin}>
                  Đăng Nhập
                </button>
                <div className="sing_up">
                  Bạn chưa có tài khoản? Vui lòng đăng ký Tài khoản mới
                  <div onClick={onChangeModal}>
                    <span>tại đây</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div>admin@gmail.com</div>
            <div>Admin@123</div> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
