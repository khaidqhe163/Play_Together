import React from 'react'
import avatarls1 from '../assets/avatals1.jpg'
import { Link } from 'react-router-dom'
import pubg from '../assets/pubg.jpg'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
export default function ListPlayer() {
    return (
        <div className='row'>
            <div className='col-md-3 mb-5'>
                <Link className='text-decoration-none'>
                    <div className="card rounded-4 relative" style={{ boxShadow: "0px 0px 0px 0px #0000", width: "18rem", backgroundColor: "#20202b" }}>
                        <img className="card-img-top rounded-top-4" src={avatarls1} alt="Card image cap" />
                        <div className='absolute bg-bgButton rounded-4 px-2 py-1 right-2 bottom-36'>
                            <p className='text-white m-0'>80.000 đ/h</p>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title text-lg text-white d-flex align-items-center">
                                <Link className='text-decoration-none text-white'>Happy</Link>
                                <IoIosCheckmarkCircle size={20} className='ml-1 text-bgButton' />
                                <div class="player-status ready"> </div>
                            </h3>
                            <p className="card-text text-sm" style={{ color: "#ADADAD" }}>Cô bé này là của anh ❤️</p>
                            <div className='d-flex align-items-center'>
                                <div className='w-50 d-flex'>
                                    <img src={pubg} className='w-6 h-6 rounded-circle mr-1' />
                                    <img src={pubg} className='w-6 h-6 rounded-circle mr-1' />
                                    <img src={pubg} className='w-6 h-6 rounded-circle mr-1' />
                                </div>
                                <div className='w-50 d-flex align-items-center justify-content-end'>
                                    <FaStar size={20} color='#8d68f2' /><p className='font-medium m-0' style={{ color: "#ADADAD" }}>4.8 <span>(627)</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

        </div>
    )
}
