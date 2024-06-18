import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Offcanvas, Row, Stack } from 'react-bootstrap';
import '../css/canvas-hire.css';
import { GrLinkNext, GrSubtractCircle, GrAddCircle } from 'react-icons/gr';
import { baseUrl } from "../utils/service.js";
import { useSelector } from "react-redux";
import { userInfor } from "../features/userSlice";

export default function CanvasHire({ showHire, handleClose, player }) {
    const userInfo = useSelector(userInfor);

    // Initialize state
    const [bookingDetails, setBookingDetails] = useState({
        userId: userInfo?._id || '',
        playerId: player?._id || '',
        price: 0,
        hours: [],
        unit: 1,
        bookingStatus: false
    });

    // Effect to calculate price whenever unit changes
    useEffect(() => {
        setBookingDetails((prevDetails) => ({
            ...prevDetails,
            price: (player?.player?.rentCost || 0) * prevDetails.unit
        }));
    }, [player, bookingDetails.unit]);

    // Handle unit change
    const handleUnitChange = (newUnit) => {
        setBookingDetails((prevDetails) => ({
            ...prevDetails,
            unit: newUnit
        }));
    };

    console.log(bookingDetails);

    const handleConfirm = () => {

    };
    return (
        <Offcanvas show={showHire} onHide={handleClose} placement='end'>
            <Offcanvas.Body>
                <Container fluid className='hire-screen'>
                    <div className='row'>
                        <div className='col-md-12 p-20'>
                            <div className='row mb-16'>
                                <div className='col-md-12 d-flex items-center'>
                                    <button className='' onClick={handleClose} id="btn-back1"><GrLinkNext /></button>
                                    <h2 className='text-white'>Xác nhận thuê</h2>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <img src={baseUrl + player?.avatar} className='w-full h-80 object-cover object-center rounded-md' alt="#" />
                                </div>
                                <div className='col-md-8'>
                                    {/* <table className='text-white fw-medium w-5/6 mx-auto'>
                                        <tbody className='tbhire'>
                                            <tr><td>Tên player:</td><td>{player?.username}</td></tr>
                                            <tr><td>Chi phí:</td><td>{(player?.player?.rentCost || 0).toLocaleString('en-US', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 3,
                                            })} đ/phút</td></tr>
                                            <tr><td>Thời gian muốn thuê:</td><td className='text-center'>
                                                <div className='d-flex align-items-center'>
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
                                                        style={{ width: "30%", height: "24px" }}
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
                                            <tr><td>Số dư hiện tại:</td><td>{userInfo?.accountBalance.toLocaleString('en-US', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 3,
                                            })} đ</td></tr>
                                        </tbody>
                                    </table> */}
                                    <table className='text-white fw-medium w-5/6 mx-auto styled-table'>
                                        <tbody className='tbhire'>
                                            <tr><td className='td-label'>Tên player:</td><td className='td-value'>{player?.username}</td></tr>
                                            <tr><td className='td-label'>Chi phí:</td><td className='td-value'>{(player?.player?.rentCost || 0).toLocaleString('en-US', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 3,
                                            })} đ/phút</td></tr>
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
                                    <button className='btn btn-danger btn-lg w-20 mt-2' onClick={handleClose}>Huỷ</button>
                                    <button className='btn btn-success btn-lg w-32 mt-2 mx-2' onClick={handleConfirm}>Xác nhận</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Container>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
