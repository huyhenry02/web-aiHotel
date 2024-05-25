import './Blog.scss';
import blog1 from '../../../img/blog1.png';
import blog2 from '../../../img/blog2.png';
import blog3 from '../../../img/blog3.png';
import blog4 from '../../../img/blog4.png';
import blog5 from '../../../img/blog5.png';
import React from 'react';

const Blog = () => {
  return (
    <div className="blog">
      <div className="container">
        <h2>Blog về khách sạn</h2>
        <div className="container_text">
          <span>
            Hãy cùng AiHotel<br></br>
            khám phá những điều thật thú vị nhé!
          </span>
        </div>
      </div>
      <div className="blog_img">
        <img src={blog1} alt="" />
        <img src={blog2} alt="" />
        <img src={blog3} alt="" />
        <img src={blog4} alt="" />
        <img src={blog5} alt="" />
      </div>
    </div>
  );
};
export default Blog;
