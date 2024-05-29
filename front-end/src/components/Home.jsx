import React from 'react'
import axios from 'axios';
import { setRefreshToken, refreshToken } from '../features/refreshTokenSlice'
import { useSelector } from 'react-redux';
function Home() {
    const refreshTokenRedux = useSelector(refreshToken);
    const handleRefreshToken = async () => {
        try {
          const accessToken = await axios.get('http://localhost:3008/api/user/refresh-token', {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data', 'authorization': `Bearer ${refreshTokenRedux}`},
          });
          console.log(accessToken.data);
        } catch (error) {
          console.log(error);
        }
      }
    
    return (
        <button onClick={handleRefreshToken}>Click</button>
    )
}

export default Home
