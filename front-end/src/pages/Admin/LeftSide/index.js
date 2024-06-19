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
    key: '/admin/dashboard',
    icon: <PieChartOutlined />,
    label: 'DashBoard',
  },
  {
    key: '/admin/users',
    icon: <DesktopOutlined />,
    label: 'Tài khoản',
    children: [
      {
        key: '/admin/users',
        label: 'Tất cả tài khoản',
      },
      {
        key: '/admin/users/players',
        label: 'Tài khoản đã đăng ký',
      },
      {
        key: '/admin/users/banned',
        label: 'Tài khoản đã bị ban',
      },
    ],
  },
  {
    key: '/admin/stories',
    icon: <ContainerOutlined />,
    label: 'Story',
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
        defaultSelectedKeys={['/admin/users']}
        defaultOpenKeys={['/admin/users']}
      />
    </HomeContainer>
  );
};
export default LeftSide;
