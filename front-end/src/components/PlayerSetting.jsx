import React, { useState } from 'react';

export default function PlayerSetting() {
  const [albumArt, setAlbumArt] = useState(null);
  const [introduction, setIntroduction] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAlbumArt(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    // Add logic to handle update here
    console.log('Album art:', albumArt);
    console.log('Introduction:', introduction);
  };

  return (
    <>
      <h1 className="text-white">Trình phát album</h1>
      <div className="mt-4">
        <div className="mb-4">
          {albumArt ? (
            <img
              src={albumArt}
              alt="Album Art"
              className="w-48 h-48 rounded-lg border-2 border-gray-300"
            />
          ) : (
            <div className="w-48 h-48 rounded-lg border-2 border-gray-300 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block text-sm text-gray-500 mb-4"
        />
      </div>
      <h1 className="text-white">Giới thiệu chi tiết về bạn</h1>
      <textarea
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        className="w-full h-48 px-4 py-2 mb-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Nhập giới thiệu chi tiết về bạn..."
      ></textarea>
      <button
        onClick={handleUpdate}
        className="bg-[#7b47ff] text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Cập nhật
      </button>
    </>
  );
}
