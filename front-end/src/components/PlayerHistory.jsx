import React, { useEffect, useState } from 'react';
import api from '../utils/axiosConfig';
import { formatDate } from '../utils/service';
import { format, startOfWeek, addDays } from 'date-fns';
import LoadingSpinner from './LoadingSpinner';


export default function PlayerHistory() {

  const [listBooking, setListBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await api.get('http://localhost:3008/api/booking/booking-success');
      setListBooking(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const formatHours = (hour) => {
    if (hour < 1) {
      return `${hour * 60} phút`;
    } else if (hour == 1) {
      return `${hour} tiếng`;
    } else {
      const frag = hour - Math.floor(hour);
      return `${Math.floor(hour)} tiếng ${frag * 60} phút`
    }
  };

  return (
    <>
     <h1 className="text-white">Lịch sử nhận Duo</h1>
      {loading ? <LoadingSpinner/> : <>
        {
          listBooking.length !== 0 ? <div className="mt-4">
              <table className="min-w-full bg-gray-800 text-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left">Tên khách hàng</th>
                    <th className="px-6 py-3 text-left">Số giờ thuê</th>
                    <th className="px-6 py-3 text-left">Số tiền</th>
                    <th className="px-6 py-3 text-left">Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {listBooking.map((l, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                      <td className="px-6 py-4">{l.userName}</td>
                      <td className="px-6 py-4">{formatHours(l.totalHiredHour)}</td>
                      <td className="px-6 py-4">{l.price.toLocaleString("vi-VN")} VNĐ</td>
                      <td className="px-6 py-4">{format(new Date(l.createdAt), "dd-MM-yyyy")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> : <h4 className='text-white fw-normal text-center mt-28'>Hiện không có dữ liệu!</h4>
        }
      </>}

    </>
    
  );
}
