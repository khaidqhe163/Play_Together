import React, { useState } from 'react';

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState('');
  const [gender, setGender] = useState([]);
  const [dob, setDob] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenderChange = (event) => {
    const value = event.target.value;
    setGender((prevGender) =>
      prevGender.includes(value)
        ? prevGender.filter((g) => g !== value)
        : [...prevGender, value]
    );
  };

  const handleUpdate = () => {
    console.log({
      avatar,
      user,
      gender,
      dob
    });
  };

  return (
    <>
      <h1 className="text-white">Thông tin cá nhân</h1>
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="mb-4">
          {avatar ? (
            <img
              src={avatar}
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
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>


        <div className="mb-4 w-3/4">
          <label className="block text-white">Giới tính</label>
          <div className="mt-1">
            <label className="inline-flex items-center text-white">
              <input
                type="checkbox"
                value="male"
                checked={gender.includes('male')}
                onChange={handleGenderChange}
                className="form-checkbox"
              />
              <span className="ml-2">Nam</span>
            </label>
            <label className="inline-flex items-center text-white ml-6">
              <input
                type="checkbox"
                value="female"
                checked={gender.includes('female')}
                onChange={handleGenderChange}
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
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-5 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cập nhật
        </button>
      </div>
    </>
  );
}
