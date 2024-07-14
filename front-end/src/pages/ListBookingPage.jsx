import React, { useEffect, useState } from 'react'
import DefaultNavbar from '../layouts/DefaultNavbar'
import { Col, Row } from 'react-bootstrap';
import TableBooking from '../components/TableBooking';
import { useSelector } from 'react-redux';
import { userInfor } from '../features/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { refreshToken } from '../features/refreshTokenSlice';
import { accessToken } from '../features/accessTokenSlice';



function ListBookingPage() {
  const userInfo = useSelector(userInfor);
  const { url } = useParams();
  const refresh = useSelector(refreshToken);
  const access = useSelector(accessToken);
  const nav = useNavigate();

  const handleClick = (number) => {
    nav('/list-booking/' + number);
  };

  return (
    <DefaultNavbar>
      <Row>
        <Col md={12} id='snav'>
          <div className={url === 'my-booking' ? 'snav-active' : ''}
            onClick={() => handleClick('my-booking')}>Lịch của tôi đã đặt</div>
          <div className={url === 'booking-online' ? 'snav-active' : ''}
            onClick={() => handleClick('booking-online')}>Lịch online</div>
          <div className={url === 'booking-schedule' ? 'snav-active' : ''}
            onClick={() => handleClick('booking-schedule')}>Lịch schedule</div>
        </Col>
        <TableBooking endPoint={url} />
      </Row>
    </DefaultNavbar>
  );
}

export default ListBookingPage;