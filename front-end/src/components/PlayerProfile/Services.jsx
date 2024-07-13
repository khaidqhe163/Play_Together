import React, { useEffect, useState } from 'react'
import { FaBan, FaCamera, FaStar } from 'react-icons/fa'
import { TbPointFilled } from "react-icons/tb";
import PiRight from './PiRight';
import { IoIosMic } from 'react-icons/io';
import { baseUrl, getId } from '../../utils/service';
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs';
function Services({ player, setOpenHire, setShowDonate}) {
    const [linkYoutube, setLinkYoutube] = useState("")
    const [services, setService] = useState();
    const [reviews, setReviews] = useState(null);
    dayjs.extend(relativeTime);
    useEffect(() => {
        console.log(linkYoutube);
        if (player?.player?.videoHightlight) {
            const url = getId(player.player.videoHightlight);
            setLinkYoutube(url);
        }
        getService();
        getReview();
    }, [player])
    const getService = async () => {
        try {
            const services = await axios.get("http://localhost:3008/api/service");
            const userService = services.data.filter((s) => {
                return player.player.serviceType.includes(s._id);
            })
            setService(userService);
        } catch (error) {
            console.log(error);
        }
    }
    const getReview = async () => {
        try {
            const reviews = await axios.get("http://localhost:3008/api/comment/review-player/" + player._id)
            setReviews(reviews.data)
        } catch (error) {
            console.log(error);
        }
    }
    console.log(reviews);
    return (
        <div className='player-infor-container'>
            <div className='pi-left pi'>
                {
                    services?.map((s) => {
                        return (
                            <div className='service-item mb-10'>
                                <img src={baseUrl + s.image} style={{ width: "60px" }} />
                                <p style={{ margin: "0", marginLeft: "5px" }}>{s.name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className='pi-middle pi'>
                <h3>Dịch vụ</h3>
                <div style={{ color: "white", display: "flex", alignItems: "center", fontSize: "20px", fontWeight: "bold" }}>
                    <FaStar style={{ color: "#f39e22", marginRight: "5px" }} />
                    <p style={{ margin: "0" }}>5.0</p>
                    <TbPointFilled />
                    <p style={{ margin: "0" }}>744 lần được thuê</p>
                    <TbPointFilled />
                    <p style={{ margin: "0" }}>88 đánh giá</p>
                </div>
                <h5 className='mt-20'>Tình trạng thiết bị</h5>
                <div className='devices-status'>
                    {
                        player?.player?.deviceStatus?.mic && <button><IoIosMic style={{ margin: 'auto' }} /></button>
                    }
                    {
                        player?.player?.deviceStatus?.cam && <button> <FaCamera style={{ margin: 'auto' }} /></button>
                    }
                    {
                        !player?.player?.deviceStatus?.cam && !player?.player?.deviceStatus?.mic && <button><FaBan style={{ margin: 'auto' }} /></button>
                    }
                </div>
                {
                    player?.player?.videoHightlight &&
                    <iframe width="95%" height="315"
                        src={linkYoutube}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                        style={{ margin: "auto", marginTop: "20px" }}></iframe>
                }
                <hr style={{ color: "white" }}></hr>
                <div className='review'>
                    {
                        reviews?.map((r) => {
                            return (
                                <div className='review-items'>
                                    <div className='reviewer d-flex text-white'>
                                        <img src={baseUrl + r.commentor.avatar} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                        <div className='ml-10'>
                                            <p className='m-0' style={{ fontSize: "18px", fontWeight: "bold" }}>{r.commentor.username}</p>
                                            <p style={{ fontSize: "13px", color: "#bfbfbf" }}>{dayjs(r.createdAt).fromNow()}</p>
                                            <div className='d-flex text-white align-items-center' >
                                                <FaStar style={{ color: "#f39e22", marginRight: "5px" }} />
                                                <p style={{ margin: "0" }}>{r.rating}</p>
                                            </div>
                                            <p className='text-white'>{r.content}</p>
                                        </div>
                                    </div>
                                    <hr style={{ color: "white" }}></hr>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <PiRight id={player?._id} setOpenHire={setOpenHire} player={player} setShowDonate={setShowDonate}/>
        </div>
    )
}

export default Services
