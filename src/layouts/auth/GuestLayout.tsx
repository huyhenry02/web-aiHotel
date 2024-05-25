import DefaultLayout from '../defaultLayout/DefaultLayout';
import { Outlet } from 'react-router';
import React from 'react';

const GuestLayout = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default GuestLayout;
