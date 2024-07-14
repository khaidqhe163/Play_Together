import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/css/table_blockeduser_style.css'
import api from '../utils/axiosConfig.js';
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { updateBlockedUsers } from '../features/userSlice.js';

export default function PlayerBlockList() {

  const user = useSelector((state) => state.user?.value)
  const [dataSource, setDataSource] = useState([])
  const dispatch = useDispatch();


  const getListBlockedUser = async () => {
    try {
      const data = (await axios.get("http://localhost:3008/api/user/" + user?._id))?.data?.blockedUsers
      const fetchUsers = await Promise.all(data.map(async (i) => {
        const u = (await axios.get("http://localhost:3008/api/user/" + i))?.data
        return u
      }));
      setDataSource(fetchUsers)
    } catch (error) {
      console.log(error);
    }
  }

  const handleUnBlock = async (user) => {
    try {
      const res = await api.post('/api/user/blockOrUnBlockUser/' + user?._id)
      if (res?.isError) return
      dispatch(updateBlockedUsers({ userId: user._id, blocked: false }))
      setDataSource(prev => prev.filter(u => u._id !== user._id))
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getListBlockedUser();
  }, [user])

  return (
    <div>
      <h1 className="text-white mb-20">Danh sách chặn</h1>
      {
        dataSource.length === 0 
          ? (
            <div className='text-center text-white' style={{color: 'red', fontSize: '21px', marginTop: '50px'}}>
              Không có dữ liệu
            </div>
          ) : (
            <div className="mt-4">
              <table className="min-w-full bg-gray-800 text-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left">Tên</th>
                    <th className="px-6 py-3 text-center">Bỏ chặn</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSource.map((user, index) => (
                    <tr key={user?._id} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={() => handleUnBlock(user)}
                        >
                          Bỏ chặn
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) 
      }

      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
        transition={Bounce} /> */}
    </div>
  );
}
