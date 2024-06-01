import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { FiPlusCircle } from "react-icons/fi";
import '../css/profile.css'
import { useFormik } from 'formik';
import api from '../utils/axiosConfig'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { userInfor } from '../features/userSlice';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { baseUrl } from '../utils/service'
export default function PlayerSetting() {
  const userInfo = useSelector(userInfor);

  const [listService, setListService] = useState();
  const [pickGame, setPickGame] = useState([]);
  useEffect(() => {
    getService();
    if (userInfo !== null) {
      setPickGame(userInfo?.player?.serviceType)
    }
  }, [])
  useEffect(() => {
    setPickGame(userInfo?.player?.serviceType)
  }, [userInfo])
  const getService = async () => {
    try {
      const services = await axios.get("http://localhost:3008/api/service");
      setListService(services.data);
    } catch (error) {
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      rentCost: '',
      introduce: '',
      achivement: '',
      youtube: '',
      facebook: '',
      highlight: '',
      roomVoice: '',
      deviceStatus: '',
    },
    onSubmit: values => {
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values) => {
    try {
      await api.post("/api/user/update-player-profile", values);
      console.log("success");
      toast('Cập nhật thành công!')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast(error.response.data.message)
      } else {
        toast('Xin lỗi: Đang có một vấn đề gì đó xảy ra');
      }
    }
  }

  const handlePickGame = (id) => {
    if (!pickGame.includes(id)) {
      const gameArr = [id, ...pickGame];
      setPickGame(gameArr);
    } else {
      const gameArr = pickGame.filter((game) => {
        return game !== id;
      })
      setPickGame(gameArr);
    }

  }
  console.log(pickGame);
  return (
    <Container>
      <Row>
        <Col md={8}>
          <form onSubmit={formik.handleSubmit}>
            <h1 className='text-white'>Thông tin player</h1>
            <h6 className='title'>Tên game</h6>
            <div className='service-container' style={{ display: "flex", flexWrap: "wrap" }}>
              {
                listService && listService.map((service) => {
                  // const background = service.background.replace()
                  let converted_path = service.background.replaceAll("\\", "/")
                  const url = baseUrl + converted_path;
                  return (
                    <div className={`service ${pickGame && pickGame.includes(service._id) ? "pickedGame" : ""}`} style={{
                      backgroundImage: `url(${url})`,
                      height: "50px",
                      borderRadius: "10px",
                      marginRight: "10px",
                      padding: "0px 10px",
                      cursor: "pointer",
                      marginTop: "20px",
                      minWidth: "100px"
                    }} onClick={() => handlePickGame(service._id)}>
                      <p className="text-white" style={{ textAlign: "center", lineHeight: "50px", fontSize: "13px", fontWeight: "bold" }}>{service.name}</p>
                    </div>
                  )
                })
              }
            </div>
            <h6 className='title' >Chi phí mỗi giờ thuê</h6>
            <Form.Control type='number' style={{ background: "#34363a", padding: "10px 5px" }} className='text-white'
              min={5000} max={10000000}
            />
            <h6 className='title'>Giới thiệu chi tiết về bạn</h6>
            <textarea
              className="text-white w-full h-48 px-2 py-2 mb-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ background: "#34363a" }}
              placeholder="Nhập giới thiệu chi tiết về bạn..."
            ></textarea>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h6 style={{ marginRight: "10px", color: "#90959c", marginBottom: "0" }}>Thành tích</h6> <FiPlusCircle style={{ color: "green", cursor: "pointer" }} />
            </div>
            <h6 className='title' >Kênh youtube</h6>
            <Form.Control type='text' style={{ background: "#34363a", padding: "10px 5px" }} className='text-white' />

            <h6 className='title' >Trang facebook</h6>
            <Form.Control type='text' style={{ background: "#34363a", padding: "10px 5px" }} className='text-white' />

            <h6 className='title' >Link video hightlight</h6>
            <Form.Control type='text' style={{ background: "#34363a", padding: "10px 5px" }} className='text-white' />
            <h6 className='title' >Link room voice</h6>
            <Form.Control type='text' style={{ background: "#34363a", padding: "10px 5px" }} className='text-white' />

            <h6 className='title' >Tình trạng phụ kiện</h6>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Select aria-label="Default select example" className='text-white' style={{ width: "40%", background: "#34363a", padding: "10px 5px" }}>
                <option value={false}>Không cam</option>
                <option value={true}>Có cam</option>
              </Form.Select>
              <Form.Select aria-label="Default select example" className='text-white' style={{ width: "40%", background: "#34363a", padding: "10px 5px" }}>
                <option value={false}>Không mic</option>
                <option value={true}>Có mic</option>
              </Form.Select>
            </div>
            <button type='submit'
              className="bg-[#7b47ff] text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-50"
            >
              Cập nhật
            </button>
          </form>
        </Col>

      </Row>
    </Container>
  );
}
