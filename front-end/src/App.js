import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
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
function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfor);
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
    autoLogin();
  }, []);

  return (
    <div className="App">
      <SocketProvider user={userInfo}>
        <BrowserRouter>
          <MainRoutes userInfo={userInfo} />
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
}


function MainRoutes({ userInfo }) {
  const location = useLocation();
  const hideSidebarPaths = ['/login', '/register', '/admin'];
  console.log(location.pathname);
  let shouldHideSidebar = false;
  for (let i = 0; i < hideSidebarPaths.length; i++) {
    if (location.pathname.includes(hideSidebarPaths[i])) {
      shouldHideSidebar = true;
      break;
    }
  }
  // hideSidebarPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        {route.routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
      {!shouldHideSidebar && userInfo !== null && <ChatBox />}
    </>
  );
}
export default App;
