import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInformation, userInfor } from './features/userSlice';
import { setAccessToken } from './features/accessTokenSlice'
import { setRefreshToken } from './features/refreshTokenSlice'
import { onlineUser, setOnlineUser } from './features/onlineUserSlice';
import { socket, setSocket } from './features/socketSlice';
import route from './routes/Routes';
import './App.css';
import ChatCommunity from './components/Chat/ChatCommunity';
import { io } from 'socket.io-client'
function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfor);
  const socketRedux = useSelector(socket);
  const onlineUserRedux = useSelector(onlineUser);
  // const [socket, setSocket] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState(null);
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
          // console.log(autoLogin.data);
        }
        else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    autoLogin();
  }, [])

  useEffect(() => {
    if (userInfo !== null) {
      const newSocket = io("http://localhost:5000")
      dispatch(setSocket(newSocket))
      return () => {
        newSocket.disconnect()
      }
    }
  }, [userInfo])

  useEffect(() => {
    console.log(socketRedux);
    if (socketRedux === null) return
    socketRedux.emit("addNewUser", userInfo?._id)
    socketRedux.on("getOnlineUsers", (res) => {
      dispatch(setOnlineUser(res))
    })
  }, [socketRedux])

  console.log("onlineUser", onlineUserRedux);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            route.routes.map((route) => (
              <Route key={route.path}
                path={route.path}
                element={
                  <route.element />
                }
              />
            ))
          }
        </Routes>
      </BrowserRouter>
      <ChatCommunity />
    </div>
  );
}

export default App;
