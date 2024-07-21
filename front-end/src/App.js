import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInformation, userInfor } from './features/userSlice';
import { setAccessToken } from './features/accessTokenSlice'
import { setRefreshToken } from './features/refreshTokenSlice'
import route from './routes/Routes';
import './App.css';
import ChatBox from './components/Chat/ChatBox';
import { SocketProvider } from './context/SocketContext';
import { adminInfor, setAdminInfo } from './features/adminInfoSlice';
import { setAccessTokenAdmin } from './features/accessTokenAdminSlice';
import { setRefreshTokenAdmin } from './features/refreshTokenAdminSlice';
import NavHomePage from './pages/NavHomePage';
function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfor);
  const adminInfo = useSelector(adminInfor)
  useEffect(() => {
    const autoLogin = async () => {
      try {
        if (userInfo === null) {
          const autoLogin = await axios.get('http://localhost:3008/api/user/autologin', {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          dispatch(setUserInformation(autoLogin.data.user))
          dispatch(setAccessToken(autoLogin.data.accessToken))
          dispatch(setRefreshToken(autoLogin.data.refreshToken))
        }
        else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    const autoLoginAdmin = async () => {
      try {
        if (adminInfo === null) {
          const autoLogin = await axios.get('http://localhost:3008/api/user/autologin/admin', {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          dispatch(setAdminInfo(autoLogin.data.user))
          dispatch(setAccessTokenAdmin(autoLogin.data.accessToken))
          dispatch(setRefreshTokenAdmin(autoLogin.data.refreshToken))
        }
        else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    autoLogin();
    autoLoginAdmin();
  }, []);
  return (
    <div className="App">
      <SocketProvider user={userInfo} admin={adminInfo}>
        <BrowserRouter>
          <MainRoutes userInfo={userInfo} adminInfo={adminInfo} />
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
}


function MainRoutes({ userInfo, adminInfo }) {
  const location = useLocation();
  const hideSidebarPaths = ['/login', '/register', '/admin'];
  let shouldHideSidebar = false;
  const nav = useNavigate();
  for (let i = 0; i < hideSidebarPaths.length; i++) {
    if (location.pathname.includes(hideSidebarPaths[i])) {
      shouldHideSidebar = true;
      break;
    }
  }
  useEffect(() => {
    if (!adminInfo && location.pathname.includes("/admin")) {
      nav("/play-together/admin/login");
    } else if (location.pathname.includes("/admin")) {
      nav("/play-together/admin/users")
    }
  }, [adminInfo]);
  return (
    <>
      <Routes>
        <Route path='/' element={<NavHomePage />}></Route>
        {route.routes.map((route) => (
          <Route
            key={route.path}
            path={`/play-together${route.path}`}
            element={<route.element />}
          />
        ))}
      </Routes>
      {!shouldHideSidebar && userInfo !== null && <ChatBox />}
    </>
  );
}
export default App;
