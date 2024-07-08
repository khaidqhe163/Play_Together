import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaGamepad, FaUserCircle, FaKey, FaHistory, FaCog, FaList, FaBook } from 'react-icons/fa';
import { AiFillSchedule } from "react-icons/ai";
import { BiSolidPhotoAlbum } from "react-icons/bi"; // Importing icons
import '../App.css';

export default function AccountSettings() {
    const containerStyle = {
        backgroundColor: "#20202b",
        width: "100%",
        position: "sticky",
        height: "calc(100vh - 70px)",
        overflowY: "auto",
        padding: "20px",
    };

    const headingStyle = {
        color: "#bcbcbc",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "left",
        cursor: "pointer",
        margin: "0",
    };

    const dropdownContentStyle = {
        color: "#bcbcbc",
        paddingLeft: "20px",
        paddingTop: "10px",
        paddingBottom: "10px",
    };

    return (
        <div style={containerStyle}>
            <div>
                <p style={headingStyle}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FaUser style={{ marginRight: "5px" }} />
                        <span className="hover:text-gray-300">TÀI KHOẢN</span>
                    </div>
                </p>
                <div style={dropdownContentStyle}>
                    <NavLink to="/profile" className="text-gray-300 hover:text-gray-400" style={{ textDecoration: 'none' }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FaUserCircle style={{ marginRight: "5px" }} />
                            <span>Thông tin cá nhân</span>
                        </div>
                    </NavLink>
                    <br />
                    <NavLink to="/change-password" className="text-gray-300 hover:text-gray-400" style={{ textDecoration: 'none' }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FaKey style={{ marginRight: "5px" }} />
                            <span>Đổi mật khẩu</span>
                        </div>
                    </NavLink>
                    <br />
                    <NavLink to="/customer-history" className="text-gray-300 hover:text-gray-400" style={{ textDecoration: 'none' }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FaHistory style={{ marginRight: "5px" }} />
                            <span>Lịch sử giao dịch</span>
                        </div>
                    </NavLink>
                </div>
                <p style={headingStyle}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FaGamepad style={{ marginRight: "5px" }} />
                        <span className="hover:text-gray-300">PLAYER</span>
                    </div>
                </p>
                <div style={dropdownContentStyle}>
                    <NavLink to="/player-setting" className="text-gray-300 hover:text-gray-400" style={{ textDecoration: 'none' }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FaCog style={{ marginRight: "5px" }} />
                            <span>Tổng quan</span>
                        </div>
                    </NavLink>
                    <br />
                    <NavLink to="/player-album" className="text-gray-300 hover:text-gray-400" style={{ textDecoration: 'none' }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <BiSolidPhotoAlbum style={{ marginRight: "5px" }} />
                            <span>Album ảnh của bạn</span>
                        </div>
                    </NavLink>
                    <br />
                    <NavLink to="/player-history" className="text-gray-300 hover:text-gray-400" style={{ textDecoration: 'none' }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FaHistory style={{ marginRight: "5px" }} />
                            <span>Lịch sử nhận Duo, Donate</span>
                        </div>
                    </NavLink>
                    <br />
                    <NavLink to="/player-setting-duo" className="text-gray-300 hover:text-gray-400" style={{ textDecoration: 'none' }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FaCog style={{ marginRight: "5px" }} />
                            <span>Cài đặt Duo</span>
                        </div>
                    </NavLink>
                    <br />
                    <NavLink to="/player-block-list" className="text-gray-300 hover:text-gray-400" style={{ textDecoration: 'none' }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FaList style={{ marginRight: "5px" }} />
                            <span>Danh sách chặn</span>
                        </div>
                    </NavLink>
                    <br />
                    <NavLink to="/player-guide" className="text-gray-300 hover:text-gray-400" style={{ textDecoration: 'none' }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FaBook style={{ marginRight: "5px" }} />
                            <span>Hướng dẫn</span>
                        </div>
                    </NavLink>
                    <br />
                    <NavLink to="/player-schedule" className="text-gray-300 hover:text-gray-400" style={{ textDecoration: 'none' }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <AiFillSchedule size={20}  style={{ marginRight: "5px" }} />
                            <span>Thiết lập lịch Duo</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
