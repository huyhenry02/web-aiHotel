import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import slide1 from '../../../img/slide1.png';
import slide2 from '../../../img/slide2.png';
import sapa from '../../../img/sapa.jpg';
import tamdao from '../../../img/tamdao.jpg';
import hoian from '../../../img/hoian.jpg';
import catba from '../../../img/catba.jpg';
import coto from '../../../img/coto.jpg';
import halong from '../../../img/halong.jpg';
import { Carousel } from 'react-responsive-carousel';

import './MyCarousel.scss';

const MyCarousel: React.FC = () => {
  return (
    <div className="slide_show">
      <div className="slide_top " style={{ maxWidth: '100%' }}>
        <div style={{ maxWidth: '75%' }}>
          <Carousel
            infiniteLoop={true}
            transitionTime={2000}
            autoPlay={true}
            showThumbs={false}
            showStatus={false}
          >
            <div style={{ width: '100%' }}>
              <img style={{ width: '100%' }} src={slide1} alt="" />
            </div>
            <div style={{ width: '100%' }}>
              <img style={{ width: '100%' }} src={slide2} alt="Slide 1" />
            </div>

            <div style={{ width: '100%' }}>
              <img style={{ width: '100%' }} src={slide1} alt="" />
            </div>
            <div style={{ width: '100%' }}>
              <img style={{ width: '100%' }} src={slide2} alt="Slide 1" />
            </div>
          </Carousel>
        </div>
        <div className="slide_top_right" style={{ maxWidth: '15%' }}>
          <div>
            <img src={sapa} alt="sapa" />
          </div>
          <div>
            <img src={tamdao} alt="tamdao" />
          </div>
        </div>
      </div>
      <div className="img_bottom">
        <div>
          <img src={hoian} alt="hoian" />
        </div>
        <div>
          <img src={catba} alt="caba" />
        </div>
        <div>
          <img src={coto} alt="coto" />
        </div>
        <div>
          <img src={halong} alt="halong" />
        </div>
      </div>
    </div>
  );
};

export default MyCarousel;
