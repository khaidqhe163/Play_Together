import { useState } from 'react';
import { IoGameControllerOutline, IoHomeOutline, IoVideocamOutline } from "react-icons/io5";
import { FaUserShield, FaRegBell } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { Link } from 'react-router-dom';
import '../App.css';

export default function NavBar() {
    const [activeButton, setActiveButton] = useState(null);

    const fontF = {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: "19px",
        textDecoration: 'none',
        color: "#fff",
    };

    const bgButton = { width: '50px', height: '50px', backgroundColor: "#333345", transition: "background-color 0.5s ease-in-out" };
    const bgButtonActive = { width: '50px', height: '50px', backgroundColor: "#8d68f2" };

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className='row d-flex justify-content-center align-items-center py-2 navbar-wrapper' style={{ backgroundColor: "#20202b", height: "70px", zIndex: "100" }}>
            <div className='col-sm-3 d-flex'>
                <Link to={'/home'}><IoGameControllerOutline color="white" size={35} /></Link>
            </div>
            <div className='col-sm-6 text-center'>
                <Link to={'/home'} className="btn mx-3 rounded-circle navb" style={activeButton === 'home' ? bgButtonActive : bgButton} onClick={() => handleButtonClick('home')}>
                    <div className="d-flex justify-content-center align-items-center">
                        <IoHomeOutline color="white" size={35} />
                    </div>
                </Link>
                <Link to={'/stories'} className="btn mx-3 rounded-circle navb" style={activeButton === 'videocam' ? bgButtonActive : bgButton} onClick={() => handleButtonClick('videocam')}>
                    <div className="d-flex justify-content-center align-items-center">
                        <IoVideocamOutline color="white" size={35} />
                    </div>
                </Link>
                <Link to={'/home'} className="btn mx-3 rounded-circle navb" style={activeButton === 'trophy' ? bgButtonActive : bgButton} onClick={() => handleButtonClick('trophy')}>
                    <div className="d-flex justify-content-center align-items-center">
                        <GoTrophy color="white" size={35} />
                    </div>
                </Link>
            </div>
            <div className='col-sm-3 d-flex justify-content-end align-items-center'>
                <Link to={'/home'} className="btn mx-2 rounded-circle" style={bgButton}>
                    <div className="d-flex justify-content-center align-items-center">
                        <FaUserShield color="white" size={35} />
                    </div>
                </Link>
                <Link to={'/home'} className="btn mx-2 rounded-circle" style={bgButton}>
                    <div className="d-flex justify-content-center align-items-center">
                        <FaRegBell color="white" size={35} />
                    </div>
                </Link>
                <Link to={'/home'} className="mx-2" style={fontF}>
                    <div className="d-inline-block p-2 rounded-pill" style={{ backgroundColor: "#333345" }}>
                        Đăng nhập
                    </div>
                </Link>
                <Link to={'/home'} className="mx-2" style={fontF}>
                    <div className="d-inline-block p-2 rounded-pill" style={{ backgroundColor: "#8d68f2" }}>
                        Đăng ký
                    </div>
                </Link>
            </div>
        </div>
    );
};
