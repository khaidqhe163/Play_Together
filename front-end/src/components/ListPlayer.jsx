import React from 'react'
import avatarls1 from '../assets/avatals1.jpg'
import avatarls2 from '../assets/avatals2.jpg'
import avatarls3 from '../assets/avatals3.jpg'
import avatarls4 from '../assets/avatals4.jpg'
import { Link } from 'react-router-dom'
import pubg from '../assets/pubg.jpg'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
export default function ListPlayer() {
    const listPlayer = [{
        image: avatarls1,
        price: 80000,
        name: "Happy",
        subcription: "Cô bé này là của anh ❤️",
        vote: 4.8,
        numberVote: 627
    },
    {
        image: avatarls2,
        price: 80000,
        name: "Happy",
        subcription: "Cô bé này là của anh ❤️",
        vote: 4.8,
        numberVote: 627
    },
    {
        image: avatarls3,
        price: 70000,
        name: "Windy",
        subcription: "Đến và lấp đầy trái tim em đi ❤️",
        vote: 4.9,
        numberVote: 500
    },
    {
        image: avatarls4,
        price: 70000,
        name: "Windy",
        subcription: "Đến và lấp đầy trái tim em đi ❤️",
        vote: 4.9,
        numberVote: 500
    },
    {
        image: avatarls2,
        price: 70000,
        name: "Windy",
        subcription: "Đến và lấp đầy trái tim em đi ❤️",
        vote: 4.9,
        numberVote: 500
    },
    ]
    return (
        <div className='row'>
            {listPlayer.map(p => (
                <div className='col-md-3 mb-4'>
                    <Link className='text-decoration-none'>
                        <div className="card rounded-4 relative" style={{ boxShadow: "0px 0px 0px 0px #0000", width: "15rem", backgroundColor: "#20202b" }}>
                            <img className="card-img-top rounded-top-4" src={p.image} alt="Card image cap" />
                            <div className='absolute bg-bgButton rounded-4 px-2 py-1 right-2 bottom-36'>
                                <p className='text-white m-0'>{p.price.toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 3,
                                })} đ/h</p>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title text-lg text-white d-flex align-items-center">
                                    <Link className='text-decoration-none text-white'>{p.name}</Link>
                                    <IoIosCheckmarkCircle size={20} className='ml-1 text-bgButton' />
                                    <div class="player-status ready"> </div>
                                </h3>
                                <p className="card-text text-sm" style={{ color: "#ADADAD" }}>{p.subcription}</p>
                                <div className='d-flex align-items-center'>
                                    <div className='w-50 d-flex'>
                                        <img src={pubg} className='w-6 h-6 rounded-circle mr-1' />
                                        <img src={pubg} className='w-6 h-6 rounded-circle mr-1' />
                                        <img src={pubg} className='w-6 h-6 rounded-circle mr-1' />
                                    </div>
                                    <div className='w-50 d-flex align-items-center justify-content-end'>
                                        <FaStar size={20} color='#8d68f2' /><p className='font-medium m-0' style={{ color: "#ADADAD" }}>{p.vote} <span>({p.numberVote})</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

            ))}

        </div>
    )
}
