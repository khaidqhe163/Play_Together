import React, { useEffect, useState } from 'react';
import { Column } from '@antv/g2plot';
import { groupBy } from '@antv/util';
import insertCss from 'insert-css';
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import axios from 'axios';
import dayjs from 'dayjs';
import { Col, Row } from 'antd';
import { DashboardContainer } from './styled';
import { AccountBookOutlined, UserAddOutlined } from '@ant-design/icons'
import { formatMoney } from '../../../utils/service';


const Dashboard = () => {
  const [payments, setPayments] = useState([]);
  const [donations, setDonations] = useState([]);
  const [booking, setBooking] = useState([]);

  const [currentTotalPayment, setCurrentTotalPayment] = useState(0);
  const [currentTotalDonate, setCurrentTotalDonate] = useState(0);
  const [currentTotalBooking, setCurrentTotalBooking] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  let currentMonth = dayjs().format('MMMM')

  const getAllPayment = async () => {
    try {
      const res = await axios.post('http://localhost:3008/api/payment/getAll');
      if (res?.data) {
        setPayments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDonations = async () => {
    try {
      const res = await axios.post('http://localhost:3008/api/donate/getAll');
      if (res?.data) {
        setDonations(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBooking = async () => {
    try {
      const res = await axios.post('http://localhost:3008/api/booking/getAll');
      if (res?.data) {
        setBooking(res.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUser = async () => {
    try {
      const res = await axios.post('http://localhost:3008/api/user/getAll');
      const totalUsers = res?.data
        .filter(item => 
          dayjs(item?.createdAt).format('MMMM') === currentMonth 
        )
        setTotalUser(totalUsers)
      
    } catch (error) {
      console.log(error);
    }
  };

  console.log("user", totalUser);


  useEffect(() => {
    getAllPayment();
    getAllDonations();
    getAllBooking();
    getAllUser()
  }, []);

  useEffect(() => {
    insertCss(`
      #container {
        display: flex;
        justify-content: space-between; /* Đảm bảo khoảng cách giữa các biểu đồ */
        padding: 8px;
      }
      #container1, #container2 {
        flex: 1;
        margin: 0 8px; /* Đảm bảo khoảng cách giữa các container */
      }
    `);
    initContainer();

    if (payments.length > 0 && donations.length > 0) {
      const transformData = (data, type) => {
        const groupedData = groupBy(data, item => dayjs(item.createdAt).format('MMMM'));
        return Object.keys(groupedData).map(month => ({
          date: month,
          type,
          value: groupedData[month].reduce((acc, curr) => acc + curr.money, 0)
        }));
      };

      const paymentData = transformData(payments, 'Payment');
      const donationData = transformData(donations, 'Donation');

      const data = [...paymentData, ...donationData];

      const column = new Column('container1', {
        data,
        xField: 'date',
        yField: 'value',
        seriesField: 'type',
        isGroup: true,
        legend: false,
        columnStyle: {
          radius: [4, 4, 0, 0],
        },
      });

      const totalDonate = donations
        .filter(item => dayjs(item?.createdAt).format('MMMM') === currentMonth)
        .reduce((acc, curr) => acc + curr?.money, 0);
      setCurrentTotalDonate(totalDonate);
      const totalPayment = payments
        .filter(item => dayjs(item?.createdAt).format('MMMM') === currentMonth)
        .reduce((acc, curr) => acc + curr?.money, 0);
      setCurrentTotalPayment(totalPayment);

      column.render();
    }

    if (booking.length > 0) {
      const transformData = (data, type) => {
        const groupedData = groupBy(data, item => dayjs(item.createdAt).format('MMMM'));
        return Object.keys(groupedData).map(month => ({
          date: month,
          type,
          value: groupedData[month].reduce((acc, curr) => acc + curr.price, 0)
        }));
      };

      const bookings = transformData(booking, 'Booking');

      const data = [ ...bookings ];

      const column = new Column('container2', {
        data,
        xField: 'date',
        yField: 'value',
        seriesField: 'type',
        isGroup: true,
        legend: false,
        columnStyle: {
          radius: [4, 4, 0, 0],
        },
      });

      const totalBooking = booking
        .filter(item => 
          dayjs(item?.createdAt).format('MMMM') === currentMonth 
          && (item?.bookingStatus === 1 || item?.bookingStatus === 3 || item?.bookingStatus === 4)
        )
        .reduce((acc, curr) => acc + curr?.price, 0);
      setCurrentTotalBooking(totalBooking);

      column.render();
    }
  }, [payments, donations, booking, currentMonth]);
  
  const initContainer = () => {
    const container = document.getElementById('container');
    if (container) {
      container.innerHTML = `
        <div id="container1"></div>
        <div id="container2"></div>
      `;
    }
  };


  return (
    <LayoutAdmin>
      <DashboardContainer>
        <div className='mb-40 m-10'>
          <div className='title'>
            <h6>Thông số trong tháng</h6>
          </div>
          <div className='card'>
            <Row gutter={[16, 24]}>
              <Col span={6} style={{ padding: '0 8px' }}>
                <div className='card-item item1'>
                  <div className='left-side'>
                    <div className='money'> <p className='m-0'> {formatMoney(currentTotalBooking)} </p> </div>
                    <div className='name'> <p>Tổng tiền booking</p> </div>
                  </div>
                  <div className='right-side'>
                    <div className='icon'>
                      <AccountBookOutlined style={{color: 'blue', fontSize: '25px', fontWeight: '700'}}/>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={6} style={{ padding: '0 8px' }}>
                <div className='card-item'>
                  <div className='card-item'>
                    <div className='left-side'>
                      <div className='money'> <p className='m-0'> {formatMoney(currentTotalDonate)} </p> </div>
                      <div className='name'> <p>Tổng tiền donate</p> </div>
                    </div>
                    <div className='right-side'>
                      <div className='icon'>
                        <AccountBookOutlined style={{color: 'blue', fontSize: '25px', fontWeight: '700'}}/>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={6} style={{ padding: '0 8px' }}>
                <div className='card-item'>
                  <div className='left-side'>
                    <div className='money'> <p className='m-0'> {formatMoney(currentTotalPayment)} </p> </div>
                    <div className='name'> <p>Tổng tiền người dùng nạp</p> </div>
                  </div>
                  <div className='right-side'>
                    <div className='icon'>
                      <AccountBookOutlined style={{color: 'blue', fontSize: '25px', fontWeight: '700'}}/>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={6} style={{ padding: '0 8px' }}>
                <div className='card-item item2'>
                  <div className='left-side'>
                    <div className='money'> <p className='m-0'> {totalUser.length} Người </p> </div>
                    <div className='name'> <p>Tổng số người đăng ký</p> </div>
                  </div>
                  <div className='right-side'>
                    <div className='icon'>
                      <UserAddOutlined  style={{color: 'blue', fontSize: '25px', fontWeight: '700'}}/>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div>
          <div className='title mb-20'>
            <h6> Biểu đồ theo dõi dòng tiền hàng tháng </h6>
          </div>
          <div id="container"></div>
        </div>
      </DashboardContainer>
    </LayoutAdmin>
  );
};

export default Dashboard;
