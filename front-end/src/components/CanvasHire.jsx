import React, { useState, useEffect, useContext } from 'react';
import { Button, Col, Container, Offcanvas, Row, Stack } from 'react-bootstrap';
import '../css/canvas-hire.css';
import { GrLinkNext, GrSubtractCircle, GrAddCircle } from 'react-icons/gr';
import { baseUrl } from "../utils/service.js";
import { useDispatch, useSelector } from "react-redux";
import { setUserInformation, userInfor } from "../features/userSlice";
import { toast } from 'react-toastify';
import api from '../utils/axiosConfig';
import { format, startOfWeek, addDays } from 'date-fns';
import { SocketContext } from '../context/SocketContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function CanvasHire({ showHire, handleClose, player, snav, setSnav, playerOnline }) {

    const today = new Date();

    const dispatch = useDispatch();

    const nav = useNavigate();

    const userInfo = useSelector(userInfor);

    const { socket } = useContext(SocketContext);
    const [bookingDetails, setBookingDetails] = useState({
        userId: userInfo?._id || '',
        playerId: '',
        price: 0,
        hours: [],
        unit: 1,
        bookingStatus: 0
    });

    const [schedule, setSchedule] = useState(format(today, 'yyyy-MM-dd'));
    const [scheduleUpdate, setScheduleUpdate] = useState([]);

    const fetchData = async (selectedDate, playerId) => {
        try {
            const s = await api.get(`/api/schedule/user?date=${selectedDate}&pid=${playerId}`);
            setScheduleUpdate(s.data);
        } catch (error) {
            console.log(error);
            // toast('Có lỗi trong việc lấy lịch!');
        }
    };
    useEffect(() => {
        if (player?._id) {
            const newPlayerId = player._id;
            if (!player.player.onlySchedule) {
                setBookingDetails((prevDetails) => ({
                    ...prevDetails,
                    playerId: player._id,
                    price: (player?.player?.rentCost || 0) * prevDetails.unit
                }));
            } else {
                setBookingDetails((prevDetails) => ({
                    ...prevDetails,
                    playerId: player._id,
                    unit: 0,
                    bookingStatus: 1,
                    price: (player?.player?.rentCost || 0) * prevDetails.hours.length
                }));
                if (newPlayerId) {
                    fetchData(schedule, newPlayerId);
                }
            }
        }
    }, [player, bookingDetails.unit, schedule, bookingDetails.hours]);

    const handleUnitChange = (newUnit) => {
        setBookingDetails((prevDetails) => ({
            ...prevDetails,
            unit: newUnit
        }));
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
            if (userInfo?.accountBalance < bookingDetails.price) return toast("Số tiền của bạn hiện không đủ để thanh toán! ❌💰");
            const s = await api.post(`/api/booking${player.player.onlySchedule ? "/by-schedule" : ''}`, bookingDetails);
            const notification = await api.post("/api/notification/booking-notification", {
                bookingId: s.data.aBooking._id,
                playerId: s.data.aBooking.playerId,
                onlySchedule: player.player.onlySchedule
            })
            socket.emit("sendNotification", notification.data)
            if (s.status === 201) {
                dispatch(setUserInformation(s.data.restUser));

                setBookingDetails((prevDetails) => ({
                    ...prevDetails,
                    hours: []
                }));
                fetchData(schedule);
                toast(s.data.message);
                setTimeout(handleClose, 2000);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                toast(error.response.data.error);
            } else if (error.response.status === 406) {
                toast(error.response.data.error);
                setTimeout(()=>{
                    nav('/play-together');
                }, 3000);
            } else {
                toast(error.toString());
            }
        }
    };

    const handleDateChange = (date) => {
        setSchedule(format(date, 'yyyy-MM-dd'));
    };

    const formatTime = (time) => {
        const hours = Math.floor(time);
        const minutes = (time - hours) * 60;
        const formattedMinutes = minutes === 0 ? `0${minutes}` : minutes;
        return `${hours}:${formattedMinutes}`;
    };

    const renderWeekButtons = () => {
        const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 }); // Week starts on Monday
        const buttons = [];

        for (let i = 0; i < 7; i++) {
            const currentDay = addDays(startOfWeekDate, i);
            const dayCurrent = currentDay.getDate();
            const dayToday = today.getDate();
            const isDisabled = dayCurrent < dayToday;
            buttons.push(
                <button
                    key={i}
                    type="button"
                    className={`btn btn-outline-light mx-1 my-1 ${schedule === format(currentDay, 'yyyy-MM-dd') ? 'active-date text-white' : ''}`}
                    onClick={() => handleDateChange(currentDay)}
                    disabled={isDisabled}
                >
                    {format(currentDay, 'dd-MM')}
                </button>
            );
        }

        return buttons;
    };

    const handleSlotSelection = (slotId) => {
        setBookingDetails((prevDetails) => {
            const updatedHours = prevDetails.hours.includes(slotId)
                ? prevDetails.hours.filter(id => id !== slotId)
                : [...prevDetails.hours, slotId];
            return {
                ...prevDetails,
                hours: updatedHours
            };
        });
    };

    const checkMoreThanNow = (dateSchedule, start) => {
        const date = new Date(dateSchedule).getTime();
        const dateS = new Date(today.getTime() + (7 * 60 * 60 * 1000)).getTime();
        const dateX = date + (start * 60 * 60 * 1000);

        const dateN = dateS >= dateX ? true : false;
        console.log(dateN);
        return dateN;
    };

    const renderScheduleButtons = () => {
        console.log("today", today);
        return scheduleUpdate.map(slot => {
            const slotTime = `${formatTime(slot.start)} - ${formatTime(slot.end)}`;
            const isSelected = bookingDetails.hours.includes(slot._id);
            const check = slot.bookingId;
            return (
                <div className='col-3 p-0 text-center'>
                    <button
                        key={slot._id}
                        type="button"
                        className={`btn btn-outline-light w-5/6 my-1 ${isSelected ? 'active-date text-white' : ''}`}
                        onClick={() => handleSlotSelection(slot._id)}
                        disabled={check || checkMoreThanNow(slot.date, slot.start)}
                    >
                        {slotTime}
                    </button>
                </div>
            );
        });
    };

    return (
        <Offcanvas id="off" show={showHire} onHide={handleClose} placement='end'>
            <Offcanvas.Body>
                <form onSubmit={handleConfirm} className='mt-0'>
                    <Container fluid className='hire-screen'>

                        <div className='row'>
                            <div className='col-md-12 p-20'>
                                <div className='row mb-20'>
                                    <div className='col-md-12 d-flex items-center'>
                                        <button type='button' onClick={handleClose} id="btn-back1"><GrLinkNext /></button>
                                        <h2 className='text-white'>Xác nhận thuê</h2>
                                    </div>
                                </div>
                                <Row className='mb-20'>
                                    <Col md={12} id='snav' className='bg-bgSecondary'>

                                        {player?.player?.onlySchedule ? (<div className={`snav-active`}>Đặt lịch</div>) : (<div className={`snav-active`}>Đặt trực tiếp</div>)}

                                    </Col>
                                </Row>
                                {((!player?.player?.onlySchedule && playerOnline) || (!player?.player?.onlySchedule && !playerOnline)) ? (
                                    <>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <img src={baseUrl + `public/service/socialadd.webp`} className='w-full h-auto object-cover object-center rounded-md' alt="#" />
                                            </div>
                                            <div className='col-md-8'>

                                                <table className='text-white fw-medium w-5/6 mx-auto styled-table'>
                                                    <tbody className='tbhire'>
                                                        <tr className=''><td className='td-label'>Tên player:</td><td className='td-value'>{player?.username}</td></tr>
                                                        <tr><td className='td-label'>Chi phí:</td><td className='td-value'>{(player?.player?.rentCost || 0).toLocaleString('en-US', {
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 3,
                                                        })}đ/ 30phút</td></tr>
                                                        <tr><td className='td-label'>Thời gian muốn thuê:</td><td className='td-value text-center'>
                                                            <div className='d-flex align-items-center justify-start'>
                                                                <GrSubtractCircle
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => handleUnitChange(Math.max(bookingDetails.unit - 1, 1))}
                                                                    color='#8d68f2'
                                                                    size={20}
                                                                />
                                                                <input
                                                                    onChange={(e) => handleUnitChange(Number(e.target.value))}
                                                                    type='number'
                                                                    value={bookingDetails.unit}
                                                                    style={{ width: "50px", height: "30px", margin: '0 10px' }}
                                                                    className='px-1 text-center border-0 border-bottom bg-bgMain'
                                                                    onKeyDown={(e) => {
                                                                        const value = e.target.value;
                                                                        if (e.key === '-' || (value === '' && e.key === '0')) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onFocus={(e) => e.target.classList.add('no-outline')}
                                                                    onBlur={(e) => e.target.classList.remove('no-outline')}
                                                                />
                                                                <GrAddCircle
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => handleUnitChange(bookingDetails.unit + 1)}
                                                                    color='#8d68f2'
                                                                    size={20}
                                                                />
                                                            </div>
                                                        </td></tr>
                                                        <tr><td className='td-label'>Số dư hiện tại:</td><td className='td-value'>{userInfo?.accountBalance.toLocaleString('en-US', {
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 3,
                                                        })} đ</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <hr style={{ color: "gray" }} />
                                            </div>
                                        </div>
                                        <div className='row mb-12'>
                                            <div className='col-md-8 text-textDetail'>
                                                <p className=''>Đơn vị giá</p>
                                            </div>
                                            <div className='col-md-4 text-textDetail'>
                                                <p>{bookingDetails.unit}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-8 text-white'>
                                                <h4>Thành tiền</h4>
                                            </div>
                                            <div className='col-md-4 text-white'>
                                                <h4>{bookingDetails.price.toLocaleString('en-US', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 3,
                                                })} đ</h4>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <hr style={{ color: "gray" }} />
                                            </div>
                                        </div>
                                        {!playerOnline && (<div className='row mb-12'>
                                            <div className='col-md-12 text-textDetail'>
                                                <p className='text-red-500 fw-medium'>Hiện tại {player?.username} không online. Nên không thể đặt lịch được!</p>
                                            </div>
                                        </div>)}
                                        <div className='row'>
                                            <div className='col-md-12 d-flex justify-end'>
                                                <button className='w-36 mt-2 mx-2 fw-medium cancel bg-bgSecondButton text-white px-4 py-2 rounded-xl' type='button' onClick={handleClose}>Huỷ</button>
                                                <button disabled={!playerOnline} className='w-32 mt-2 mx-2 fw-medium cancel text-white rounded-xl hover:bg-bgButtonHover' type='submit'>Xác nhận</button>
                                            </div>

                                        </div>
                                    </>
                                ) : <>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <img src={baseUrl + `public/service/socialadd.webp`} className='w-full h-auto object-cover object-center rounded-md' alt="#" />
                                        </div>
                                        <div className='col-md-8'>

                                            <table className='text-white fw-medium w-5/6 mx-auto styled-table'>
                                                <tbody className='tbhire'>
                                                    <tr className=''><td className='td-label'>Tên player:</td><td className='td-value'>{player?.username}</td></tr>
                                                    <tr><td className='td-label'>Chi phí:</td><td className='td-value'>{(player?.player?.rentCost || 0).toLocaleString('en-US', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 3,
                                                    })}đ/ 30phút</td></tr>

                                                    <tr><td className='td-label'>Số dư hiện tại:</td><td className='td-value'>{userInfo?.accountBalance.toLocaleString('en-US', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 3,
                                                    })} đ</td></tr>
                                                </tbody>
                                            </table>
                                            <div className="mb-3">
                                                <label className="form-label">Ngày duo</label>
                                                <div className="d-flex">
                                                    {renderWeekButtons()}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Danh sách giờ duo</label>
                                                <div className="d-flex row">
                                                    {renderScheduleButtons()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <hr style={{ color: "gray" }} />
                                        </div>
                                    </div>
                                    <div className='row mb-12'>
                                        <div className='col-md-8 text-textDetail'>
                                            <p className=''>Đơn vị giá</p>
                                        </div>
                                        <div className='col-md-4 text-textDetail'>
                                            <p>{bookingDetails.hours.length}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-8 text-white'>
                                            <h4>Thành tiền</h4>
                                        </div>
                                        <div className='col-md-4 text-white'>
                                            <h4>{bookingDetails.price.toLocaleString('en-US', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 3,
                                            })} đ</h4>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <hr style={{ color: "gray" }} />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-12 d-flex justify-end'>
                                            <button className='w-36 mt-2 mx-2 fw-medium cancel bg-bgSecondButton text-white px-4 py-2 rounded-xl' type='button' onClick={handleClose}>Huỷ</button>
                                            <button disabled={bookingDetails.price === 0} className='w-32 mt-2 mx-2 fw-medium cancel text-white rounded-xl hover:bg-bgButtonHover' type='submit'>Xác nhận</button>
                                        </div>

                                    </div>
                                </>}
                            </div>
                        </div>
                    </Container>
                </form>
            </Offcanvas.Body>
        </Offcanvas>
    )
}