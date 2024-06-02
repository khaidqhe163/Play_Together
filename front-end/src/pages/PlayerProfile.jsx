import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import NavBar from '../layouts/NavBar'
import '../css/player-profile.css'
import { FaMedal, FaHeart } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl, formatDate, formatMoney } from '../utils/service';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import ImageGallery from '../components/ImageGallery';
function PlayerProfile() {
    const { id } = useParams();
    const [player, setPlayer] = useState();
    const [services, setService] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => {
        console.log("click here");
        setIsOpen(false);
    };
    const previousImage = (e) => {
        e.stopPropagation()
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? player.player.images.length - 1 : prevIndex - 1
        );
    };

    const nextImage = (e) => {
        e.stopPropagation()
        setCurrentImageIndex((prevIndex) =>
            prevIndex === player.player.images.length - 1 ? 0 : prevIndex + 1
        );
    };
    useEffect(() => {
        getPlayerInformation();
        getService();
    }, [])

    const getPlayerInformation = async () => {
        try {
            const player = (await axios.get("http://localhost:3008/api/user/player-information/" + id)).data;
            console.log(player);
            setPlayer(player);
        } catch (error) {
            console.log(error);
        }
    }

    const getService = async () => {
        try {
            const services = await axios.get("http://localhost:3008/api/service");
            setService(services.data);
        } catch (error) {
            console.log(error);
        }
    }

    console.log(isOpen);

    return (
        <>
            <div className="container-fluid d-flex flex-column overflow-x-hidden bg-bgMain">
                <div className="row bg-white shadow-sm" style={{ position: "fixed", zIndex: "1", width: "100vw" }}>
                    <div className="col-12">
                        <NavBar />
                    </div>
                </div>
            </div>
            <Container className='player-profile' style={{ marginTop: "70px" }}>
                {
                    player && (
                        <Row>

                            <Col md={3} id='pp-left'>
                                <img id='player-avatar' src={baseUrl + player.avatar} />
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                    {
                                        player.player.facebookUrl && player.player.facebookUrl !== ""
                                        && (<a href={player.player.facebookUrl} target='_blank'><FaFacebook style={{ fontSize: "30px", color: "blue", marginRight: "10px" }} /></a>)
                                    }
                                    {
                                        player.player.youtubeUrl && player.player.youtubeUrl !== ""
                                        && (<a href={player.player.youtubeUrl} target='_blank'><FaYoutube style={{ fontSize: "30px", color: "red" }} /></a>)
                                    }

                                </div>
                                <p>NGÀY THAM GIA: {formatDate(player.createdAt)}</p>
                                <h5>THÀNH TÍCH</h5>
                                <hr></hr>
                                {
                                    player.player.achivements.map((a) => {
                                        return (
                                            <div className='achivement'>
                                                <div>
                                                    <FaMedal className='achivement-icon' />
                                                    <p className='achivement-content'>{a.text}</p>
                                                </div>
                                                <p className='achivement-date'>{formatDate(a.date)}</p>
                                            </div>
                                        )
                                    })
                                }
                            </Col>
                            <Col md={6} id='pp-middle'>
                                <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                    <p style={{ fontSize: '30px', fontWeight: "bold" }}>{player.username}</p>
                                    <button style={{ height: "30px", padding: "5px 10px", borderRadius: "20px", cursor: "pointer" }}> <ion-icon name="heart"></ion-icon> Theo dõi</button>
                                </div>
                                <Row>
                                    <Col md={3}>
                                        <p style={{ fontSize: "12px", fontWeight: "bold" }}>SỐ NGƯỜI THEO DÕI</p>
                                        <p style={{ color: "#7b47ff", fontWeight: "bold" }}>{player.followers.length} người</p>
                                    </Col>
                                    <Col md={3}>
                                        <p style={{ fontSize: "12px", fontWeight: "bold" }}>ĐÃ ĐƯỢC THUÊ</p>
                                        <p style={{ color: "#7b47ff", fontWeight: "bold" }}>{player.player.totalHiredHour} giờ</p>
                                    </Col>
                                    <Col md={3}>
                                        <p style={{ fontSize: "12px", fontWeight: "bold" }}>TỶ LỆ HOÀN THÀNH</p>
                                        <p style={{ color: "#7b47ff", fontWeight: "bold" }}>95.68%</p>
                                    </Col>
                                    <Col md={3}>
                                        <p style={{ fontSize: "12px", fontWeight: "bold" }}>TÌNH TRẠNG THIẾT BỊ</p>
                                        <p style={{ color: "#7b47ff", fontWeight: "bold", fontSize: "20px" }}>
                                            {
                                                player.player.deviceStatus.mic && (<ion-icon name="mic"></ion-icon>)
                                            }
                                            {
                                                player.player.deviceStatus.cam && (<ion-icon name="camera"></ion-icon>)
                                            }
                                        </p>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <div className='service-container'>
                                    {
                                        services && services.map((s) => {
                                            let converted_path = s.background.replaceAll("\\", "/")
                                            const url = baseUrl + converted_path;
                                            if (player.player.serviceType.includes(s._id))
                                                return (
                                                    <div className='service' style={{ backgroundImage: `url(${url})`, height: "50px", borderRadius: "10px", minWidth: "100px", marginBottom: "20px" }}>
                                                        <p style={{ textAlign: "center", lineHeight: "50px", fontSize: "13px", fontWeight: "bold" }}>{s.name}</p>
                                                    </div>
                                                )
                                            else return null
                                        })
                                    }

                                </div>
                                <hr></hr>
                                <h5>THÔNG TIN</h5>
                                <div className='album-player'>
                                    {
                                        player.player.images && player.player.images.map((i, index) => {
                                            let converted_path = i.replaceAll("\\", "/")
                                            const url = baseUrl + converted_path;
                                            if (index <= 4) {
                                                return (
                                                    <>
                                                        <div key={index}
                                                            className='album-image'
                                                            style={{
                                                                backgroundImage: `url(${url})`,
                                                                backgroundPosition: 'center',
                                                                backgroundSize: 'cover',
                                                                width: '110px',
                                                                height: '110px',
                                                                cursor: 'pointer',
                                                                marginRight: "10px",
                                                                position: "relative"
                                                            }}
                                                            onClick={() => openModal(index)}
                                                        >
                                                            {index === 4 && player.player.images.length > 0 && (
                                                                <div
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        left: 0,
                                                                        right: 0,
                                                                        bottom: 0,
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                                        color: 'white',
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        fontSize: '16px'
                                                                    }}
                                                                >
                                                                    Còn {+ player.player.images.length - 5} hình ảnh
                                                                </div>

                                                            )
                                                            }
                                                        </div>
                                                    </>)
                                            } else return null
                                        })
                                    }
                                </div>
                                <p style={{ whiteSpace: "pre-line" }} className='text-white'>{player.player.info}</p>
                                <iframe width="100%" height="315"
                                    src="https://www.youtube.com/embed/5iPEK0uD50E?si=4s3bHiKcKhub4amZ"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                <hr></hr>
                                <h5>ĐÁNH GIÁ</h5>
                            </Col>
                            <Col md={3} id='pp-right'>
                                <div style={{ border: "2px solid white", borderRadius: "10px", padding: "5px" }}>
                                    <h2>{formatMoney(player.player.rentCost)}/h</h2>
                                    <div className='star-container'>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <span style={{ color: "gray", marginLeft: "20px" }}>327 đánh giá</span>
                                    </div>
                                    <Button style={{ width: "99%", margin: "auto", height: "60px" }}>DONATE</Button>
                                    <Button style={{ width: "99%", margin: "auto", height: "60px", marginTop: "20px" }}>CHAT</Button>
                                </div>
                            </Col>
                            <ImageGallery image={player.player.images[currentImageIndex]} isOpen={isOpen} closeModal={closeModal} previousImage={previousImage} nextImage={nextImage} />
                        </Row>
                    )
                }

            </Container>
        </>
    )
}

export default PlayerProfile
