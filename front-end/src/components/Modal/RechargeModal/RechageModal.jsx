import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import QrModal from './QRModal';

const RechargeModal = ({ show, handleClose}) => {
    const [showQR, setShowQR] = useState(false);
    const [amount, setAmount] = useState(0);
    const [amountShow, setAmountShow] = useState('');
    const [disableDeposit, setDisableDeposit] = useState(true);
    const handleShowQR = () => setShowQR(true);
    console.log(amount);
    useEffect(() => {
        setDisableDeposit(parseFloat(amount) < 10000);
    }, [amount]);

    const handleClickDeposit = () => {
        handleShowQR();
        handleClose();
    };

    const handleChange = (e) => {
        // Remove non-numeric characters except periods and commas
        const value = e.target.value.replace(/[^\d.]/g, '');
        if (value === '') {
            setAmount(0);
            setAmountShow('');
        } else {
            setAmount(parseFloat(value));
            setAmountShow(parseFloat(value).toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 3,
            }));
        }
    };


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: "#13131a", borderBottomColor: "#3d3d43" }}>
                    <Modal.Title>Nạp tiền vào Play Together</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-bgSecondary'>
                    <Form className='my-3'>
                        <Form.Group controlId="amount">
                            <Form.Label className='text-white font-semibold'>Nhập số tiền cần nạp:</Form.Label>
                            <Form.Control
                                placeholder='Nhập số tiền muốn nạp'
                                className="bg-gray-700 numberMoney"
                                type="text"
                                value={amountShow}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#13131a", borderTopColor: "#3d3d43" }}>
                    <Button variant="secondary" style={{ fontWeight: "600" }} onClick={handleClose} >
                        Huỷ
                    </Button>
                    <Button className='border-0' style={{ backgroundColor: "#8d68f2", fontWeight: "600" }} onClick={handleClickDeposit} disabled={disableDeposit}>
                        Nạp tiền
                    </Button>
                </Modal.Footer>
            </Modal>
            <QrModal show={showQR} setShow={setShowQR} total={amount}/>
        </>
    );
};

export default RechargeModal;
