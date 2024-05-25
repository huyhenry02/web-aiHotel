import React, { useEffect, useState } from 'react';
import { IoHome, IoPersonSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import InputSearch from '../inputSearch/InputSearch';
import logo from '../../../img/logo.jpg';
import { IUser } from '../../../redux/types/user';
import SingUpModal from '../modals/SingUpModal';
import LoginModal from '../modals/LoginModal';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../redux/slices/auth.slice';
import { Image } from 'react-bootstrap';
import { IReservation } from '../../../redux/types/reservation';
type IHeader = {
  userInfo: IUser;
  isLoginError: boolean;
  isSingUpError: boolean;
};

const Header: React.FC<IHeader> = ({
  userInfo = {},
  isLoginError = false,
  isSingUpError = false,
}) => {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [reservations, setReservations] = useState<IReservation[]>([]);

  useEffect(() => {
    if (userInfo.reservations) {
      setReservations(userInfo.reservations);
    }
  }, [userInfo]);

  const handleChangeModalSignUp = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const handleChangeModalLogin = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({
      type: `${authActions.logoutPending}_saga`,
    });
    navigate('/');
  };

  return (
    <>
      <div className="app mb-3">
        <div className="wrapper">
          <div className="site_header">
            <div className="header_logo">
              <Link to={'/'}>
                <div>
                  <img
                    style={{ width: '100px', borderRadius: '38px' }}
                    src={logo}
                    alt="logo"
                  />
                </div>
              </Link>
            </div>
            <InputSearch />
            <div className="header_custom">
              <div className="home">
                <span className="icon_home">
                  <IoHome />
                </span>
                <h4
                  style={{
                    fontSize: '13px',
                    marginTop: '16px',
                    color: 'white',
                  }}
                >
                  Hệ thống khách sạn
                </h4>
              </div>
              <div className="icon_admin">
                <span>
                  <IoPersonSharp />
                </span>
                <div className="profile">
                  {!isEmpty(userInfo) ? (
                    <>
                      {userInfo.role_type !== 'admin' &&
                      userInfo.role_type !== 'employee' ? (
                        ''
                      ) : (
                        <div
                          className="profile_info"
                          onClick={() => navigate('/manage-statistical')}
                        >
                          Dashboard admin{' '}
                        </div>
                      )}
                      <div
                        className="profile_info"
                        onClick={() => navigate('/profile')}
                      >
                        Xem thông tin cá nhân{' '}
                      </div>
                      <div
                        className="changePassword"
                        onClick={() => navigate('/change-password')}
                      >
                        Đổi mật khẩu
                      </div>
                      <div className="logout" onClick={handleLogout}>
                        Đăng xuất
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="login" onClick={() => setShowLogin(true)}>
                        Đăng nhập
                      </div>
                      <div
                        className="sing_up"
                        onClick={() => setShowSignUp(true)}
                      >
                        Đăng ký
                      </div>
                    </>
                  )}
                </div>
                <span
                  style={{
                    fontSize: '0.9rem',
                    marginTop: '18px',
                    color: '#ffff',
                  }}
                >
                  {userInfo.name}
                </span>
              </div>
              <div className="book_btn">
                <a className="popup-with-form" href="#test-form">
                  Đặt Phòng
                </a>

                <div className="reservations">
                  {!isEmpty(reservations) &&
                    reservations.map((reservation, index) => (
                      <div
                        className="reservation_item"
                        key={index}
                        onClick={() =>
                          navigate(`/roomOlderDetail/${reservation.id}`)
                        }
                      >
                        <Image
                          src={
                            'https://i.pinimg.com/564x/5b/5c/34/5b5c34981e9d2a6adbf7c062e0fd4857.jpg'
                          }
                          rounded
                          className={'object-fit-cover h-100'}
                          style={{ width: '38%' }}
                        />
                        <div className="reservation_text">
                          {reservation.room && (
                            <p>Mã Phòng: {reservation.room.code}</p>
                          )}
                          {reservation.room_type && (
                            <p>Gia tiền: ${reservation.room_type.price}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header_item">
          <div className="header_item1">
            <ul className="header_item1_menu">
              <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                <li>Trang Chủ</li>
              </Link>
              <li onClick={() => navigate('/hotel')}>Phòng</li>
              {/* <li onClick={() => navigate('/dashboard')}>Dashboard</li> */}
              {/* <li onClick={() => navigate('/admin')}>Admin Manager</li> */}
              <li>Tin Tức</li>
              <li>Ưu Đãi</li>
              <li>Liên Hệ</li>
              {/* <li onClick={() => navigate('/ws-example')}>WS example</li> */}
            </ul>
          </div>
          <div className="header_item2">
            <ul className="header_item2_menu">
              <div>
                <li onClick={() => navigate('/aboutUs')}>About Us</li>
              </div>
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </div>

      <SingUpModal
        isShow={showSignUp}
        onClose={() => setShowSignUp(false)}
        onChangeModal={handleChangeModalLogin}
        isSingUpError={isSingUpError}
      />
      <LoginModal
        isShow={showLogin}
        onClose={() => setShowLogin(false)}
        onChangeModal={handleChangeModalSignUp}
        isLoginError={isLoginError}
      />
    </>
  );
};

export default Header;
