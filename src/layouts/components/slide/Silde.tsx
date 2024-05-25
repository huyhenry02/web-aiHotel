import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide1 from '../../../img/slide1.png';
import slide2 from '../../../img/slide2.png';

const Slide = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <Slider {...settings}>
      <div style={{ width: '100%' }}>
        <img style={{ width: '100%' }} src={slide1} alt="" />
      </div>
      <div style={{ width: '100%' }}>
        <img style={{ width: '100%' }} src={slide2} alt="Slide 1" />
      </div>
    </Slider>
  );
};
export default Slide;
