import React from 'react';

export default function CustomerHistory() {
  const transactions = [
    { accountName: 'Bé Diệu', hours: 5, totalExpenditure: 50000 },
    { accountName: 'J97', hours: 8, totalExpenditure: 80000 },
    { accountName: 'Hana', hours: 3, totalExpenditure: 30000 },
    { accountName: 'Bo Trần', hours: 6, totalExpenditure: 60000 },
    { accountName: 'Tiêu Dao', hours: 7, totalExpenditure: 70000 }
  ];

  return (
    <>
      <h1 className="text-white">Lịch sử giao dịch</h1>
      <div className="mt-4">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Tên tài khoản</th>
              <th className="px-6 py-3 text-left">Số giờ (giờ)</th>
              <th className="px-6 py-3 text-left">Tổng chi tiêu (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                <td className="px-6 py-4">{transaction.accountName}</td>
                <td className="px-6 py-4">{transaction.hours} giờ</td>
                <td className="px-6 py-4">{transaction.totalExpenditure.toLocaleString('vi-VN')} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
