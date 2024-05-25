import Banner from '../../layouts/components/banner/Banner';
import Blog from '../../layouts/components/blog/Blog';
import React from 'react';

import MyCarousel from '../../layouts/components/carousel/MyCarousel';
import ListHotels from '../Hotel/ListHotels';
import Hotel from '../Hotel/Hotel';

const Home = () => {
  return (
    <>
      <MyCarousel />
      <Hotel />
      <Banner />
      <Blog />
    </>
  );
};

export default Home;
