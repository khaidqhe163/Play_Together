import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ user, children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const [openChatCanvas, setOpenChatCanvas] = useState(false);
    const handleClose = () => setOpenChatCanvas(false);
    const [receiverId, setReceiverId] = useState(null);
    const [newChat, setNewChat] = useState(null);
    useEffect(() => {
        const newSocket = io("http://localhost:5000")
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [])
    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", user?._id)
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        })
    }, [socket, user])
    return (
        <SocketContext.Provider value={{
            socket,
            onlineUsers,
            openChatCanvas,
            handleClose,
            setOpenChatCanvas,
            receiverId,
            setReceiverId,
            newChat,
            setNewChat
        }}>
            {children}
        </SocketContext.Provider>
    );
};
