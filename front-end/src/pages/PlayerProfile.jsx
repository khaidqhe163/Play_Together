import React, { useEffect, useState } from 'react'
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
function PlayerProfile() {
    const { id } = useParams();
    const [player, setPlayer] = useState();
    const [subnav, setSubnav] = useState(2);
    const [age, setAge] = useState("");
    const [openModalBlock, setOpenModalBlock] = useState(false)
    const [blocked, setBlocked] = useState(false)


    useEffect(() => {
        getPlayerInformation();
    }, [])

    const getPlayerInformation = async () => {
        try {
            const player = (await axios.get("http://localhost:3008/api/user/player-information/" + id)).data;
            console.log(player);
            setPlayer(player);
            const dob = new Date(player.dateOfBirth);
            const currentTime = new Date();
            setAge(currentTime.getFullYear() - dob.getFullYear())
        } catch (error) {
            console.log(error);
        }
    }

    console.log(player);
    return (
        <>
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
                            <img src={baseUrl + player?.avatar} id='player-avatar' alt="#"/>
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
                            <button style={{ background: "linear-gradient(90deg, #9e23d2 , #5c23d2)" }}>Theo dõi</button>
                            <button style={{ background: "linear-gradient(90deg, #fc0000 , #ff7400)" }} onClick={() => setOpenModalBlock(player)}>{!blocked ? 'Chặn' : 'Bỏ chặn'}</button>
                            <button style={{ background: "linear-gradient(90deg, #1e1e1e , #7d7d7d)" }}>Báo cáo</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} id='se-nav'>
                            <div className={subnav === 1 && `se-nav-active`}
                                onClick={() => setSubnav(1)}>Achievements</div>
                            <div className={subnav === 2 && `se-nav-active`}
                                onClick={() => setSubnav(2)}>Services</div>
                            <div className={subnav === 3 && `se-nav-active`}
                                onClick={() => setSubnav(3)}>Album</div>
                            <div className={subnav === 4 && `se-nav-active`}
                                onClick={() => setSubnav(4)}>Feeds</div>
                        </Col>
                    </Row>
                </Container>
                {
                    subnav === 1 && <Achivement player={player} />
                }
                {
                    subnav === 2 && <Services player={player} />
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
                    setBlocked={setBlocked}
                    // onOk={onOk}
                />
            )}
        </>
    )
}

export default PlayerProfile
