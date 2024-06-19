import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import '../../css/boxchat.css'
import { Col, Container, Offcanvas, Row, Stack } from 'react-bootstrap';
import { GrLinkNext } from 'react-icons/gr';
import { FiSearch } from 'react-icons/fi';
import ChatBoxComunity from './ChatBoxComunity';
function ChatBox() {
    const arr = [1, 2, 3, 4, 5]
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [messageType, setMessageType] = useState(1);

    return (
        <div className='message-box'>
            <div>
                <button onClick={() => setShow(true)} id="btn-back"><IoArrowBack /></button>
            </div>
            {
                arr.map((a, index) => {
                    return (
                        <div key={index} className="receiver" style={{ backgroundImage: `url(${'http://localhost:3008/public/avatar/avatar2.jpg'})` }}>
                            <span className='unread-message um-position'>2</span>
                            <span className='online-user'></span>
                        </div>
                    )
                })
            }
            <Offcanvas  show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Body>
                    <Container fluid className='chat-screen'>
                        <Row>
                            <Col md={4} className='list-receiver'>
                                <button onClick={() => setShow(false)} id="btn-back"><GrLinkNext /></button>
                                <div className='chat-type mt-20'>
                                    <div className={`mr-10 ${messageType === 1 ? "active-message" : ""}`}
                                        onClick={() => setMessageType(1)}
                                    >Community</div>
                                    <div className={`${messageType === 2 ? "active-message" : ""} personal-message`}
                                        onClick={() => setMessageType(2)}>Messages
                                        <span className='unread-message um-position'>2</span>
                                    </div>
                                </div>
                                <div className='search-receiver'>
                                    <FiSearch className='search-icon' />
                                    <input type='text' placeholder='Search' />
                                </div>
                                <div className='receiver-boxchat'>
                                    <div className='receiver-avatar' style={{ backgroundImage: `url(${'http://localhost:3008/public/avatar/avatar2.jpg'})` }}>
                                    </div>
                                    <div className='receiver-info'>
                                        <p className='receiver-name'>nina 33</p>
                                        <p className='messages-boxchat'>Check my perfi, I have free services, baby💞</p>
                                    </div>
                                    <div className='time-receipt'>
                                        <p>4:39 pm</p>
                                        <span className='unread-message' style={{ marginLeft: "40px" }}>2</span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={8} className='box-chat'>
                                {
                                    messageType === 1 && <ChatBoxComunity />
                                }

                            </Col>
                        </Row>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </div>

    )
}

export default ChatBox
