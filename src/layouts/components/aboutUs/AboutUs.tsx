import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const AboutUs = () => {
  return (
    <div>
      {/*<Header/>*/}
      <hr></hr>
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center">Thông tin về khách sạn AiHotel</h1>
        <p className="text-center m-3 font-size-lg">
          Tọa lạc ngay tại trung tâm thành phố và trên con đường Tôn Đức Thắng
          sầm uất, chỉ mất 3-5 phút đi bộ đến Nhà hát Thành Phố nổi tiếng. Khách
          sạn AiHotel Hà Nội là 1 trong những khách sạn 5 sao đầu tiên tại Hà
          Nội, hiện nay khách sạn vẫn luôn giữ vững vị thế của mình trong suốt
          hơn 5 năm qua.
        </p>
        <p>
          Nằm trên những tầng cao nhất của toà nhà 5 tầng tráng lệ, khách sạn
          AiHotel Hà Nội tự hào là đại diện cho tiêu chuẩn khách sạn 5 sao quốc
          tế mới tại Hà Nội nói riêng và Việt Nam nói chung.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-dark"
          style={{ width: '100px' }}
        >
          AiHotel
        </button>
      </div>
      <hr></hr>

      <div>
        <h2 className="mt-3 mb-4 text-center">ROMS</h2>
        <div className="d-flex justify-content-center align-items-center ">
          <div>
            <img
              src="https://www.lottehotel.com/content/dam/lotte-hotel/lotte/saigon/main/20180919-01-2000-mai-Ltho.jpg.thumb.768.768.jpg"
              style={{ width: '450px' }}
              alt="rom1"
            ></img>{' '}
          </div>
          <div className="m-5">
            <h4>Phòng ở</h4>
            <p>250 phòng lưu trú đầy tiện nghi và sang trọng</p>
            <p>Mỗi phòng đều có khu vực làm việc và tiếp khách riêng biệt.</p>
            <p>
              Phòng có lối kiến trúc trang nhã rộng rãi có wifi miễn phí, được
              thiết kế trang nhã theo phong cách hiện đại tươi mới.
            </p>
            <p>
              Phòng tắm lát đá cẩm thạch rộng rãi có bồn ngâm sâu, bàn trang
              điểm lớn và nhà vệ sinh điện thoại.
            </p>
          </div>
        </div>
      </div>

      <hr></hr>

      <div>
        <h2 className="mt-3 mb-4 text-center">FACILITIES</h2>
        <div className="d-flex justify-content-center align-items-center ">
          <div>
            <img
              src="https://www.lottehotel.com/content/dam/lotte-hotel/lotte/saigon/main/20180919-01-2000-mai-Ltho.jpg.thumb.768.768.jpg"
              style={{ width: '480px' }}
              alt="rom1"
            ></img>{' '}
          </div>
          <div className="m-5">
            <h4>Tiện nghi</h4>
            <p>Khu vực thư giãn lý tưởng</p>
            <p>Khu vực hồ bơi lý tưởng ngoài trời</p>
            <p>
              Trung tâm thể hình với không gian rộng và được trang bị các thiết
              bị hiện đại
            </p>
            <p>
              Dịch vụ spa thư giãn cùng đội ngũ nhân viên chuyên nghiệp tại
              Legend Healing Spa
            </p>
          </div>
        </div>
      </div>
      <hr></hr>

      <div>
        <h2 className="mt-3 mb-4 text-center">DINING</h2>
        <div className="d-flex justify-content-center align-items-center ">
          <div>
            <img
              src="https://www.lottehotel.com/content/dam/lotte-hotel/lotte/saigon/dining/restaurant/the-canvas/4651-2-2000-din-LTHO.jpg.thumb.768.768.jpg"
              style={{ width: '488px' }}
              alt="rom1"
            ></img>{' '}
          </div>
          <div className="m-5">
            <h4>Nhà hàng</h4>
            <p>Khu vực thư giãn lý tưởng</p>
            <p>Phục vụ đa dạng phong cách ẩm thực</p>
            <p>Tiệc tự chọn tại Nhà hàng The Canvas</p>
            <p>Legend Lounge & Delica-Hans(Ẩm thực Châu Á)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
