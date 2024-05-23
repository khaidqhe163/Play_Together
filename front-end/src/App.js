import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInformation, userInfor } from './features/userSlice'
import route from './routes/Routes'
function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfor);
  useEffect(() => {
    autoLogin();
  }, [])
  const autoLogin = async () => {
    try {
      if (userInfo === null) {
        const autoLogin = await axios.get('http://localhost:3008/account/autologin', {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        dispatch(setUserInformation(autoLogin.data))
      }
      else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
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
    </div>
  );
}

export default App;
