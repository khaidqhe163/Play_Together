import React, { useContext, useEffect, useState } from 'react';
import api from '../utils/axiosConfig';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInformation, userInfor } from '../features/userSlice';
import '../css/table-booking.css';
import { SocketContext } from '../context/SocketContext';
import ReviewModal from './Modal/ReviewModal/ReviewModal';

function TableBooking({ endPoint }) {
    const [listBooking, setListBooking] = useState([]);
    const [updateBooking, setUpdateBooking] = useState(null);

    const dispatch = useDispatch();
    const userInfo = useSelector(userInfor);
    const { socket } = useContext(SocketContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [player, setPlayer] = useState(null);
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

    useEffect(() => {
        const timer = setInterval(() => {
            listBooking.forEach(async (booking) => {

                if (booking.hours.length === 0 && booking.bookingStatus === 0 && shouldHideRow(booking.createdAt)) {

                    await handleDeleteBooking(booking._id);
                }
            });
        }, 3000);

        return () => clearInterval(timer);
    }, [listBooking]);

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
    };

    const handleAccept = async (idBooking) => {
        try {
            const status = 1;
            const bookingUpdate = await api.put(`/api/booking/booking-online`, { idBooking, status });
            console.log(bookingUpdate);
            setUpdateBooking(bookingUpdate.data.u);
            const notification = await api.post(`/api/notification/process-booking-notification`, {
                userId: bookingUpdate.data.u.userId,
                status: 1,
                bookingId: bookingUpdate.data.u._id
            })
            socket.emit("sendNotification", notification.data)
            dispatch(setUserInformation(bookingUpdate.data.restU));
            toast(bookingUpdate.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeny = async (idBooking, userId) => {
        try {
            const status = 3;
            const bookingUpdate = await api.put(`/api/booking/booking-online`, { idBooking, status });
            const notification = await api.post(`/api/notification/process-booking-notification`, {
                userId: bookingUpdate.data.u.userId,
                status: 3,
                bookingId: bookingUpdate.data.u._id
            })
            socket.emit("sendNotification", notification.data)
            setUpdateBooking(bookingUpdate.data.u);
            toast(bookingUpdate.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSuccess = async (idBooking) => {
        try {
            const status = 2;
            const bookingUpdate = await api.put(`/api/booking/booking-online`, { idBooking, status });
            const notification = await api.post(`/api/notification/complete-booking-notification`, {
                userId: bookingUpdate.data.u.userId,
                status: 3,
                bookingId: bookingUpdate.data.u._id
            })
            socket.emit("sendNotification", notification.data)
            setUpdateBooking(bookingUpdate.data.u);
            toast(bookingUpdate.data.message);
        } catch (error) {
            if (error.response.status === 400) {
                toast(error.response.data.error);
            } else {
                toast('Có lỗi trong việc chuyển trạng thái Duo!');
            }
        }
    };

    const formatTimeH = (time) => {
        const hours = Math.floor(time);
        const minutes = (time - hours) * 60;
        const formattedMinutes = minutes === 0 ? `0${minutes}` : minutes;
        return `${hours}:${formattedMinutes}`;
    };

    const shouldHideRow = (createdAt) => {
        const now = new Date().getTime();
        const createdTime = new Date(createdAt).getTime();
        return now > (createdTime + 5 * 60 * 1000);
    };

    const handleDeleteBooking = async (bookingId) => {
        try {
            const deleteBooking = await api.delete(`/api/booking/booking-online/${bookingId}`);
            setUpdateBooking(deleteBooking.data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(listBooking);
    return (
        <div className='row m-0'>
            <div className='col-12 mt-28'>
                {listBooking.length === 0 || (endPoint === 'booking-online' && listBooking.filter(l => (l.bookingStatus !== 2 && l.bookingStatus !== 3)).length === 0) ?
                    <h5 className='text-white'>Hiện tại không có lịch nào!</h5> :
                    <table className="min-w-full bg-gray-800 text-white rounded-xl stable">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-center">STT</th>
                                <th className="px-6 py-3 text-center">
                                    {endPoint === 'my-booking' ? "Tên người chơi" : "Tên người đặt"}
                                </th>
                                <th className="px-6 py-3 text-center">Thời gian</th>
                                <th className="px-6 py-3 text-center">Date</th>
                                <th className="px-6 py-3 text-center">Giá tiền</th>
                                <th className="px-6 py-3 text-center">Trạng thái</th>
                                <th className="px-6 py-3 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {endPoint !== 'my-booking' ?
                                listBooking.filter(l => (l.bookingStatus !== 2 && l.bookingStatus !== 3))
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .map((l, index) => {
                                        if (l.hours.length === 0 && shouldHideRow(l.createdAt) && l.bookingStatus === 0) return null;
                                        return (
                                            <tr key={index} className={`text-center`}>
                                                <td className='py-2'>{index + 1}</td>
                                                <td className='py-2'>{l.username}</td>
                                                <td className='py-2'>
                                                    {l.hours.length === 0 && `${formatTime(l.createdAt)} - ${formatEndTime(l.createdAt, l.unit)}`}
                                                    {l.hours.length !== 0 && l?.hours?.map((h, index) => <>{`${formatTimeH(h?.start)} - ${formatTimeH(h?.end)}`} {index === l.hours.length - 1 ? null : <br />}</>)}
                                                </td>
                                                <td className='py-2'>{format(new Date(l.createdAt), "dd-MM-yyyy")}</td>
                                                <td className='py-2'>{l.price}</td>
                                                <td className='py-2'>{formatStatus(l.bookingStatus)}</td>
                                                <td className='py-2'>
                                                    {l.bookingStatus === 1 ? (
                                                        <button className='btn btn-success' onClick={() => handleSuccess(l._id)}>Hoàn thành</button>
                                                    ) : (
                                                        <>
                                                            <button className='btn btn-primary mr-10' onClick={() => handleAccept(l._id)}>Chấp nhận</button>
                                                            <button className='btn btn-danger' onClick={() => handleDeny(l._id, l.userId)}>Từ chối</button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                :
                                listBooking.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((l, index) => {
                                    if (l.hours.length === 0 && shouldHideRow(l.createdAt) && l.bookingStatus === 0) return null;
                                    return (
                                        <tr key={index} className='text-center'>
                                            <td className='py-2'>{index + 1}</td>
                                            <td className='py-2'>{l.username}</td>
                                            <td className='py-2'>
                                                {l.hours.length === 0 && `${formatTime(l.createdAt)} - ${formatEndTime(l.createdAt, l.unit)}`}
                                                {l.hours.length !== 0 && l?.hours?.map((h, index) => <>{`${formatTimeH(h?.start)} - ${formatTimeH(h?.end)}`} {index === l.hours.length - 1 ? null : <br />}</>)}
                                            </td>
                                            <td className='py-2'>{format(new Date(l.createdAt), "dd-MM-yyyy")}</td>
                                            <td className='py-2'>{l.price}</td>
                                            <td className='py-2'>{formatStatus(l.bookingStatus)}</td>
                                            <td className='py-2'>
                                                {l.bookingStatus === 2 && l.bookingReview === null ? (
                                                    <button className='btn btn-success' onClick={() => { handleShow(); setPlayer(l) }}>Đánh giá</button>
                                                ) : null}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>}
            </div>
            <ReviewModal show={show} handleClose={handleClose} player={player} />
        </div>
    );
}

export default TableBooking;
