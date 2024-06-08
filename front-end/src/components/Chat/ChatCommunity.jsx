import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import ChatBoxComunity from './ChatBoxComunity';
import "../../css/chatboxcommunity.css"
function ChatCommunity() {
    const [isChatBoxVisible, setChatBoxVisible] = useState(false);
    const handleChatTriggerClick = () => {
        setChatBoxVisible(!isChatBoxVisible);
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center chat-community-container">
                <div className='openChatbtn' onClick={handleChatTriggerClick}>
                    <span className='text-white'>Trò Chuyện</span>
                </div>
                {
                    isChatBoxVisible && <ChatBoxComunity />
                }
            </div >
        </>
    )
}

export default ChatCommunity
