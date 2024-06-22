import React, { useEffect, useState } from 'react'
import api from '../utils/axiosConfig';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

function TableBooking({ endPoint }) {
    const [listBooking, setListBooking] = useState([]);
    const [updateBooking, setUpdateBooking] = useState(null);

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
    }, [endPoint, updateBooking]);

    const formatTime = (d) => {
        const t = new Date(d);
        let hours = t.getHours();
        let minutes = t.getMinutes();
        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}`;
    };

    const formatEndTime = (d, unit) => {
        const t = new Date(d).getTime();
        const end = t + (unit * 30 * 60 * 1000);
        const endTime = new Date(end);
        let hours = endTime.getHours();
        let minutes = endTime.getMinutes();
        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}`;
    };

    const formatStatus = (num) => {
        switch (num) {
            case 0: return <span className="text-warning">Chưa giải quyết</span>;
            case 1: return <span className="text-primary">Đang trong tiến trình</span>;
            case 2: return <span className="text-success">Đã xong</span>;
            case 3: return <span className="text-danger">Từ chối</span>;
            default: return '';
        }
    }

    const handleAccept = async (idBooking) => {
        try {
            const status = 1;
            const bookingUpdate = await api.put(`/api/booking/booking-online`, { idBooking, status });
            setUpdateBooking(bookingUpdate.data.u);
            console.log(bookingUpdate);
            toast(bookingUpdate.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeny = async (idBooking) => {
        try {
            const status = 3;
            const bookingUpdate = await api.put(`/api/booking/booking-online`, { idBooking, status });
            setUpdateBooking(bookingUpdate.data.u);
            console.log(updateBooking);
            toast(bookingUpdate.data.message);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSuccess = async (idBooking) => {
        try {
            const status = 2;
            const bookingUpdate = await api.put(`/api/booking/booking-online`, { idBooking, status });
            setUpdateBooking(bookingUpdate.data.u);
            console.log(updateBooking);
            toast(bookingUpdate.data.message);
        } catch (error) {
            console.log(error);
        }
    };


    console.log(updateBooking);

    return (
        <div className='row m-0'>
            <div className='col-12 mt-28'>
                <table className="min-w-full bg-gray-800 text-white rounded-xl">
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
                            <th className="px-6 py-3 text-center">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBooking.filter(l => (l.bookingStatus !== 2 && l.bookingStatus !== 3)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((l, index) =>
                        (<tr key={index} className='text-center'>
                            <td className='py-2'>
                                {index + 1}
                            </td>
                            <td className='py-2'>
                                {l.username}
                            </td>
                            <td className='py-2'>
                                {`${formatTime(l.createdAt)} - ${formatEndTime(l.createdAt, l.unit)}`}
                            </td>
                            <td className='py-2'>
                                {format(new Date(l.createdAt), "dd-MM-yyyy")}
                            </td>
                            <td className='py-2'>
                                {l.price}
                            </td>
                            <td className='py-2'>
                                {formatStatus(l.bookingStatus)}
                            </td>
                            <td className='py-2'>
                                {l.bookingStatus === 1 ? (<button className='btn btn-success mr-10' onClick={() => handleSuccess(l._id)}>Hoàn thành</button>)
                                    : (<><button className='btn btn-primary mr-10' onClick={() => handleAccept(l._id)}>Chấp nhận</button>
                                        <button className='btn btn-danger' onClick={() => handleDeny(l._id)}>Từ chối</button></>)
                                }

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