import React, { useContext, useEffect, useRef } from 'react'
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
import { SocketContext } from '../../context/SocketContext';
import axios from 'axios';
function ChatBox() {
    const userInfo = useSelector(userInfor);
    const { onlineUsers, openChatCanvas, handleClose, setOpenChatCanvas,
        receiverId, newChat, setReceiverId, newMessage, setNewMessage } = useContext(SocketContext)
    const [messageType, setMessageType] = useState(1);
    const [conversations, setConversation] = useState();
    const [currentConver, setCurrentConvers] = useState(null);
    const [totalUnread, setTotalUnread] = useState(0);
    // const [newMessage, setNewMessage] = useState(null)
    useEffect(() => {
        const getConversations = async () => {
            try {
                const con = await api.get("/api/conversation/get-all/" + userInfo._id)
                setConversation(con.data);
                setCurrentConvers(con.data[0]);
                const unreads = con.data.reduce((preValue, currentValue) => {
                    return preValue + currentValue.unread;
                }, 0)
                setTotalUnread(unreads);
            } catch (error) {
                console.log(error);
            }
        }
        getConversations();
    }, [userInfo])

    useEffect(() => {

        if (receiverId !== null) {
            setOpenChatCanvas(true)
            setMessageType(2);
            const conversation = conversations.find((c) => {
                return c?.members[0]._id === receiverId || c?.members[1]._id === receiverId
            })
            if (totalUnread !== 0) {
                setTotalUnread(totalUnread - conversation.unread)
            }
            const updateConvers = conversations.map((c) => {
                if (c._id === conversation._id)
                    c.unread = 0;
                return c;
            })
            handleReadMess(conversation._id);
            setCurrentConvers(conversation);
            setConversation(updateConvers)
        }
    }, [receiverId])

    const handleReadMess = async (id) => {
        try {
            await api.post("/api/message/" + id, {})
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (newChat !== null) {
            setOpenChatCanvas(true);
            setMessageType(2);
            if (newChat._id !== "newchat") {
                conversations?.forEach((c) => {
                    if (c._id === newChat._id) {
                        setCurrentConvers(c);
                    }
                })
            } else {
                setCurrentConvers(newChat);
                setConversation([newChat, ...conversations]);
            }
        }
    }, [newChat])

    useEffect(() => {
        if (!openChatCanvas) {
            setReceiverId(null);
            setConversation(conversations?.filter((c) => {
                return c._id !== "newchat"
            }))
            setMessageType(1);
        }
    }, [openChatCanvas])
    const handleChangeChat = (index) => {
        setCurrentConvers(conversations[index]);
        if (totalUnread !== 0)
            setTotalUnread(totalUnread - conversations[index].unread)
        const updateConvers = conversations.map((c) => {
            if (c._id === conversations[index]._id)
                c.unread = 0;
            return c;
        })
        handleReadMess(conversations[index]._id);
        setConversation(updateConvers)
        setMessageType(2);
    }

    useEffect(() => {
        if (newMessage === null) return;

        const newConvers = conversations?.some((c) => {
            return c._id === newMessage?.message?.conversationId
        })
        if (!newConvers) {
            getConversationById(newMessage?.senderId);
        }
        else {
            if (newMessage?.senderId !== userInfo._id && currentConver._id === newMessage?.message?.conversationId) {
                const updateConversation = conversations?.find((c) => {
                    return c._id === newMessage.message.conversationId;
                })
                if (updateConversation) {
                    updateConversation.lastestMessage = newMessage.message.text;
                    const filterConvers = conversations.filter((c) => {
                        return c._id !== newMessage.message.conversationId;
                    })
                    setConversation([updateConversation, ...filterConvers])
                }
            } else {
                const updateConversation = conversations?.find((c) => {
                    return c._id === newMessage.message.conversationId;
                })
                if (updateConversation) {
                    updateConversation.lastestMessage = newMessage.message.text;
                    updateConversation.unread = updateConversation.unread + 1;
                    const filterConvers = conversations.filter((c) => {
                        return c._id !== newMessage.message.conversationId;
                    })
                    setConversation([updateConversation, ...filterConvers])
                }
            }
            if (newMessage.message.conversationId !== currentConver._id)
                setTotalUnread(totalUnread + 1);
        }
    }, [newMessage])

    const getConversationById = async (id) => {
        try {
            const chat = await api.get(`/api/conversation/get-conversation-by-id/${userInfo._id}/${id}`)
            setCurrentConvers(chat.data)
            setConversation([chat.data, ...conversations])
            return chat.data
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='message-box'>
            <div>
                <button onClick={() => setOpenChatCanvas(true)} id="btn-back"><IoArrowBack /></button>
            </div>
            {
                conversations?.map((a, index) => {
                    const avatar = a?.members?.find((m) => {
                        return m?._id !== userInfo?._id
                    })
                    let converted_path = avatar?.avatar.replaceAll("\\", "/");
                    const url = baseUrl + converted_path;
                    return (
                        <div key={index} className="receiver" style={{ backgroundImage: `url(${url})` }}
                            onClick={() => setReceiverId(avatar._id)}>
                            {
                                a.unread !== undefined && a?.unread !== 0 && <span className='unread-message um-position'>{a?.unread}</span>
                            }
                            {
                                onlineUsers?.some((o) => {
                                    return o.userId === avatar?._id;
                                }) && <span className='online-user'></span>
                            }
                        </div>
                    )
                })
            }
            <Offcanvas show={openChatCanvas} onHide={handleClose} placement='end'>
                <Offcanvas.Body>
                    <Container fluid className='chat-screen'>
                        <Row style={{ width: "100%" }}>
                            <Col md={4} className='list-receiver'>
                                <button onClick={() => { setOpenChatCanvas(false); setReceiverId(null) }} id="btn-back"><GrLinkNext /></button>
                                <div className='chat-type mt-20'>
                                    <div className={`mr-10 ${messageType === 1 ? "active-message" : ""}`}
                                        onClick={() => setMessageType(1)}
                                    >Community</div>
                                    <div className={`${messageType === 2 ? "active-message" : ""} personal-message`}
                                        onClick={() => setMessageType(2)}>Messages
                                        {
                                            totalUnread !== 0 && <span className='unread-message um-position'>{totalUnread}</span>
                                        }
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
                                            <div className={`receiver-boxchat ${currentConver && currentConver._id === a._id && messageType === 2 ? "chat-active" : ""}`}
                                                key={index}
                                                onClick={() => handleChangeChat(index)}>
                                                <div className='receiver-avatar' style={{ backgroundImage: `url(${url})` }}>
                                                </div>
                                                <div className='receiver-info'>
                                                    <p className='receiver-name'>{username}</p>
                                                    <p className={`messages-boxchat ${a !== null && a.unread !== 0 && a._id !== currentConver._id ? "text-white" : ""}`}>{a?.lastestMessage}
                                                        {a?.lastestMessage === null && "New Chat"}
                                                    </p>
                                                </div>
                                                <div className='time-receipt' style={{ width: "56px" }}>
                                                    {
                                                        a.unread !== undefined && a.unread !== 0 &&
                                                        <span className='unread-message' style={{ marginLeft: "40px" }}>{a.unread}</span>
                                                    }
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
                                    messageType === 2 && <ChatBoxDual currentConversation={currentConver}
                                        setConversation={setConversation} conversations={conversations}
                                        newMessage={newMessage} setNewMessage={setNewMessage} setCurrentConvers={setCurrentConvers} />
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
