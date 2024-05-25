import React from 'react';
import { useRoutes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import NonAuthorizedLayout from '../layouts/auth/NonAuthorizedLayout';
import Home from '../pages/Home/Home';
import { authorizedRoutes } from './routerData';
import AuthorizedLayout from '../layouts/auth/AuthorizedLayout';
import GuestLayout from '../layouts/auth/GuestLayout';
import AdminLayout from '../layouts/auth/AdminLayout';
import NotFound404 from '../pages/404/NotFound404';
import ManageHotel from '../pages/Admin/ManageHotel/ManageHotel';
import SendEmail from '../pages/Auth/SendEmail';
import ResetPassword from '../pages/Auth/ResetPassword';
import Hotel from '../pages/Hotel/Hotel';
import HotelDetail from '../pages/Hotel/HotelDetail';
import ManageUser from '../pages/Admin/ManageUser/ManageUser';
import ManageReservation from '../pages/Admin/ManageReservation/ManageReservation';
import ManageRoom from '../pages/Admin/ManageRoom/ManageRoom';
import ManageService from '../pages/Admin/ManageService/ManageService';
import ManageReservationDetail from '../pages/Admin/ManageReservation/ManageReservationDetail';
import ManageInvoice from '../pages/Admin/ManageInvoice/ManageInvoice';
import AboutUs from '../layouts/components/aboutUs/AboutUs';
import ManageStatistical from '../pages/Admin/ManageStatistical/ManageStatistical';
import ManageReview from '../pages/Admin/ManageReview/ManageReview';
import ManageListRoomEmpty from '../pages/Admin/ManageListRoomEmpty/ManageListRoomEmpty';

const Router = () => {
  return useRoutes([
    {
      element: <GuestLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/hotel/:hotel_id',
          element: <HotelDetail />,
        },
        {
          path: '/404',
          element: <NotFound404 />,
        },
        {
          path: '/hotel',
          element: <Hotel />,
        },
        {
          path: '/aboutUs',
          element: <AboutUs />,
        },
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        {
          path: '/manage-hotel',
          element: <ManageHotel />,
        },
        {
          path: '/manage-user',
          element: <ManageUser />,
        },
        {
          path: '/manage-reservation',
          element: <ManageReservation />,
        },
        {
          path: '/manage-room',
          element: <ManageRoom />,
        },
        {
          path: '/manage-service',
          element: <ManageService />,
        },
        {
          path: '/manage-reservation/:reservation_id',
          element: <ManageReservationDetail />,
        },
        {
          path: '/manage-invoice',
          element: <ManageInvoice />,
        },
        {
          path: '/manage-statistical',
          element: <ManageStatistical />,
        },
        {
          path: '/manage-review',
          element: <ManageReview />,
        },
        {
          path: '/manage-list-room-empty',
          element: <ManageListRoomEmpty />,
        },
      ],
    },
    {
      element: <NonAuthorizedLayout />,
      children: [
        {
          path: '/sendEmail',
          element: <SendEmail />,
        },
        {
          path: '/reset-password',
          element: <ResetPassword />,
        },
      ],
    },
    {
      element: <AuthorizedLayout />,
      children: authorizedRoutes,
    },
  ]);
};

export default Router;
