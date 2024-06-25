import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavBar from '../layouts/NavBar'
import '../css/player-profile.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoMdMale } from "react-icons/io";
import Services from '../components/PlayerProfile/Services';
import Achivement from '../components/PlayerProfile/Achivement';
import { baseUrl, formatMoney } from '../utils/service';
import BlockUserModal from '../components/Modal/BlockUserModal';
import Album from '../components/PlayerProfile/Album';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlockedUsers } from '../features/userSlice';
import CanvasHire from '../components/CanvasHire';
import { Bounce, ToastContainer } from 'react-toastify';
import api from '../utils/axiosConfig'
import { SocketContext } from '../context/SocketContext';

function PlayerProfile() {
    const { id } = useParams();
    const [player, setPlayer] = useState();
    const [subnav, setSubnav] = useState(2);
    const [snav, setSnav] = useState(1);
    const [age, setAge] = useState("");
    const { onlineUsers } = useContext(SocketContext);
    const [playerOnline, setPlayerOnline] = useState(false);
    const [openModalBlock, setOpenModalBlock] = useState(false);
    const [openHire, setOpenHire] = useState(false);
    const author = useSelector((state) => state.user);
    const [blocked, setBlocked] = useState(author?.value?.blockedUsers?.includes(id))
    const [following, setFollowing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkOnline = onlineUsers?.some(o => o.userId === id);
        setPlayerOnline(checkOnline)
    }, [onlineUsers]);

    useEffect(() => {
        getPlayerInformation();
    }, [])

    useEffect(() => {
        getPlayerInformation();
    }, [author])

    useEffect(() => {
        setBlocked(author?.value?.blockedUsers?.includes(id))
    }, [author, id])

    const handleBlockStatusChange = (blockedStatus) => {
        dispatch(updateBlockedUsers({ userId: id, blocked: blockedStatus }))
        setBlocked(blockedStatus)
        setOpenModalBlock(false)
    };

    const getPlayerInformation = async () => {
        try {
            const player = (await axios.get("http://localhost:3008/api/user/player-information/" + id)).data;
            setPlayer(player);
            const dob = new Date(player.dateOfBirth);
            const currentTime = new Date();
            setAge(currentTime.getFullYear() - dob.getFullYear())
            console.log(author?.value?.followers.includes(id));
            setFollowing(author?.value?.followers.includes(id)); // Set the initial follow status
        } catch (error) {
            console.log(error);
        }
    }

    const followPlayer = async () => {
        try {
            await api.post(`http://localhost:3008/api/user/follow-player/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${author?.value?.token}`
                }
            });
            setFollowing(true);
        } catch (error) {
            console.error(error);
        }
    };

    const unfollowPlayer = async () => {
        try {
            await api.post(`http://localhost:3008/api/user/unfollow-player/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${author?.value?.token}`
                }
            });
            setFollowing(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce} />
            <div className="container-fluid d-flex flex-column overflow-x-hidden bg-bgMain">
                <div className="row bg-white shadow-sm" style={{ position: "fixed", zIndex: "1", width: "100vw" }}>
                    <div className="col-12">
                        <NavBar />
                    </div>
                </div>
            </div>
            <div style={{
                width: "calc(100vw - 98px)", marginTop: "70px", backgroundColor: "#13131a", overflow: "auto",
                height: "calc(100vh - 56px)"
            }}>
                <Container fluid>
                    <Row style={{ height: "256px", backgroundImage: "url('/profilebackground.png')", backgroundSize: "160%", backgroundPosition: "center", backgroundColor: "black" }}
                        className='profile-header'>
                        <Col md={6} className='profile-header-left'>
                            <img src={baseUrl + player?.avatar} id='player-avatar' alt="#" />
                            <div style={{ marginLeft: "20px" }}>
                                <p style={{ color: "white", fontSize: "40px", fontWeight: "bold" }}>{player?.username}</p>
                                <div style={{ display: "flex" }} className='header-info'>
                                    <div id='gender-age'>
                                        <IoMdMale style={{ color: "blue", marginRight: "10px" }} />
                                        <span>{age}</span>
                                    </div>
                                    <div id='account-status'>
                                        <div style={{ width: "20px", height: "20px", backgroundColor: "green", borderRadius: "50%" }}>
                                        </div>
                                        <p style={{ margin: "0", marginLeft: "10px" }}>Online</p>
                                    </div>
                                    <div id='account-status'>
                                        <p style={{ margin: "0", marginLeft: "10px" }}>{formatMoney(player?.player?.rentCost)}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className='profile-header-right'>
                            {following ? (
                                <button style={{ background: "linear-gradient(90deg, #9e23d2 , #5c23d2)" }} onClick={unfollowPlayer}>Bỏ theo dõi</button>
                            ) : (
                                <button style={{ background: "linear-gradient(90deg, #9e23d2 , #5c23d2)" }} onClick={followPlayer}>Theo dõi</button>
                            )}
                            <button style={{ background: "linear-gradient(90deg, #fc0000 , #ff7400)" }} onClick={() => setOpenModalBlock(player)}>{blocked ? ' Bỏ chặn' : 'Chặn'}</button>
                            <button style={{ background: "linear-gradient(90deg, #1e1e1e , #7d7d7d)" }}>Báo cáo</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} id='se-nav'>
                            <div className={subnav === 1 && `se-nav-active`}
                                onClick={() => setSubnav(1)}>Thành tựu</div>
                            <div className={subnav === 2 && `se-nav-active`}
                                onClick={() => setSubnav(2)}>Dịch vụ</div>
                            <div className={subnav === 3 && `se-nav-active`}
                                onClick={() => setSubnav(3)}>Thư viện</div>
                            <div className={subnav === 4 && `se-nav-active`}
                                onClick={() => setSubnav(4)}>Video</div>
                        </Col>
                    </Row>
                </Container>
                {
                    subnav === 1 && <Achivement player={player} setOpenHire={() => { setOpenHire(true) }} />
                }
                {
                    subnav === 2 && <Services player={player} setOpenHire={() => { setOpenHire(true) }} />
                }
                {
                    subnav === 3 && <Album player={player} />
                }
            </div>

            {!!openModalBlock && (
                <BlockUserModal
                    open={openModalBlock}
                    onCancel={() => setOpenModalBlock(false)}
                    blocked={blocked}
                    setBlocked={handleBlockStatusChange}
                />
            )}
            <CanvasHire showHire={openHire} handleClose={() => setOpenHire(false)} player={player} snav={snav} setSnav={setSnav} playerOnline={playerOnline} />
            {/* <CanvasUserSet showHire={openHire} handleClose={() => setOpenHire(false)} player={player} snav={snav} setSnav={setSnav}/> */}

        </>
    )
}

export default PlayerProfile;
