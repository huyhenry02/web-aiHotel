import './Banner.scss';
import React from 'react';

import banner1 from '../../../img/banner1.png';
import banner2 from '../../../img/banner2.png';
import banner3 from '../../../img/banner3.png';
import banner4 from '../../../img/banner4.png';

const Banner = () => {
  return (
    <div className="banner ">
      <div className="banner_img">
        <div>
          <img src={banner1} alt="banner1" />
        </div>
        <div>
          <img src={banner2} alt="banner2" />
        </div>
        <div>
          <img src={banner3} alt="banner3" />
        </div>
        <div>
          <img src={banner4} alt="banner4" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
