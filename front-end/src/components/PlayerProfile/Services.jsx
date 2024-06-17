import React, { useEffect, useState } from 'react'
import { FaBan, FaCamera, FaStar } from 'react-icons/fa'
import { TbPointFilled } from "react-icons/tb";
import PiRight from './PiRight';
import { IoIosMic } from 'react-icons/io';
import { getId } from '../../utils/service';
function Services({ player }) {
    const [linkYoutube, setLinkYoutube] = useState("")
    useEffect(() => {
        console.log(linkYoutube);
        if (player?.player?.videoHightlight) {
            const url = getId(player.player.videoHightlight);
            setLinkYoutube(url);
        }
    }, [player])
    return (
        <div className='player-infor-container'>
            <div className='pi-left pi'>
                <div className='service-item'>
                    <img src='/lmht.jpg' style={{ width: "60px" }} />
                    <p style={{ margin: "0", marginLeft: "5px" }}>Lien Minh Huyen Thoai</p>
                </div>
            </div>
            <div className='pi-middle pi'>
                <h3>Service</h3>
                <div style={{ color: "white", display: "flex", alignItems: "center", fontSize: "20px", fontWeight: "bold" }}>
                    <FaStar style={{ color: "#f39e22", marginRight: "5px" }} />
                    <p style={{ margin: "0" }}>5.0</p>
                    <TbPointFilled />
                    <p style={{ margin: "0" }}>744 Served</p>
                    <TbPointFilled />
                    <p style={{ margin: "0" }}>88 Reviews</p>
                </div>
                <h5 className='mt-20'>Tình trạng thiết bị</h5>
                <div className='devices-status'>
                    {
                        player?.player?.deviceStatus.mic && <button><IoIosMic style={{ margin: 'auto' }} /></button>
                    }
                    {
                        player?.player?.deviceStatus.cam && <button> <FaCamera style={{ margin: 'auto' }} /></button>
                    }
                    {
                        !player?.player?.deviceStatus.cam && !player?.player?.deviceStatus.mic && <button><FaBan style={{ margin: 'auto' }} /></button>
                    }
                </div>
                <iframe width="95%" height="315"
                    src={linkYoutube}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                    style={{ margin: "auto", marginTop: "20px" }}></iframe>
                <hr style={{ color: "white" }}></hr>
                <div className='review'>
                    <div className='review-items'>
                        <div className='reviewer d-flex text-white'>
                            <img src='/avatar2.jpg' style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                            <div className='ml-10'>
                                <p className='m-0' style={{ fontSize: "18px", fontWeight: "bold" }}>Khai Dao</p>
                                <p style={{ fontSize: "13px", color: "#bfbfbf" }}>02-02-2002</p>
                                <div className='d-flex text-white align-items-center' >
                                    <FaStar style={{ color: "#f39e22", marginRight: "5px" }} />
                                    <p style={{ margin: "0" }}>5.0</p>
                                </div>
                                <p className='text-white'>Stoic is my fav carry ngl. Order him</p>
                            </div>
                        </div>
                        <hr style={{ color: "white" }}></hr>
                    </div>
                </div>
            </div>
            <PiRight />
        </div>
    )
}

export default Services
