import React, { useEffect, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { map } from 'lodash';
import { useNavigate } from 'react-router';
import CreateUserModal from '../../../layouts/components/modals/CreateUserModal';
import { ICreateUser } from '../../../redux/types/dtos/createUser';
import { manageUserActions } from '../../../redux/slices/manageUser.slice';
import { IUser } from '../../../redux/types/user';
import { IUpdateInfo } from '../../../redux/types/dtos/updateInfo';
import DeleteUserModal from '../../../layouts/components/modals/DeleteUserModal';
import TableThree from '../../../layouts/components/table/TableThree';
import Pagination from '@mui/material/Pagination';
import { IPaginateResponse } from '../../../redux/types/page';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

const typeActions = ['update', 'delete'];

const ManageUser = () => {
  const manageUserState = useSelector(
    (state: RootState) => state.manageUser.users,
  );
  const userDetailState = useSelector(
    (state: RootState) => state.manageUser.userDetail,
  );
  const metaState = useSelector(
    (state: RootState) => state.manageUser.paginate,
  );

  const dispatch = useDispatch();
  const [showCreate, setShowCreate] = useState(false);
  const [userData, setUserData] = useState<IUser[]>([]);
  const [roleType, setRoleType] = useState('customer');
  const [userDetail, setUserDetail] = useState<IUser>({});
  const [metaData, setMetaData] = useState<IPaginateResponse>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);

  const buildUserData = (data: IUser[]) => {
    const newData = data.map(c => {
      return {
        id: c.id,
        name: c.name,
        phone: c.phone,
        address: c.address,
        identification: c.identification,
        age: c.age,
        email: c.email,
      };
    });
    return newData;
  };

  useEffect(() => {
    dispatch({
      type: `${manageUserActions.getListUserPending}_saga`,
      payload: {
        per_page: 15,
        page: currentPage,
        role_type: roleType,
      },
    });
  }, [currentPage]);

  useEffect(() => {
    setMetaData(metaState);
    setUserData(buildUserData(manageUserState));
    setShowCreate(false);
  }, [manageUserState]);

  useEffect(() => {
    setUserDetail(userDetailState);
  }, [userDetailState]);

  const handleFetchDataUsers = (roleType: string) => {
    dispatch({
      type: `${manageUserActions.getListUserPending}_saga`,
      payload: {
        per_page: 3,
        page: 1,
        role_type: roleType,
      },
    });
    setRoleType(roleType);
  };

  const handleOnAction = (recordId, action) => {
    if (action === 'update') {
      dispatch({
        type: `${manageUserActions.getUserDetailPending}_saga`,
        payload: recordId,
      });
      setShowCreate(true);
    }
    if (action === 'delete') {
      dispatch({
        type: `${manageUserActions.getUserDetailPending}_saga`,
        payload: recordId,
      });
      setShowDelete(true);
    }
  };

  const handleCreateUser = (createUserData: ICreateUser) => {
    dispatch({
      type: `${manageUserActions.createUserPending}_saga`,
      payload: createUserData,
    });
  };

  const handleUpdateUser = (updateUserData: IUpdateInfo) => {
    dispatch({
      type: `${manageUserActions.updateUserPending}_saga`,
      payload: updateUserData,
    });
  };

  const confirmDelete = (recordId: number) => {
    dispatch({
      type: `${manageUserActions.deleteUserPending}_saga`,
      payload: recordId,
    });
    setShowDelete(false);
  };
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <h4 className={'d-flex align-items-center'}>
          <ArrowRightRoundedIcon /> Quản lý người dùng
        </h4>
      </Box>

      <div className={'d-flex justify-content-between mb-3'}>
        <Stack spacing={2} direction="row">
          <Button
            variant={roleType === 'customer' ? 'contained' : 'outlined'}
            onClick={() => handleFetchDataUsers('customer')}
          >
            Khách hàng
          </Button>
          <Button
            variant={roleType === 'employee' ? 'contained' : 'outlined'}
            onClick={() => handleFetchDataUsers('employee')}
          >
            Nhân viên
          </Button>
        </Stack>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => setShowCreate(true)}
          >
            Thêm
          </Button>
        </Stack>
      </div>

      <TableThree
        columns={[
          'STT',
          'Name',
          'Phone',
          'Address',
          'Identification',
          'Age',
          'Email',
          'Actions',
        ]}
        rows={userData}
        actions={map(typeActions, action => ({ type: action }))}
        onAction={handleOnAction}
      />

      <div className={'d-flex justify-content-center'}>
        <Pagination
          count={metaData.total_pages}
          shape="rounded"
          onChange={handleChangePage}
        />
      </div>

      <CreateUserModal
        isShow={showCreate}
        onClose={() => setShowCreate(false)}
        onCreateUser={handleCreateUser}
        userData={userDetail}
        onUpdateUser={handleUpdateUser}
      />

      <DeleteUserModal
        isShow={showDelete}
        onClose={() => setShowDelete(false)}
        userDelete={userDetail}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default ManageUser;
