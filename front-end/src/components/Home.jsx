import React from 'react'
import api from '../utils/axiosConfig'
function Home() {
  const handleRefreshToken = async () => {
    try {
      const response = await api.get("/api/service/test");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={handleRefreshToken}>Click</button>
  )
}

export default Home
