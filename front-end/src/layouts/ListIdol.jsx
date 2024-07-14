import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userInfor } from '../features/userSlice';
import api from '../utils/axiosConfig';
import { baseUrl } from '../utils/service';
import StoryCreation from '../components/StoryCreation';

export default function ListIdol({ stories, setStory }) {
    const [hotPlayers, setHotPlayers] = useState([]);
    const userInfo = useSelector(userInfor);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [followedPlayers, setFollowedPlayers] = useState([]);

    const containerStyle = {
        backgroundColor: "#20202b",
        width: "100%",
        position: "sticky",
        top: "56px",
        height: "calc(100vh - 70px)",
        overflowY: "auto",
        padding: "20px",
    };

    const headingStyle = {
        color: "#bcbcbc",
        marginBottom: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "left",
    };

    const buttonContainerStyle = {
        display: "flex",
        alignItems: "center",
        marginBottom: "30px",
    };

    const buttonStyle = {
        backgroundColor: "#8d68f2",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontSize: "24px",
        marginRight: "10px",
    };

    const textContainerStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const iconStyle = {
        fontSize: "24px",
    };

    const storyContainerStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    };

    const storyStyle = {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#282834",
        borderRadius: "10px",
        color: "#fff",
        transition: "background-color 0.3s ease",
    };

    const storyHoverStyle = {
        backgroundColor: "#383844",
    };

    const avatarStyle = {
        width: "3em",
        height: "3em",
        objectFit: "cover",
        objectPosition: "center",
        marginRight: "10px",
        borderRadius: "50%",
    };

    const nameStyle = {
        margin: 0,
        fontSize: "16px",
    };

    const handleShowOpenCreate = () => {
        setOpenModalCreate(true);
    };

    const handleCloseOpenCreate = () => {
        setOpenModalCreate(false);
    };

    useEffect(() => {
        // Fetch hot players
        const fetchHotPlayers = async () => {
            try {
                const response = await api.post('http://localhost:3008/api/user/search-player', {
                    gender: '',
                    category: "2",
                    playerName: '',
                    gameName: '',
                    priceRange: [5000, 1000000]
                });
                setHotPlayers(response.data);
            } catch (error) {
                console.error('Error fetching hot players:', error);
            }
        };

        fetchHotPlayers();
    }, []);

    useEffect(() => {
        const fetchFollowedPlayers = async () => {
            try {
                const response = await api.get('http://localhost:3008/api/user/followed-players', {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                });
                setFollowedPlayers(response.data);
            } catch (error) {
                console.error('Error fetching followed players:', error);
            }
        };

        fetchFollowedPlayers();
    }, [userInfo]);

    return (
        <div style={containerStyle}>
            {!userInfo ? (
                // Nếu chưa đăng nhập
                <div>
                    <p style={headingStyle}>Hot player</p>
                    <div style={storyContainerStyle}>
                        {hotPlayers.map((player) => (
                            <Link key={player?._id} to={`/play-together/player-profile/${player?._id}`} className="text-decoration-none">
                                <div
                                    style={storyStyle}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = storyHoverStyle.backgroundColor}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = storyStyle.backgroundColor}
                                >
                                    <img src={baseUrl + player?.avatar} alt={player.name} style={avatarStyle} />
                                    <div>
                                        <h5 style={nameStyle}>{player?.username}</h5>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                // Nếu đã đăng nhập
                <div>
                    <p style={headingStyle}>Tin của bạn</p>
                    <div style={buttonContainerStyle}>
                        <button style={buttonStyle} onClick={handleShowOpenCreate}>
                            <ion-icon name="add-outline"></ion-icon>
                        </button>
                        <div style={textContainerStyle}>
                            <h5 style={{ color: "#fff", margin: "0" }}>Tạo tin</h5>
                            <p style={{ color: "#bcbcbc", margin: "0" }}>Bạn có thể tạo tin ở đây</p>
                        </div>
                    </div>
                    <div>
                        <p style={headingStyle}>Theo dõi</p>
                        <div style={storyContainerStyle}>
                            {followedPlayers.length === 0 ? (
                                <p style={{ color: "#bcbcbc" }}>Bạn chưa theo dõi ai</p>
                            ) : (
                                followedPlayers.map((player) => (
                                    <Link key={player._id} to={`/play-together/player-profile/${player._id}`} className="text-decoration-none">
                                        <div
                                            style={storyStyle}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = storyHoverStyle.backgroundColor}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = storyStyle.backgroundColor}
                                        >
                                            <img src={baseUrl + player.avatar} alt={player.username} style={avatarStyle} />
                                            <div>
                                                <h5 style={nameStyle}>{player.username}</h5>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
            <StoryCreation show={openModalCreate} close={handleCloseOpenCreate} stories={stories} setStory={setStory} />
        </div>
    );

}
