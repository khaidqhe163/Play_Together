import React from 'react';

export default function PlayerBlockList() {
  const blockedUsers = [
    { name: 'Dũng', reason: 'Spam', id: 1 },
    { name: 'nam', reason: 'Xấu ', id: 2 },
    { name: 'ĐẠt', reason: 'Spam', id: 3 },
    { name: 'Decao', reason: 'Spam', id: 4 },
    { name: 'J97', reason: 'Spam', id: 5 }
  ];

  const handleDelete = (id) => {
    console.log(`User with ID ${id} deleted`);
  };

  return (
    <>
      <h1 className="text-white">Danh sách chặn</h1>
      <div className="mt-4">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Tên</th>
              <th className="px-6 py-3 text-left">Lý do</th>
              <th className="px-6 py-3">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {blockedUsers.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.reason}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
