import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { FiPlusCircle } from "react-icons/fi";
import '../css/profile.css'
import { useFormik } from 'formik';
import api from '../utils/axiosConfig'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { setUserInformation, userInfor } from '../features/userSlice';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { baseUrl } from '../utils/service'
import { IoCloseCircle, IoPencil } from "react-icons/io5";
export default function PlayerSetting() {
  const userInfo = useSelector(userInfor);
  const [listService, setListService] = useState();
  const [pickGame, setPickGame] = useState([]);
  const [achivements, setAchivements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const dispatch = useDispatch();
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewDate('');
    setNewContent('');
    setEditMode(false);
    setCurrentEditId(null);
  };

  const handleAddAchivement = () => {
    console.log(newDate);
    if (newDate !== "" && newContent !== "") {
      setAchivements([...achivements, { id: Date.now(), date: newDate, text: newContent }]);
    }
    handleCloseModal();
  };

  const handleEditAchivement = (id) => {
    const achivement = achivements.find(a => a.id === id);
    setNewDate(achivementDate(achivement.date));
    setNewContent(achivement.text);
    setEditMode(true);
    setCurrentEditId(id);
    handleShowModal();
  };

  const handleSaveEditAchivement = () => {
    setAchivements(achivements.map(a =>
      a.id === currentEditId ? { ...a, date: newDate, text: newContent } : a
    ));
    handleCloseModal();
  };

  const removeAchivement = (id) => {
    setAchivements(achivements.filter(achivement => achivement.id !== id));
  };
  useEffect(() => {
    getService();
    if (userInfo !== null) {
      setPickGame(userInfo?.player?.serviceType)
      if (userInfo && userInfo.player && userInfo.player.achivements) {
        console.log("zoday");
        const editAchivement = userInfo.player.achivements.map((achivement) => {
          return {
            text: achivement.text,
            date: achivement.date,
            id: achivement._id
          }
        })
        setAchivements(editAchivement)
      }
      formik.setValues({
        rentCost: userInfo && userInfo.player && userInfo.player.rentCost ? userInfo.player.rentCost : 5000,
        info: userInfo && userInfo.player && userInfo.player.info ? userInfo.player.info : "",
        youtubeUrl: userInfo && userInfo.player && userInfo.player.youtubeUrl ? userInfo.player.youtubeUrl : "",
        facebookUrl: userInfo && userInfo.player && userInfo.player.facebookUrl ? userInfo.player.facebookUrl : "",
        videoHightlight: userInfo && userInfo.player && userInfo.player.videoHightlight ? userInfo.player.videoHightlight : "",
        roomVoice: userInfo && userInfo.player && userInfo.player.roomVoice ? userInfo.player.roomVoice : "",
        mic: userInfo && userInfo.player && userInfo.player.deviceStatus ? userInfo.player.deviceStatus.mic : false,
        cam: userInfo && userInfo.player && userInfo.player.deviceStatus ? userInfo.player.deviceStatus.cam : false
      })
    }
  }, [])
  useEffect(() => {
    setPickGame(userInfo?.player?.serviceType)
    if (userInfo && userInfo.player && userInfo.player.achivements) {
      console.log("zoday2");

      const editAchivement = userInfo.player.achivements.map((achivement) => {
        return {
          text: achivement.text,
          date: achivement.date,
          id: achivement._id
        }
      })
      setAchivements(editAchivement)
    }
    console.log(userInfo);
    formik.setValues({
      rentCost: userInfo && userInfo.player && userInfo.player.rentCost ? userInfo.player.rentCost : 5000,
      info: userInfo && userInfo.player && userInfo.player.info ? userInfo.player.info : "",
      youtubeUrl: userInfo && userInfo.player && userInfo.player.youtubeUrl ? userInfo.player.youtubeUrl : "",
      facebookUrl: userInfo && userInfo.player && userInfo.player.facebookUrl ? userInfo.player.facebookUrl : "",
      videoHightlight: userInfo && userInfo.player && userInfo.player.videoHightlight ? userInfo.player.videoHightlight : "",
      roomVoice: userInfo && userInfo.player && userInfo.player.roomVoice ? userInfo.player.roomVoice : "",
      mic: userInfo && userInfo.player && userInfo.player.deviceStatus ? userInfo.player.deviceStatus.mic : false,
      cam: userInfo && userInfo.player && userInfo.player.deviceStatus ? userInfo.player.deviceStatus.cam : false
    })
  }, [userInfo])
  const getService = async () => {
    try {
      const services = await axios.get("http://localhost:3008/api/service");
      setListService(services.data);
    } catch (error) {
      console.log(error);
    }
  }
  let formik = useFormik({
    initialValues: {
      rentCost: 5000,
      info: '',
      youtubeUrl: '',
      facebookUrl: '',
      videoHightlight: '',
      roomVoice: '',
      mic: false,
      cam: false
    },
    onSubmit: values => {
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values) => {
    try {
      const filtedAchivement = achivements.map((achivement) => {
        return { date: achivement.date, text: achivement.text }
      })
      console.log(achivements);
      const requestObject = {
        rentCost: values.rentCost,
        info: values.info,
        youtubeUrl: values.youtubeUrl,
        facebookUrl: values.facebookUrl,
        roomVoice: values.roomVoice,
        videoHightlight: values.videoHightlight,
        achivements: JSON.stringify(filtedAchivement),
        deviceStatus: JSON.stringify({
          mic: values.mic,
          cam: values.cam
        }),
        serviceType: JSON.stringify(pickGame)
      }
      const update = await api.post("/api/user/update-player-info", requestObject);
      console.log(update.data);
      dispatch(setUserInformation(update.data.user));
      toast('Cập nhật thành công!')
    } catch (error) {
      console.log(error);
      toast('Cập nhật thất bại!')
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
  const achivementDate = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate
  }

  console.log(userInfo);
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
              value={formik.values.rentCost}
              name='rentCost'
              onChange={formik.handleChange}
            />
            <h6 className='title'>Giới thiệu chi tiết về bạn</h6>
            <textarea
              className="text-white w-full h-48 px-2 py-2 mb-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ background: "#34363a" }}
              placeholder="Nhập giới thiệu chi tiết về bạn..."
              value={formik.values.info}
              name='info'
              onChange={formik.handleChange}
            ></textarea>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h6 style={{ marginRight: "10px", color: "#90959c", marginBottom: "0" }}>Thành tích</h6> <FiPlusCircle style={{ color: "green", cursor: "pointer" }} onClick={handleShowModal} />
            </div>
            <div className='achivementContainer'>
              {
                achivements && achivements.map(achivement => (
                  <div key={achivement.id} className='achivement' style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <Form.Control type='date' value={achivementDate(achivement.date)} readOnly style={{ background: "#34363a", padding: "10px 5px", width: "30%", height: "50px" }} className='text-white' />
                    <Form.Control as="textarea" rows={3} value={achivement.text} readOnly style={{ background: "#34363a", padding: "10px 5px", width: "60%" }} className='text-white' />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IoPencil style={{ fontSize: "20px", color: "blue", cursor: "pointer", marginRight: '10px', fontWeight: "bold" }} onClick={() => handleEditAchivement(achivement.id)} />
                      <IoCloseCircle style={{ fontSize: "20px", color: "red", cursor: "pointer" }} onClick={() => removeAchivement(achivement.id)} />
                    </div>
                  </div>
                ))
              }

            </div>
            <h6 className='title' >Kênh youtube</h6>
            <Form.Control type='text' style={{ background: "#34363a", padding: "10px 5px" }} className='text-white'
              value={formik.values.youtubeUrl}
              onChange={formik.handleChange}
              name='youtubeUrl' />

            <h6 className='title' >Trang facebook</h6>
            <Form.Control type='text' style={{ background: "#34363a", padding: "10px 5px" }} className='text-white'
              value={formik.values.facebookUrl}
              onChange={formik.handleChange}
              name='facebookUrl' />

            <h6 className='title' >Link video hightlight</h6>
            <Form.Control type='text' style={{ background: "#34363a", padding: "10px 5px" }} className='text-white'
              value={formik.values.videoHightlight}
              onChange={formik.handleChange}
              name='videoHightlight' />
            <h6 className='title' >Link room voice</h6>
            <Form.Control type='text' style={{ background: "#34363a", padding: "10px 5px" }} className='text-white'
              value={formik.values.roomVoice}
              onChange={formik.handleChange}
              name='roomVoice' />

            <h6 className='title' >Tình trạng phụ kiện</h6>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Select aria-label="Default select example" className='text-white' style={{ width: "40%", background: "#34363a", padding: "10px 5px" }}
                value={formik.values.cam}
                name='cam'
                onChange={formik.handleChange}>
                <option value={false}>Không cam</option>
                <option value={true}>Có cam</option>
              </Form.Select>
              <Form.Select aria-label="Default select example" className='text-white' style={{ width: "40%", background: "#34363a", padding: "10px 5px" }}
                value={formik.values.mic}
                onChange={formik.handleChange}
                name='mic'>
                <option value={false}>Không mic</option>
                <option value={true}>Có mic</option>
              </Form.Select>
            </div>
            <Button type='submit'
              className="text-white mt-20 mb-20" style={{ width: "100%" }}
            >
              Cập nhật
            </Button>
          </form>
        </Col>

      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Chỉnh sửa Thành Tích' : 'Thêm Thành Tích'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type='date' value={newDate} onChange={(e) => setNewDate(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} value={newContent} onChange={(e) => setNewContent(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={editMode ? handleSaveEditAchivement : handleAddAchivement}>
            {editMode ? 'Save Changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
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
        transition={Bounce} />
    </Container>
  );
}
