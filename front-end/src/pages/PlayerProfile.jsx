import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import NavBar from '../layouts/NavBar'
import '../css/player-profile.css'
import { FaMedal, FaHeart } from "react-icons/fa6";
function PlayerProfile() {
    return (
        <>
            <NavBar></NavBar>
            <Container className='player-profile'>
                <Row>
                    <Col md={3} id='pp-left'>
                        <img id='player-avatar' src='https://files.playerduo.net/production/images/b236f856-16c0-408a-ad6b-6eed82e2f366__9039e810-1ce4-11ef-9524-4bb33b42dae7__player_avatar.jpg' />
                        <p>NGÀY THAM GIA: 20/3/2018</p>
                        <h5>THÀNH TÍCH</h5>
                        <hr></hr>
                        <div className='achivement'>
                            <div>
                                <FaMedal className='achivement-icon' />
                                <p className='achivement-content'>From FPT WITH LOVE</p>
                            </div>
                            <p className='achivement-date'>03-03-2024</p>
                        </div>
                        <div className='achivement'>
                            <div>
                                <FaMedal className='achivement-icon' />
                                <p className='achivement-content'>From FPT WITH LOVE From FPT WITH LOVE From FPT WITH LOVE</p>
                            </div>
                            <p className='achivement-date'>03-03-2024</p>
                        </div>
                    </Col>
                    <Col md={6} id='pp-middle'>
                        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                            <p style={{ fontSize: '30px' }}>Vanh</p>
                            <button style={{ height: "30px", padding: "5px 10px", borderRadius: "20px", cursor: "pointer" }}> <ion-icon name="heart"></ion-icon> Theo dõi</button>
                        </div>
                        <Row>
                            <Col md={3}>
                                <p style={{ fontSize: "12px", fontWeight: "bold" }}>SỐ NGƯỜI THEO DÕI</p>
                                <p style={{ color: "#7b47ff", fontWeight: "bold" }}>1000 người</p>
                            </Col>
                            <Col md={3}>
                                <p style={{ fontSize: "12px", fontWeight: "bold" }}>ĐÃ ĐƯỢC THUÊ</p>
                                <p style={{ color: "#7b47ff", fontWeight: "bold" }}>123949 giờ</p>
                            </Col>
                            <Col md={3}>
                                <p style={{ fontSize: "12px", fontWeight: "bold" }}>TỶ LỆ HOÀN THÀNH</p>
                                <p style={{ color: "#7b47ff", fontWeight: "bold" }}>95.68%</p>
                            </Col>
                            <Col md={3}>
                                <p style={{ fontSize: "12px", fontWeight: "bold" }}>TÌNH TRẠNG THIẾT BỊ</p>
                                <p style={{ color: "#7b47ff", fontWeight: "bold", fontSize: "20px" }}><ion-icon name="mic"></ion-icon> <ion-icon name="camera"></ion-icon></p>
                            </Col>
                        </Row>
                        <hr></hr>
                        <div className='service-container'>
                            <div className='service' style={{ backgroundImage: "url(66575133876d09881d098f23.jpg)", height: "50px", borderRadius: "10px" }}>
                                <p style={{ textAlign: "center", lineHeight: "50px", fontSize: "13px", fontWeight: "bold" }}>LIÊN MINH HUYỀN THOẠI</p>
                            </div>
                            <div className='service' style={{ backgroundImage: "url(665750fd876d09881d098f21.jpg)", height: "50px", borderRadius: "10px" }}>
                                <p style={{ textAlign: "center", lineHeight: "50px", fontSize: "13px", fontWeight: "bold" }}>FREE FIRE</p>
                            </div>
                        </div>
                        <hr></hr>
                        <h5>THÔNG TIN</h5>
                        <div className='album-player'>
                            <div
                                className='service'
                                style={{
                                    backgroundImage: `url(${"https://playerduo.net/api/upload-service/images/b236f856-16c0-408a-ad6b-6eed82e2f366__677d6ca0-ff00-11ee-9524-4bb33b42dae7__player_album.jpg"})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    width: '110px',
                                    height: '110px'
                                }}
                            >
                            </div>
                            <div
                                className='service'
                                style={{
                                    backgroundImage: `url(${"https://playerduo.net/api/upload-service/images/b236f856-16c0-408a-ad6b-6eed82e2f366__9a5ac6b0-7cd6-11ee-bec4-f929e725acab__player_album.jpg"})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    width: '110px',
                                    height: '110px'
                                }}
                            >
                            </div>

                        </div>
                    </Col>
                    <Col md={3} id='pp-right'>
                        <div style={{border:"2px solid white", borderRadius:"10px", padding:"5px"}}>
                            <h2>80,000 đ/h</h2>
                            <div className='star-container'>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <span style={{color:"gray", marginLeft:"20px"}}>327 đánh giá</span>
                            </div>
                            <Button style={{width:"99%", margin:"auto", height:"60px"}}>DONATE</Button>
                            <Button style={{width:"99%", margin:"auto", height:"60px", marginTop:"20px"}}>CHAT</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PlayerProfile
