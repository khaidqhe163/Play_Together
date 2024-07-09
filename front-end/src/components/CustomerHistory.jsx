import React, { useEffect, useState } from 'react';
import api from '../utils/axiosConfig'
import { formatDate } from '../utils/service'
import '../css/CustomSpinner.css'

export default function CustomerHistory() {
  const [transactions, setTransactions] = useState([]);
  const [flg, setFlg] = useState(false);
  const fetchData = async () => {
    try {
      const response = await api.get('http://localhost:3008/api/transaction');
      setTransactions(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getStatusDetails = (status, money) => {
    switch (status) {
      case 0:
        return { type: 'Nạp tiền', money: `+${money.toLocaleString('vi-VN')}` };
      case 1:
        return { type: 'Đã donate', money: `-${money.toLocaleString('vi-VN')}` };
      case 2:
        return { type: 'Được donate', money: `+${money.toLocaleString('vi-VN')}` };
      case 3:
        return { type: 'Đã thuê', money: `-${money.toLocaleString('vi-VN')}` };
      case 4:
        return { type: 'Được thuê', money: `+${money.toLocaleString('vi-VN')}` };
      default:
        return { type: 'Unknown', money: money.toLocaleString('vi-VN') };
    }
  };


  return (
    <>
      <h1 className="text-white">Lịch sử giao dịch</h1>
      {transactions.length !== 0 ? <div className="mt-4">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Tên người chơi</th>
              <th className="px-6 py-3 text-left">Kiểu giao dịch</th>
              <th className="px-6 py-3 text-left">Số tiền (VNĐ)</th>
              <th className="px-6 py-3 text-left">Ngày giao dịch</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              const { type, money } = getStatusDetails(transaction.status, transaction.money);
              return (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                  <td className="px-6 py-4">{transaction.userName}</td>
                  <td className="px-6 py-4">{type}</td>
                  <td className={`px-6 py-4 ${(transaction.status === 1 || transaction.status === 3) ? `text-red-500` : `text-green-500`}`}>{money} VNĐ</td>
                  <td className="px-6 py-4">{formatDate(transaction.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div class="d-flex justify-content-center">
          <div class="spinner-border custom-spinner" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

      </div> : <h4 className='text-white fw-normal text-center mt-28'>Hiện không có dữ liệu!</h4>}
    </>
  );
}
