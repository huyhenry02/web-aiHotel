import React, { useEffect, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HouseIcon from '@mui/icons-material/House';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LayersIcon from '@mui/icons-material/Layers';
import ForumIcon from '@mui/icons-material/Forum';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const MenuDashboard = () => {
  const roleState = useSelector(
    (state: RootState) => state.auth.userInfo.role_type,
  );

  const [roleType, setRoleType] = useState<string | undefined>('');

  useEffect(() => {
    setRoleType(roleState);
  }, [roleState]);

  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to={'/'}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItemButton>

        {roleType === 'admin' ? (
          <ListItemButton component={Link} to={'/manage-user'}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý người dùng" />
          </ListItemButton>
        ) : (
          ''
        )}

        {roleType === 'admin' ? (
          <ListItemButton component={Link} to={'/manage-hotel'}>
            <ListItemIcon>
              <HouseIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý khách sạn" />
          </ListItemButton>
        ) : (
          ''
        )}

        <ListItemButton component={Link} to={'/manage-room'}>
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý phòng" />
        </ListItemButton>

        <ListItemButton component={Link} to={'/manage-list-room-empty'}>
          <ListItemIcon>
            <DoorBackIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý phòng trống" />
        </ListItemButton>

        <ListItemButton component={Link} to={'/manage-service'}>
          <ListItemIcon>
            <RoomServiceIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý dịch vụ" />
        </ListItemButton>

        <ListItemButton component={Link} to={'/manage-reservation'}>
          <ListItemIcon>
            <EventNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý đơn đặt phòng" />
        </ListItemButton>

        <ListItemButton component={Link} to={'/manage-invoice'}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý hóa đơn" />
        </ListItemButton>

        <ListItemButton component={Link} to={'/manage-review'}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý phản hồi" />
        </ListItemButton>

        <ListItemButton component={Link} to={'/manage-statistical'}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Thống kê" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default MenuDashboard;

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Tác vụ khác
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <HouseIcon />
      </ListItemIcon>
      <ListItemText primary="Do something 1" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Do something 2" />
    </ListItemButton>
  </React.Fragment>
);
