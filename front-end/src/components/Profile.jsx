import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfor, setUserInformation } from '../features/userSlice';
import { baseUrl } from '../utils/service';
import API from '../utils/axiosConfig';

export default function Profile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfor);

  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [file, setFile] = useState(null);
  const avatarInput = useRef();

  useEffect(() => {
    if (userInfo) {
      setAvatar(userInfo.avatar);
      setUsername(userInfo.username);
      setGender(userInfo.gender);
      setDob(new Date(userInfo.dateOfBirth).toISOString().split('T')[0]);
    }
  }, [userInfo]);

  const handleImageChange = (event) => {
    const imageChange = event.target.files[0];
    setFile(imageChange);
    if (imageChange) {
      avatarInput.current.src = URL.createObjectURL(imageChange);
    }
  };

  const handleSubmitUpdate = async () => {
    try {
      const form = new FormData();
      form.append("newAvatar", file);
      form.append("avatar", avatar);
      form.append("username", username);
      form.append("gender", gender);
      form.append("dateOfBirth", dob);

      const updateUser = await API.put('/api/user/update-profile', form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      dispatch(setUserInformation(updateUser.data));
      console.log(updateUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-white">Thông tin cá nhân</h1>
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="mb-4">
          {avatar ? (
            <img
              src={`${baseUrl}${avatar}`}
              ref={avatarInput}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 mb-4"
        />

        <div className="mb-4 w-3/4">
          <label className="block text-white">Họ và Tên</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4 w-3/4">
          <label className="block text-white">Giới tính</label>
          <div className="mt-1">
            <label className="inline-flex items-center text-white">
              <input
                type="radio"
                value="Nam"
                checked={gender === 'Nam'}
                onChange={(e) => setGender(e.target.value)}
                className="form-checkbox"
              />
              <span className="ml-2">Nam</span>
            </label>
            <label className="inline-flex items-center text-white ml-6">
              <input
                type="radio"
                value="Nữ"
                checked={gender === 'Nữ'}
                onChange={(e) => setGender(e.target.value)}
                className="form-checkbox"
              />
              <span className="ml-2">Nữ</span>
            </label>
          </div>
        </div>

        <div className="mb-4 w-3/4">
          <label className="block text-white">Ngày sinh</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          onClick={handleSubmitUpdate}
          className="bg-[#7b47ff] text-white px-5 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cập nhật
        </button>
      </div>
    </>
  );
}
