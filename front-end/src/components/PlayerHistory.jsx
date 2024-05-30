import React from 'react';

export default function PlayerHistory() {

  // Dummy data for demonstration
  const playerHistory = [
    { customerName: 'Anh 7 múi', hoursRented: 5 },
    { customerName: 'Chị Tâm', hoursRented: 8 },
    { customerName: 'Alice ', hoursRented: 3 },
    { customerName: 'Mẫn Mẫn', hoursRented: 6 },
    { customerName: 'hân', hoursRented: 7 }
  ];

  return (
    <>
      <h1 className="text-white">Lịch sử nhận Duo</h1>
      <div className="mt-4">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Tên khách hàng</th>
              <th className="px-6 py-3 text-left">Số giờ thuê</th>
            </tr>
          </thead>
          <tbody>
            {playerHistory.map((entry, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                <td className="px-6 py-4">{entry.customerName}</td>
                <td className="px-6 py-4">{entry.hoursRented} giờ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
