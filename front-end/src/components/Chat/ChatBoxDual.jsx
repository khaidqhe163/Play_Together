import React, { useContext, useEffect, useRef, useState } from 'react'
import { Stack } from 'react-bootstrap'
import InputEmoji from 'react-input-emoji'
import { LuSend } from "react-icons/lu";
import api from '../../utils/axiosConfig.js'
import axios from 'axios';
import { baseUrl } from '../../utils/service.js'
import { useSelector, useDispatch } from 'react-redux';
import { userInfor } from '../../features/userSlice.js';
import { PiDotsThreeBold } from "react-icons/pi";
import { SocketContext } from '../../context/SocketContext.jsx';
function ChatBoxDual({ currentConversation, setConversation, conversations, newMessage, setNewMessage, setCurrentConvers }) {
    const chatbox = useRef(null);
    const { socket } = useContext(SocketContext);
    const [textMessage, setTextMessage] = useState("")
    const userInfo = useSelector(userInfor)
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState();

    useEffect(() => {
        if (currentConversation !== null) {
            const handleGetMessage = async () => {
                try {
                    const mes = await axios.get("http://localhost:3008/api/message/" + currentConversation._id);
                    setMessages(mes.data);
                } catch (error) {
                    console.log(error);
                }
            }
            handleGetMessage();
            const receiver = currentConversation?.members?.find((m) => {
                return m?._id !== userInfo?._id
            })
            setReceiver(receiver)
        }
    }, [currentConversation])

    // useEffect(() => {
    //     if (socket === null) return;
    //     socket.on("getNewMessagePrivate", (res) => {
    //         console.log(res);
    //         setNewMessage(res)
    //     })
    // }, [socket])

    useEffect(() => {
        if (newMessage?.senderId !== userInfo._id && currentConversation?._id === newMessage?.message?.conversationId) {
            setMessages([...messages, newMessage?.message])
        }
    }, [newMessage])
    useEffect(() => {
        chatbox.current.scrollTop = chatbox.current.scrollHeight;
    }, [messages])
    const handleSendMessage = async () => {
        try {
            let chatId;
            let chat;
            if (currentConversation._id === "newchat") {
                const member = currentConversation.members.find((c) => {
                    return c._id !== userInfo._id;
                })
                chat = (await api.post("/api/conversation/create-conversation", { member: member })).data
                chatId = chat._id;
                // setConversation(conversations.map((c) => {
                //     if (c._id === "newchat") {
                //         c._id = chat.data._id;
                //     }
                //     return c;
                // }))
                // setCurrentConvers(chat.data)
            } else {
                chatId = currentConversation._id
            }
            console.log("chatId", chatId);
            const message = {
                messageType: 1,
                conversationId: chatId,
                text: textMessage
            }
            const mes = await api.post("/api/message", message);
            setMessages([...messages, mes.data])
            const socketMes = {
                message: mes.data,
                senderId: userInfo._id,
                receiverId: receiver._id
            }
            console.log(socketMes);
            socket.emit("sendPrivateMessage", socketMes)
            if (currentConversation._id === "newchat") {
                setConversation(conversations.map((c) => {
                    if (c._id === "newchat") {
                        c._id = chat._id;
                    }
                    return c;
                }))
                chat.lastestMessage = mes.data.text;
                setCurrentConvers(chat)
            } else {
                currentConversation.lastestMessage = mes.data.text;
                const filterConvers = conversations.filter((c) => {
                    return c._id !== currentConversation._id;
                })
                setConversation([currentConversation, ...filterConvers])
            }
            setTextMessage("")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Stack direction='vertical' className='chatbox' gap={2}>
            <div className='chat-box-header d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                    <img className="rounded-circle" src={baseUrl + receiver?.avatar} style={
                        {
                            width: "48px",
                            height: "48px"
                        }
                    } alt='' />
                    <p className='text-white m-0 ml-10' style={{ fontSize: "20px", fontWeight: "bold" }}>{receiver?.username}</p>
                </div>
                {
                    //     <div className='rounded-circle chat-options d-flex align-items-center justify-content-between' style={{
                    //     cursor: "pointer",
                    //     width: "48px",
                    //     height: "48px"
                    // }} onClick={() => setMessageSetting(!messageSetting)}>
                    //     <PiDotsThreeBold style={{ color: "white", fontSize: "30px", margin: "auto" }} />
                    //     {messageSetting && (
                    //         <div className='message-setting'>

                    //         </div>
                    //     )}
                    // </div>
                }
            </div>
            <hr style={{ color: "white" }}></hr>
            <Stack direction='vertical' gap={3} ref={chatbox} style={{ overflow: "auto" }}>
                {
                    messages?.map((m, index) => {
                        if (m?.senderId._id !== userInfo?._id)
                            return (
                                <div className="d-flex" style={{ maxWidth: "80%" }} key={index}>
                                    <img src={baseUrl + m?.senderId.avatar} style={{
                                        width: "40px",
                                        height: "40px",
                                        marginRight: "10px"
                                    }}
                                        className='rounded-circle'
                                        alt='error'></img>
                                    <div className='text-white' style={{
                                        background: "#323241",
                                        borderRadius: "10px",
                                        padding: "5px 10px",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        maxWidth: "80%",
                                        borderTopLeftRadius: "0px"
                                    }}>
                                        {m?.text}
                                    </div>
                                </div>
                            )
                        else {
                            return (
                                <div className="d-flex align-self-end" style={{ maxWidth: "80%" }} key={index}>
                                    <div className='text-white' style={{
                                        background: "#6e41df",
                                        borderRadius: "10px",
                                        padding: "5px 10px",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        borderTopLeftRadius: "10px",
                                        borderTopRightRadius: "0px"
                                    }}>
                                        {m?.text}
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </Stack>
            <Stack direction='horizontal' gap={3} className='chat-input'>
                <InputEmoji value={textMessage}
                    onChange={setTextMessage}
                    fontFamily='sans-serif'
                    borderColor='rgba(72, 122, 232, 0.2)'
                    onEnter={handleSendMessage}
                />
                <button className='send-btn' style={{
                    background: "#8d68f2",
                    color: "white",
                    width: "40px",
                    height: "40px",
                    padding: "5px",
                    boxSizing: "border-box",
                    borderRadius: "50%",
                    textAlign: "center"
                }}
                    onClick={handleSendMessage}
                >
                    <LuSend style={{ fontSize: "20px" }} /></button>
            </Stack>
        </Stack >
    )
}

export default ChatBoxDual
