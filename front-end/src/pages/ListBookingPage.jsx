import React, { useEffect, useState } from 'react'
import DefaultNavbar from '../layouts/DefaultNavbar'
import { Col, Row } from 'react-bootstrap';
import TableBooking from '../components/TableBooking';
import { useSelector } from 'react-redux';
import { userInfor } from '../features/userSlice';
import { useNavigate, useParams } from 'react-router-dom';

function ListBookingPage() {
  const userInfo = useSelector(userInfor);
  const [subnav, setSubnav] = useState(2);
  const { url } = useParams();
  const nav = useNavigate();
  const [endpoint, setEndpoint] = useState('booking-online');

  const handleClick = (number) => {
    setSubnav(number);
  };

  useEffect(() => {
    const getEndpoint = (subnav) => {
      switch (subnav) {
        case 1:
          return 'my-booking';
        case 2:
          return 'booking-online';
        case 3:
          return 'booking-schedule';
        default:
          return '';
      }
    };
    const newEndpoint = getEndpoint(subnav);
    setEndpoint(newEndpoint);
    nav(`/list-booking/${newEndpoint}`);
  }, [subnav, nav]);

  return (
    <DefaultNavbar>
      <Row>
        <Col md={12} id='snav'>
          <div className={subnav === 1 ? 'snav-active' : ''}
            onClick={() => handleClick(1)}>Lịch của tôi đã đặt</div>
          <div className={subnav === 2 ? 'snav-active' : ''}
            onClick={() => handleClick(2)}>Lịch online</div>
          <div className={subnav === 3 ? 'snav-active' : ''}
            onClick={() => handleClick(3)}>Lịch schedule</div>
        </Col>
        <TableBooking endPoint={endpoint} />
      </Row>
    </DefaultNavbar>
  );
}

export default ListBookingPage;