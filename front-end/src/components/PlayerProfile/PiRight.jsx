import React, { useContext } from 'react'
import { SocketContext } from '../../context/SocketContext'
import api from '../../utils/axiosConfig'
import { userInfor } from '../../features/userSlice';
import { useSelector } from 'react-redux';
function PiRight({ id, setOpenHire, player }) {
    const { setOpenChatCanvas, setReceiverId, newChat, setNewChat } = useContext(SocketContext)
    const userInfo = useSelector(userInfor);
    const handleOpenChat = async () => {
        try {
            // setOpenChatCanvas(true);
            // const chat = await api.post("/api/conversation/create-conversation", { member: id })
            const chat = await api.get(`/api/conversation/get-conversation-by-id/${userInfo._id}/${id}`)
            console.log(chat.data);
            if (chat.data) {
                setNewChat(chat.data)
            }
            else {
                console.log(player);
                const member = [
                    {
                        "_id": id,
                        username: player.username,
                        avatar: player.avatar
                    },
                    {
                        "_id": userInfo._id,
                        username: userInfo.username,
                        avatar: userInfo.avatar
                    }
                ]
                const newConversation = {
                    "_id": "newchat",
                    type: 2,
                    members: member
                }
                console.log(newConversation);
                setNewChat(newConversation)
            }

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
