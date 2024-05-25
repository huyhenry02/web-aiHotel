import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';
import { IoLogoYoutube, IoHome } from 'react-icons/io5';
import { VscTriangleUp } from 'react-icons/vsc';
import logo from '../../../src/img/logo.jpg';
import './Footer.scss';
import React from 'react';

const Footer = () => {
  return (
    <div className="footer-top">
      <div className="container-top1">
        <div className="footer_main">
          <div className="footer_information">
            <h2>Về AiHotel</h2>
            <p>Chuyện của AiHotel</p>
            <p>Về AiHotel</p>
          </div>
          <div className="footer_menu">
            <h2>Hoạt động cộng đồng</h2>
            <p>Xây trường cho trẻ</p>
            <p>Mùa xuân ấm áp tình thương</p>
            <p>Chung tay phòng chống COVID</p>
          </div>
          <div className="footer_menu">
            <h2>Hướng dẫn đặt phòng</h2>
            <p>Chính sách đặt phòng và thanh toán</p>
            <p>Chính sách hoàn tiền</p>
            <p>Chính sách bảo mật thông tin</p>
          </div>
          <div className="footer_menu">
            <h2>Thông tin liên hệ</h2>
            <p>cskh.so@aihotel.vn</p>
            <p>1800.646.890</p>
            <a href="">
              <div>
                <div className="icon_store">
                  <IoHome />
                </div>
                <span>Hệ thống khách sạn</span>
              </div>
            </a>
          </div>
        </div>
        <div className="footer_inner">
          <div className="footer_form">
            <input placeholder="Đăng ký email để nhận ưu đãi *" />
            <button>Đăng ký</button>
          </div>
          <div>
            <img
              src={logo}
              style={{ width: '100px', borderRadius: '35px' }}
              alt="logo"
            ></img>
          </div>
          <h1 style={{ fontWeight: '600' }}>Khách sạn AiHotel</h1>
          <div className="footer_social">
            <div>
              <FaFacebookSquare />
            </div>
            <div>
              <FaInstagramSquare />
            </div>
            <div>
              <IoLogoYoutube />
            </div>
          </div>
        </div>
      </div>
      <div className="footer_custom">
        <div className="custom_item">
          <div className="custom_item_title">
            Công ty cổ phần khách sạn AiHotel
          </div>
          <div>GPĐKKD số 0109153702 do Sở KHĐT Tp.Hà Nội cấp 09/04/2020</div>
          <div>225 Trần Đăng Ninh, p. Dịch Vọng, q. Cầu Giấy, Hà Nội</div>
        </div>
        <div className="custom_notify">
          <span className="note">
            <VscTriangleUp />
          </span>
          <div>
            * Lưu ý: Hãy đến với AiHotel sẽ không làm bạn phải thất vọng!!!!
          </div>
        </div>
        <div className="custom_img">
          <img
            className="img_1"
            src="https://mazii.net/assets/imgs/icon/logoSaleNoti.png"
            alt=""
          ></img>
          <img
            className="img_2"
            src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=eaa3d3f6-1751-4d32-9118-ca59176adb02"
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Footer;
