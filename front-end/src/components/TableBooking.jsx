import React, { useEffect, useState } from 'react'
import api from '../utils/axiosConfig';
function TableBooking({ endPoint }) {
    const [listBooking, setListBooking] = useState([]);

    const fetchBooking = async () => {
        try {
            const s = await api.get(`/api/booking/${endPoint}`);
            setListBooking(s.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, [endPoint]);

    console.log(listBooking);

    return (
        <div className='row m-0'>
            <div className='col-12 mt-28'>
                <table className="min-w-full bg-gray-800 text-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-center">
                                STT
                            </th>
                            <th className="px-6 py-3 text-center">
                                Tên người đặt
                            </th>
                            <th className="px-6 py-3 text-center">
                                Thời gian
                            </th>
                            <th className="px-6 py-3 text-center">
                                Date
                            </th>
                            <th className="px-6 py-3 text-center">
                                Giá tiền
                            </th>
                            <th className="px-6 py-3 text-center">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBooking.map((l, index) =>
                        (<tr key={index} className='text-center'>
                            <td>
                                {index+1}
                            </td>
                            <td>
                                {l.username}
                            </td>
                            <td>
                                {l.createdAt}
                            </td>
                            <td>
                                {l.createdAt}
                            </td>
                            <td>
                                {l.price}
                            </td>
                            <td>
                                {l.bookingStatus}
                            </td>
                            <td>
                                <button className='btn btn-success'>Accept</button>
                            </td>
                        </tr>)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableBooking