import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInformation, userInfor } from "../features/userSlice";
import axios from '../utils/axiosConfig'; // Ensure you have the correct axios instance
import { toast } from "react-toastify";

export default function PlayerSettingDuo() {
  const [isDuoEnabled, setIsDuoEnabled] = useState(false);
  const userInfo = useSelector(userInfor);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo && userInfo.player && userInfo.player.duoSettings) {
      setIsDuoEnabled(userInfo.player.duoSettings);
    }
  }, [userInfo]);

  const toggleDuo = () => {
    setIsDuoEnabled(!isDuoEnabled);
  };

  const handleUpdate = async () => {
    try {
      if (!userInfo.player || !userInfo.player.serviceType || userInfo?.player.serviceType.length === 0 || !userInfo.player.rentCost || userInfo?.player?.rentCost === 0) {
        toast("Vui lòng thêm thông tin player trước khi bật!")
        setIsDuoEnabled(false);
        return;
      }
      const response = await axios.put('/api/user/update-duo-setting', { isDuoEnabled });
      dispatch(setUserInformation(response.data));
      toast("Cập nhật thành công")
    } catch (error) {
      console.error('Error updating Duo setting:', error);
    }
  };
  console.log(userInfo);
  return (
    <>
      <h1 className="text-white">Cài đặt Duo</h1>
      <div className="mt-4 flex items-center">
        <h4 className="text-white mb-2 mr-4">Bạn muốn nhận yêu cầu thuê Duo:</h4>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDuoEnabled}
            onChange={toggleDuo}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {isDuoEnabled ? "Bật" : "Tắt"}
          </span>
        </label>
      </div>
      <div className="mt-4">
        <button
          onClick={handleUpdate}
          className="bg-[#7b47ff] text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cập nhật
        </button>
      </div>
    </>
  );
}
