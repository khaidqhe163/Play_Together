import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Thank = ({ show, handleClose }) => {
    return (
        <Modal show={show} style={{ minWidth: '100%' }}>
            <Modal.Header closeButton>
                <Modal.Title>Cảm ơn bạn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" >
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Thank;
