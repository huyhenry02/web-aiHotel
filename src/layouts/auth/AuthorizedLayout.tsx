import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import DefaultLayout from '../defaultLayout/DefaultLayout';

const NonAuthorizedLayout = () => {
  const tokenState = useSelector((state: RootState) => state.auth.token);

  if (!tokenState) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default NonAuthorizedLayout;
