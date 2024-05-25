import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/slices/auth.slice';
import { RootState } from '../../redux/store';
import { Col, Row } from 'react-bootstrap';
import ListHotels from '../Hotel/ListHotels';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch({
      type: `${authActions.logoutPending}_saga`,
    });
    navigate('/');
  };

  return (
    <>
      <div>Dashboard</div>
      <button onClick={() => navigate('/home')}>Home page</button>
      <button onClick={() => navigate('/admin')}>Dashboard Admin</button>
      <button onClick={() => navigate('/profile')}>Profile page</button>
      <button onClick={() => navigate('/ws-example')}>WS Example</button>
      <button onClick={() => navigate('/stripe-example')}>
        Stripe Example
      </button>
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => navigate('/login')}>login</button>
      )}
      {/*<div className={"container-fluid"}>*/}
      {/*    <Row>*/}
      {/*        <Col md={4} style={{border: 'solid 1px #CAB39E', borderRadius: '10px'}}>*/}
      {/*            <div className={'container-fluid'}>Page support</div>*/}
      {/*        </Col>*/}
      {/*        <Col>*/}
      {/*            <ListHotels />*/}
      {/*        </Col>*/}
      {/*    </Row>*/}
      {/*</div>*/}
    </>
  );
};

export default Dashboard;
