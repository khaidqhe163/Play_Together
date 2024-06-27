import { useState } from "react";
import {
  IoGameControllerOutline,
  IoHomeOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { MdOutlineWorkHistory } from "react-icons/md";
import { FaUserShield, FaRegBell } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import RankingModal from "../components/Modal/RankingModal";
import StoryModal from "../components/Modal/StoryModal";
import { userInfor, setUserInformation } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../utils/service.js";
import { MdOutlineAdd } from "react-icons/md";
import RechargeModal from "../components/Modal/RechargeModal/RechageModal.jsx";
import { getNav, setActiveButton } from "../features/navSlice.js";
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify';
export default function NavBar() {
  // const [activeButton, setActiveButton] = useState(null);
  const dispatch = useDispatch();
  const [openModalRanking, setOpenModalRanking] = useState();
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const userInfo = useSelector(userInfor);
  const activeButton = useSelector(getNav);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const nav = useNavigate();
  const fontF = {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 500,
    fontSize: "19px",
    textDecoration: "none",
    color: "#fff",
  };

  const bgButton = {
    width: "50px",
    height: "50px",
    backgroundColor: "#333345",
    transition: "background-color 0.5s ease-in-out",
  };
  const bgButtonMoney = {
    width: "150px",
    height: "50px",
    backgroundColor: "#333345",
    transition: "background-color 0.5s ease-in-out",
    borderRadius: "50px",
  };
  const bgButtonActive = {
    width: "50px",
    height: "50px",
    backgroundColor: "#8d68f2",
  };

  const handleButtonClick = (buttonName) => {
    dispatch(setActiveButton(buttonName));
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3008/api/user/logout", {},
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      dispatch(setUserInformation(null));
      toast("Đăng xuất thành công!");
      nav('/login')
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <div
      className="row d-flex justify-content-center align-items-center py-2 navbar-wrapper"
      style={{
        backgroundColor: "#20202b",
        height: "70px",
        zIndex: "100",
        borderBottom: "1px solid black",
      }}
    >


      <div className="col-sm-3 d-flex">
        <Link to={"/"}>
          <IoGameControllerOutline color="white" size={35} />
        </Link>
      </div>
      <div className="col-sm-6 text-center">
        <Link
          to={"/"}
          className="btn mx-3 rounded-circle navb"
          style={activeButton === "home" ? bgButtonActive : bgButton}
          onClick={() => handleButtonClick("home")}
        >
          <div className="d-flex justify-content-center align-items-center">
            <IoHomeOutline color="white" size={35} />
          </div>
        </Link>
        <Link
          to={"/stories"}
          className="btn mx-3 rounded-circle navb"
          style={activeButton === "videocam" ? bgButtonActive : bgButton}
          onClick={() => handleButtonClick("videocam")}
        >
          <div className="d-flex justify-content-center align-items-center">
            <IoVideocamOutline color="white" size={35} />
          </div>
        </Link>
        <Link
          className="btn mx-3 rounded-circle navb"
          style={activeButton === "trophy" ? bgButtonActive : bgButton}
          onClick={() => handleButtonClick("trophy")}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            onClick={() => setOpenModalRanking(true)}
          >
            <GoTrophy color="white" size={35} />
          </div>
        </Link>
      </div>
      <div className="col-sm-3 d-flex justify-content-end align-items-center">
        {userInfo && userInfo !== null ? (
          <>
            <Link to={"/list-booking/my-booking"} className="btn mx-2 rounded-circle" style={activeButton === "booking" ? bgButtonActive : bgButton}
              onClick={() => handleButtonClick("booking")}>
              <div className="d-flex justify-content-center align-items-center">
                <MdOutlineWorkHistory color="white" size={35} />
              </div>
            </Link>
            <Link to={"/"} className="btn mx-2 rounded-circle" style={bgButton}>
              <div className="d-flex justify-content-center align-items-center">
                <FaRegBell color="white" size={35} />
              </div>
            </Link>
            {userInfo !== null && (<div className="btn mx-2 text-white d-flex text-center justify-content-center align-items-center" style={bgButtonMoney} onClick={() => setOpenModalPayment(true)}>
              <MdOutlineAdd size={22} className='font-black' /><span className='font-bold'> {userInfo.accountBalance} đ</span>
            </div>)}
          </>
        ) : null}
        {!userInfo || userInfo === null ? (
          <>
            <Link to={"/login"} className="mx-2" style={fontF}>
              <div
                className="d-inline-block p-10 rounded-pill"
                style={{ backgroundColor: "#333345" }}
              >
                Đăng nhập
              </div>
            </Link>
            <Link to={"/register"} className="mx-2" style={fontF}>
              <div
                className="d-inline-block p-10 rounded-pill"
                style={{ backgroundColor: "#8d68f2" }}
              >
                Đăng ký
              </div>
            </Link>
          </>
        ) : (
          <div className="relative">
            <img
              className="w-12 h-12 rounded-circle object-cover object-center cursor-pointer"
              src={baseUrl + userInfo.avatar}
              onClick={handleDropdownToggle}
              alt="user avatar"
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg z-50 text-white" style={{ backgroundColor: "#212529", }}>
                <Link to={`/player-profile/${userInfo._id}`} style={{ textDecoration: 'none' }}>
                  <div className="px-4 py-3 flex justify-between items-center">
                    <img
                      className="w-12 h-12 mr-6 rounded-full object-cover object-center"
                      src={baseUrl + userInfo.avatar}
                      alt="user avatar"
                    />
                    <div className="ml-4 flex-grow">
                      <span className="block text-sm text-white">
                        {userInfo.username}
                      </span>
                      <span className="block text-sm text-gray-500 truncate">
                        Xem trang player của bạn
                      </span>
                    </div>
                  </div>
                </Link>
                <ul className="py-2">
                  <li>
                    <Link
                      to={"/profile"}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-gray-400 "
                      style={{ textDecoration: 'none' }}
                    >
                      Cài đặt tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleLogout()}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-gray-400"
                      style={{ textDecoration: 'none' }}
                    >
                      Đăng xuất
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {!!openModalRanking && (
        <RankingModal
          open={openModalRanking}
          onCancel={() => setOpenModalRanking(undefined)}
        // onOk={getList}
        />
      )}
      <RechargeModal
        show={openModalPayment}
        handleClose={() => setOpenModalPayment(false)}
      />
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce} /> */}
    </div>
  );
}
