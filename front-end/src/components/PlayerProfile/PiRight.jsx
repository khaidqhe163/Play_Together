import React, { useContext } from 'react'
import { SocketContext } from '../../context/SocketContext'
import api from '../../utils/axiosConfig'
function PiRight({ id }) {
    const { setOpenChatCanvas, setReceiverId, newChat, setNewChat } = useContext(SocketContext)
    const handleOpenChat = async () => {
        try {
            // setOpenChatCanvas(true);
            const chat = await api.post("/api/conversation/create-conversation", { member: id })
            console.log(chat);
            setNewChat(chat.data)
        } catch (error) {
            if (error.response.status === 400)
                setReceiverId(id);
            console.log(error);
        }
    }
    return (
        <div className='pi-right pi'>
            <button onClick={handleOpenChat}>Chat</button>
            <button>Donate</button>
            <button onClick={setOpenHire}>Thuê</button>
        </div>
    )
}

export default PiRight
