import React from 'react';
import UpdateInfo from '../../layouts/components/updateInfo/UpdateInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Profile = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  return (
    <>
      <UpdateInfo userInfo={userInfo} />
    </>
  );
};

export default Profile;
