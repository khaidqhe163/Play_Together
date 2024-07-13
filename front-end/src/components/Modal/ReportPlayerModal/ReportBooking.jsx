import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import '../../../css/reportplayer.css'
import { IoCloseOutline } from 'react-icons/io5';
import { CiImageOn } from "react-icons/ci";
import { LuEye } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import ImageGallery from '../../ImageGallery'
import axios from 'axios';
import api from '../../../utils/axiosConfig'
import { toast } from 'react-toastify';
function ReportBooking({ show, handleClose, currentBooking, setCurrentBooking, listBooking, setListBooking }) {
    const inputFile = useRef();
    const [files, setFiles] = useState(null);
    const [images, setImages] = useState(null);
    const type = useRef();
    const title = useRef();
    const des = useRef();
    const submit = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reportReason, setReportReason] = useState(null);
    const [disabledBtn, setDisabledBtn] = useState(true);
    useEffect(() => {
        const getPlayerReportReason = async () => {
            try {
                const data = await axios.get("http://localhost:3008/api/report-reason/3");
                setReportReason(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getPlayerReportReason();
    }, [])
    const handleChooseFile = () => {
        if (inputFile) {
            inputFile.current.click();
        }
    }
    const handleGetImages = (e) => {
        const img = [];
        for (let i = 0; i < e.target.files.length; i++) {
            img.push(URL.createObjectURL(e.target.files[i]))
        }
        setFiles(e.target.files)
        setImages(img);
    }
    const handleCloseModal = () => {
        setFiles(null);
        setImages(null);
        setCurrentBooking(null);
        handleClose();
    }

    const handleDeleteImage = (index) => {
        const arrFiles = Array.from(files);
        const newFiles = arrFiles.filter((_, i) => i !== index);
        const dataTransfer = new DataTransfer();
        newFiles.forEach(file => dataTransfer.items.add(file));
        inputFile.current.files = dataTransfer.files;
        setFiles(dataTransfer.files);
        const img = newFiles.map(file => URL.createObjectURL(file));
        setImages(img);
    }

    const checkSubmit = () => {
        if (type.current.value !== "" && title.current.value !== "" && des.current.value !== "") {
            setDisabledBtn(false)
        }
        else setDisabledBtn(true)
    }

    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
    };
    const closeModal = () => {
        console.log("click here");
        setIsOpen(false);
    };
    const previousImage = (e) => {
        e.stopPropagation()
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextImage = (e) => {
        e.stopPropagation()
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleSubmit = async () => {
        console.log("helelo");
        try {
            const form = new FormData();
            for (let i = 0; i < files.length; i++) {
                form.append("images", files[i]);
            }
            form.append("title", title.current.value);
            form.append("type", type.current.value);
            form.append("description", des.current.value);
            form.append("bookingId", currentBooking._id);
            form.append("playerId", currentBooking.playerId);

            console.log(files);
            const report = await api.post("/api/report/report-booking", form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast("Report của bạn đã được gửi thành công")
            const updatedBookings = listBooking.map((l) => {
                if (l._id === currentBooking._id) {
                    l.reported = true;
                    return l;
                } else return l;
            })
            setFiles(null);
            setImages(null);
            setDisabledBtn(true);
            setListBooking(updatedBookings)
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }
    console.log(currentBooking);
    return (
        <>
            <Modal show={show} onHide={handleClose} id="report-modal" centered backdrop="static"
                keyboard={false}>
                <Modal.Body style={{ background: "#20202b", color: 'white' }}>
                    <div className='d-flex justify-content-between'>
                        <h4>Report</h4>
                        <IoCloseOutline style={{ fontSize: '35px', cursor: "pointer" }} onClick={handleCloseModal} />
                    </div>
                    <Form.Label htmlFor="type" className='mt-20'>Kiểu</Form.Label>
                    <Form.Select id='type' ref={type} onChange={checkSubmit}>
                        <option value="" disabled selected hidden>Hãy chọn loại báo cáo</option>
                        {
                            reportReason?.map((r) => {
                                return (
                                    <option value={r._id}>{r.content}</option>
                                )
                            })
                        }
                    </Form.Select>
                    <Form.Label htmlFor="title" className='mt-20'>Tiêu đề</Form.Label>
                    <Form.Control
                        type="text"
                        id="title"
                        placeholder='Mô tả ngắn gọn vấn đề của bạn'
                        ref={title}
                        defaultValue=""
                        onChange={checkSubmit}
                    />
                    <Form.Label htmlFor="des" className='mt-20'>Mô tả chi tiết</Form.Label>
                    <Form.Control
                        as="textarea"
                        id="des"
                        rows={5}
                        placeholder='Hãy mô tả chi tiết vấn đề của bạn'
                        ref={des}
                        defaultValue=""
                        onChange={checkSubmit}
                    />
                    <Form.Label className='mt-20'>Chụp màn hình <small>(không bắt buộc)</small></Form.Label>
                    <div className='d-flex flex-wrap'>
                        {
                            images?.map((img, index) => {
                                return (
                                    <div className='screen-shot mb-5' >
                                        <div className='screen-shot-img' style={{
                                            backgroundImage: `url(${img})`, backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}>
                                            <div className='screen-shot-action d-flex justify-content-center align-items-center'>
                                                <LuEye
                                                    onClick={() => { openModal(index) }} />
                                                <MdDeleteOutline onClick={() => handleDeleteImage(index)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div id='import-screenshot' onClick={handleChooseFile}>
                            <CiImageOn />
                        </div>
                    </div>
                    <input type='file' style={{ display: "none" }} ref={inputFile} multiple accept='image/*' onChange={handleGetImages}></input>

                    <div className='report-action mt-20'>
                        <button onClick={handleCloseModal}>Cancle</button>
                        <button className={disabledBtn ? "disable-btn" : "activeBtn"} disabled={disabledBtn} ref={submit}
                            onClick={handleSubmit}>Submit</button>
                    </div>
                    {
                        images && <ImageGallery image={images[currentImageIndex]} isOpen={isOpen} closeModal={closeModal} previousImage={previousImage} nextImage={nextImage} />
                    }
                </Modal.Body>

            </Modal>

        </>
    )
}

export default ReportBooking
