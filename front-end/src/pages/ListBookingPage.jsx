import React, { useEffect, useState } from 'react'
import DefaultNavbar from '../layouts/DefaultNavbar'
import { Col, Row } from 'react-bootstrap';
import TableBooking from '../components/TableBooking';
import { useSelector } from 'react-redux';
import { userInfor } from '../features/userSlice';

function ListBookingPage() {
  const userInfo = useSelector(userInfor);
  const [subnav, setSubnav] = useState(2);
  const handleClick = (number) => {
    setSubnav(number);
  };
  const endPoint = (subnav) => {
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

  // useEffect(() => {
  //   endPoint(subnav);
  // }, [subnav]);

  return (
    <DefaultNavbar>
    
      <Row>
        <Col md={12} id='snav'>
          <div className={subnav === 1 && `snav-active`}
            onClick={() => handleClick(1)}>Lịch của tôi đã đặt</div>
          <div className={subnav === 2 && `snav-active`}
            onClick={() => handleClick(2)}>Lịch online</div>
          <div className={subnav === 3 && `snav-active`}
            onClick={() => handleClick(3)}>Lịch schedule</div>
        </Col>
        <TableBooking endPoint={endPoint(subnav)}/>
      </Row>

    </DefaultNavbar>
  )
}

export default ListBookingPage