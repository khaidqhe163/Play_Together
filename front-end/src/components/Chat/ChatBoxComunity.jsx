import React, { useEffect, useRef, useState } from 'react'
import { Stack } from 'react-bootstrap'
import InputEmoji from 'react-input-emoji'
import { LuSend } from "react-icons/lu";
import api from '../../utils/axiosConfig.js'
import axios from 'axios';
import { baseUrl } from '../../utils/service.js'
import { socket, setSocket } from '../../features/socketSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import { userInfor } from '../../features/userSlice.js';
function ChatBoxComunity() {
    const chatbox = useRef(null);
    const [textMessage, setTextMessage] = useState("")
    const socketRedux = useSelector(socket);
    const userInfo = useSelector(userInfor)
    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    useEffect(() => {

        const handleGetConversation = async () => {
            try {
                const con = await axios.get("http://localhost:3008/api/conversation/1");
                console.log(con.data);
                setConversation(con.data);
            } catch (error) {
                console.log(error);
            }
        }

        handleGetConversation();
    }, [])

    useEffect(() => {
        const handleGetMessage = async () => {
            try {
                const mes = await axios.get("http://localhost:3008/api/message/" + conversation._id);
                setMessages(mes.data);
            } catch (error) {
                console.log(error);
            }
        }
        handleGetMessage();
    }, [conversation])

    useEffect(() => {
        if (socketRedux === null) return;
        socketRedux.on("getNewMessage", (res) => {
            setNewMessage(res)
        })
    }, [socketRedux, conversation])

    useEffect(() => {
        console.log(newMessage);
        if (newMessage?.senderId !== userInfo._id)
            setMessages([...messages, newMessage?.message])
    }, [newMessage])
    useEffect(() => {
        chatbox.current.scrollTop = chatbox.current.scrollHeight;
    }, [messages])
    const handleSendMessage = async () => {
        try {
            const message = {
                messageType: 1,
                conversationId: conversation._id,
                text: textMessage
            }
            const mes = await api.post("/api/message", message);
            setMessages([...messages, mes.data])
            const socketMes = {
                message: mes.data,
                senderId: userInfo._id
            }
            socketRedux.emit("sendGlobalMessage", socketMes)
            setTextMessage("")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Stack direction='vertical' className='chatbox' gap={2}>
            <Stack direction='vertical' gap={3} ref={chatbox} style={{ overflow: "auto" }}>
                {
                    messages?.map((m) => {
                        return (
                            <div className="d-flex" style={{ width: "100%" }}>
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
                                    padding: "5px",
                                    width: "85%",
                                    fontSize: "15px",
                                    fontWeight: "500",
                                    borderTopLeftRadius: "0px"
                                }}>
                                    <span style={{ color: "#4dadfe" }}>{m?.senderId.username}: </span> {m?.text}
                                </div>
                            </div>
                        )
                    })
                }
            </Stack>
            <Stack direction='horizontal' gap={3} className='chat-input'>
                <InputEmoji value={textMessage}
                    onChange={setTextMessage}
                    fontFamily='sans-serif'
                    borderColor='rgba(72, 122, 232, 0.2)'
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

export default ChatBoxComunity
