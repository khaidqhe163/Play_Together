import React, { useState } from 'react';
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { HomeContainer } from './styled';
import { useLocation, useNavigate } from "react-router-dom"


const items = [
  {
    key: '/play-together/admin/dashboard',
    icon: <PieChartOutlined />,
    label: 'DashBoard',
  },
  {
    key: 'users',
    icon: <DesktopOutlined />,
    label: 'Tài khoản',
    children: [
      {
        key: '/play-together/admin/users',
        label: 'Tất cả tài khoản',
      },
      {
        key: '/play-together/admin/users/players',
        label: 'Tài khoản đã đăng ký',
      },
      {
        key: '/play-together/admin/users/banned',
        label: 'Tài khoản đã bị ban',
      },
    ],
  },
  {
    key: 'reports',
    icon: <ContainerOutlined />,
    label: 'Báo cáo',
    children: [
      {
        key: '/play-together/admin/reports/stories',
        label: 'Video bị báo cáo',
      },
      {
        key: '/play-together/admin/reports/users',
        label: 'Người dùng bị báo cáo',
      },
      {
        key: '/play-together/admin/reports/bookings',
        label: 'Booking bị báo cáo',
      },
    ],
  },
  {
    key: '/play-together/admin/report-reason',
    icon: <ContainerOutlined />,
    label: 'Report Reason',
  },
];


const LeftSide = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleChangeMenu = (key) => {
    console.log();
    navigate(key)
  }

  return (
    <HomeContainer>
      <Menu
        style={{height: '100%', padding: '0 20px 0 20px'}}
        mode="inline"
        theme="dark"
        items={items}
        onClick={e => handleChangeMenu(e.key)}
        selectedKeys={location?.pathname}
        defaultSelectedKeys={['play-together/admin/dashboard']}
        defaultOpenKeys={['users']}
      />
    </HomeContainer>
  );
};
export default LeftSide;
