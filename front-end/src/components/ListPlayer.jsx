import React, { useEffect, useState } from 'react'
import avatarls1 from '../assets/avatals1.jpg'
import avatarls2 from '../assets/avatals2.jpg'
import avatarls3 from '../assets/avatals3.jpg'
import avatarls4 from '../assets/avatals4.jpg'
import { Link } from 'react-router-dom'
import pubg from '../assets/pubg.jpg'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { baseUrl } from '../utils/service.js'
import { TfiMoreAlt } from "react-icons/tfi";
export default function ListPlayer(props) {

    const [players, setPlayers] = useState([]);
    const url = props.url || "api/user/players";
    const fetchApiPlayer = async () => {
        try {
            const response = await fetch(baseUrl + url);
            const data = await response.json();
            setPlayers(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApiPlayer();
    }, [url]);

    return (
        <div className='row'>
            {players.length > 0 ? <>
                {players.map(p => (
                    <div className='col-md-3 my-3'>
                        <Link className='text-decoration-none' to={`/player-profile/${p._id}`}>
                            <div className="card rounded-4 relative" style={{ boxShadow: "0px 0px 0px 0px #0000", backgroundColor: "#20202b" }}>
                                <img className="card-img-top rounded-top-4 object-cover object-center" style={{ height: "20em", aspectRatio: 1 / 1 }} src={baseUrl + p.avatar} alt="Card image cap" />
                                <div className='absolute bg-bgButton rounded-4 px-2 py-1 right-2 bottom-36'>
                                    <p className='text-white m-0'>{p.player.rentCost.toLocaleString('en-US', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 3,
                                    })} đ/h</p>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title text-lg text-white d-flex align-items-center">
                                        <Link className='text-decoration-none text-white'>{p.username}</Link>
                                        <IoIosCheckmarkCircle size={20} className='ml-1 text-bgButton' />
                                        <div class="player-status ready"> </div>
                                    </h3>
                                    {p.player.contentStatus ? <p className="card-text text-sm mb-0" style={{ color: "#ADADAD" }}>{p.player.contentStatus}</p> : <br />}
                                    <div className='d-flex align-items-center mt-3'>
                                        <div className='w-50 d-flex'>
                                            {p.player.serviceType.slice(0, 4).map((i, index) => (
                                                <>
                                                    {index < 3 ? (
                                                        <img src={baseUrl + i.image} className='w-6 h-6 rounded-circle mr-1' alt={`Image ${index}`} />
                                                    ) : (
                                                        <div className='rounded-full w-7 h-7 bg-slate-700 flex justify-center items-center opacity-50'><TfiMoreAlt className='text-center' color='white' size={20} /></div>
                                                    )}
                                                </>
                                            ))}

                                        </div>
                                        <div className='w-50 d-flex align-items-center justify-content-end'>
                                            <FaStar size={20} color='#8d68f2' /><p className='font-medium m-0' style={{ color: "#ADADAD" }}>4.8 <span>(355)</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                ))}
            </> : <><h5 className='text-textSecondary my-3'>Không tìm thấy kết quả phù hợp!</h5></>}

        </div>
    )
}
