import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { baseUrl } from '../../../utils/service';

const Thank = ({ show, handleClose, setIsPaid}) => {
    
    return (
        <Modal show={show} style={{ minWidth: '100%' }} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cảm ơn bạn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='text-center'>
                    <div className='d-flex justify-center'>
                        <img className='min-h-52' src={baseUrl + 'public\\checkmark\\check.jpg'} />
                    </div>
                    <p className='font-semibold'>Bạn đã nạp tiền thành công vào Play Together</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Thank;
