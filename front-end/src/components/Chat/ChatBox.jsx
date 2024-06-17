import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import '../../css/boxchat.css'
import { Col, Container, Offcanvas, Row, Stack } from 'react-bootstrap';
import { GrLinkNext } from 'react-icons/gr';
import { FiSearch } from 'react-icons/fi';
import ChatBoxComunity from './ChatBoxComunity';
import api from '../../utils/axiosConfig'
import { useSelector } from 'react-redux';
import { userInfor } from '../../features/userSlice';
import { baseUrl } from '../../utils/service';
import ChatBoxDual from './ChatBoxDual';
function ChatBox() {
    const userInfo = useSelector(userInfor);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [messageType, setMessageType] = useState(1);
    const [conversations, setConversation] = useState();
    const [currentConver, setCurrentConvers] = useState();
    useEffect(() => {
        const getConversations = async () => {
            try {
                const con = await api.get("/api/conversation/get-all/" + userInfo._id)
                setConversation(con.data);
                setCurrentConvers(con.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
        getConversations();
    }, [userInfo])

    const handleChangeChat = (index) => {
        setCurrentConvers(conversations[index]);
        setMessageType(2);
    }
    return (
        <div className='message-box'>
            <div>
                <button onClick={() => setShow(true)} id="btn-back"><IoArrowBack /></button>
            </div>
            {
                conversations?.map((a, index) => {
                    const avatar = a?.members?.find((m) => {
                        return m?._id !== userInfo?._id
                    })
                    let converted_path = avatar?.avatar.replaceAll("\\", "/")
                    const url = baseUrl + converted_path;
                    return (
                        <div key={index} className="receiver" style={{ backgroundImage: `url(${url})` }}>
                            <span className='unread-message um-position'>2</span>
                            <span className='online-user'></span>
                        </div>
                    )
                })
            }
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Body>
                    <Container fluid className='chat-screen'>
                        <Row style={{ width: "100%" }}>
                            <Col md={4} className='list-receiver'>
                                <button onClick={() => setShow(false)} id="btn-back"><GrLinkNext /></button>
                                <div className='chat-type mt-20'>
                                    <div className={`mr-10 ${messageType === 1 ? "active" : ""}`}
                                        onClick={() => setMessageType(1)}
                                    >Community</div>
                                    <div className={`${messageType === 2 ? "active" : ""} personal-message`}
                                        onClick={() => setMessageType(2)}>Messages
                                        <span className='unread-message um-position'>2</span>
                                    </div>
                                </div>
                                <div className='search-receiver'>
                                    <FiSearch className='search-icon' />
                                    <input type='text' placeholder='Search' />
                                </div>
                                {
                                    conversations?.map((a, index) => {
                                        const avatar = a?.members?.find((m) => {
                                            return m?._id !== userInfo?._id
                                        })
                                        let converted_path = avatar?.avatar.replaceAll("\\", "/")
                                        const url = baseUrl + converted_path;
                                        const username = avatar?.username
                                        return (
                                            <div className={`receiver-boxchat ${currentConver._id === a._id && messageType === 2 ? "chat-active" : ""}`}
                                                onClick={() => handleChangeChat(index)}>
                                                <div className='receiver-avatar' style={{ backgroundImage: `url(${url})` }}>
                                                </div>
                                                <div className='receiver-info'>
                                                    <p className='receiver-name'>{username}</p>
                                                    <p className='messages-boxchat'>Check my perfi, I have free services, baby💞</p>
                                                </div>
                                                <div className='time-receipt'>
                                                    <p>4:39 pm</p>
                                                    <span className='unread-message' style={{ marginLeft: "40px" }}>2</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Col>
                            <Col md={8} className='box-chat'>
                                {
                                    messageType === 1 && <ChatBoxComunity />
                                }
                                {
                                    messageType === 2 && <ChatBoxDual currentConversation={currentConver} />
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
