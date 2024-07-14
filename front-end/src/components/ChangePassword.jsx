import React, { useEffect, useState } from 'react';
import { userInfor } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../utils/axiosConfig';
export default function ChangePassword() {
  const userInfo = useSelector(userInfor);
  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setChangePassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }, [userInfo])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangePassword({
      ...changePassword,
      [name]: value,
    });
    if (name === "confirmPassword") {
      setPasswordMatch(changePassword.newPassword === value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      toast("Mật khẩu không khớp!");
    } else {
      try {
        const update = await api.put("/api/user/change-password", changePassword);
        if (update.status === 200) {
          toast(update.data.message);
          setChangePassword(prev => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }));
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          toast(error.response.data.error);
        } else {
          toast('Có lỗi trong việc đổi mật khẩu!');
        }
      }
    }
  };
  console.log(userInfo);
  return (
    <>
      <h1 className="text-white">Đổi mật khẩu</h1>
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="mb-4 w-3/4">
          <label className="block text-white">Mật khẩu cũ</label>
          <input
            type='password'
            name="currentPassword"
            value={changePassword.currentPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4 w-3/4">
          <label className="block text-white">Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            value={changePassword.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4 w-3/4">
          <label className="block text-white">Nhập lại mật khẩu mới</label>
          <input
            type="password"
            name="confirmPassword"
            value={changePassword.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {!passwordMatch && <p className="text-red-500 mb-4">Mật khẩu mới không khớp.</p>}
        <button
          onClick={handleSubmit}
          className="bg-[#7b47ff] text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Đổi mật khẩu
        </button>
      </div>
    </>
  );
}
