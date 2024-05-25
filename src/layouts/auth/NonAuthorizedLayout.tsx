import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import BlankLayout from '../blankLayout/BlankLayout';

const NonAuthorizedLayout = () => {
  const tokenState = useSelector((state: RootState) => state.auth.token);
  if (tokenState) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <BlankLayout>
      <Outlet />
    </BlankLayout>
  );
};

export default NonAuthorizedLayout;
