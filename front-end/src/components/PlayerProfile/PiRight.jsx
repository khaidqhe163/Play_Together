import React, { useContext } from 'react'
import { SocketContext } from '../../context/SocketContext'
import api from '../../utils/axiosConfig'
import { userInfor } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function PiRight({ id, setOpenHire, player, setShowDonate }) {
    const { setOpenChatCanvas, setReceiverId, newChat, setNewChat } = useContext(SocketContext)
    const userInfo = useSelector(userInfor);
    const nav = useNavigate();
    const handleOpenChat = async () => {
        try {
            if (userInfo === null) {
                nav("/login")
                return;
            }
            const chat = await api.get(`/api/conversation/get-conversation-by-id/${userInfo._id}/${id}`)
            if (chat.data) {
                setNewChat(chat.data)
            }
            else {
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
            <button onClick={handleOpenChat} disabled={userInfo?._id === player?._id}>Chat</button>
            <button onClick={() => { userInfo === null ? nav("/play-together/login") : setShowDonate() }} disabled={userInfo?._id === player?._id}>Donate</button>
            <button onClick={() => { userInfo === null ? nav("/play-together/login") : setOpenHire() }}>Thuê</button>
        </div>
    )
}

export default PiRight
