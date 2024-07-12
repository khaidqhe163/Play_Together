import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import "../../../../css/reportdetail.css"
import { LuEye } from 'react-icons/lu';
import axios from 'axios';
import { baseUrl, formatDate, formatMoney } from '../../../../utils/service';
import ImageGallery from '../../../../components/ImageGallery';
function ReportBookingModal({ lgShow, setLgShow, id, reports, setReports }) {
    const [complaint, setComplaint] = useState(null);
    const des = useRef();
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [report, setReport] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
            prevIndex === 0 ? report?.screenShot.length - 1 : prevIndex - 1
        );
    };
    const nextImage = (e) => {
        e.stopPropagation()
        setCurrentImageIndex((prevIndex) =>
            prevIndex === report?.screenShot.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const getReport = async () => {
            try {
                const report = await axios.get("http://localhost:3008/api/report/report-booking/" + id)
                console.log(report.data);
                setReport(report.data)
            }
            catch (error) {
                console.log(error);
            }
        }
        getReport();
    }, [id])
    useEffect(() => {
        if (complaint === null) return;
        disableSubmit();
    }, [complaint])
    const disableSubmit = () => {
        if (complaint == 0) {
            setDisabledBtn(false);
        } else {
            if (des && des.current?.value !== "") {
                setDisabledBtn(false);
            }
            else setDisabledBtn(true)
        }
    }

    const processReport = async () => {
        try {
            const res = await axios.post("http://localhost:3008/api/report/process-report-booking", {
                bookingId: report.bookingId,
                complaint: complaint,
                reportId: report._id
            });
            console.log(res.status);
            const updatedReports = reports.map((r) => {
                if (r._id !== report._id) {
                    return r;
                } else {
                    return res.data
                }

            })
            setReports(updatedReports);
            setReport(null);
            setCurrentImageIndex(0);
            setLgShow(false);
        } catch (error) {
            console.log(error);
        }
    }
    const formatTimeH = (time) => {
        time = Number(time);
        const hours = Math.floor(time);
        const minutes = (time - hours) * 60;
        const formattedMinutes = minutes === 0 ? `0${minutes}` : minutes;
        return `${hours}:${formattedMinutes}`;
    };

    const formatTime = (d) => {
        const t = new Date(d);
        let hours = t.getHours();
        let minutes = t.getMinutes();
        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}`;
    };

    const formatEndTime = (d, unit) => {
        console.log(unit);
        console.log(d);
        const t = new Date(d).getTime();
        const end = t + (unit * 30 * 60 * 1000);
        const endTime = new Date(end);
        let hours = endTime.getHours();
        let minutes = endTime.getMinutes();
        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}`;
    };

    console.log(report);
    return (
        <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
            id="report-detail"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Chi tiết đơn tố cáo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col md={3}><p><b>Người tố cáo</b>: </p></Col>
                        <Col md={9}>{report?.owner.username} ({report?.owner._id})</Col>
                    </Row>
                    <Row>
                        <Col md={3}><p><b>Người bị tố cáo</b>: </p></Col>
                        <Col md={9}>{report?.accused.username} ({report?.accused._id})</Col>
                    </Row>
                    <Row>
                        <Col md={3}><p><b>Lý do tố cáo</b>: </p></Col>
                        <Col md={9}>{report?.reportReason.content}</Col>
                    </Row>
                    <Row>
                        <Col md={3}><p><b>Ngày tố cáo</b>: </p></Col>
                        <Col md={9}>{report?.bookingId.hours.length === 0 ? formatDate(report?.bookingId.createdAt) : formatDate(report?.bookingId.hours[0].date)}</Col>
                    </Row>
                    <Row>
                        <Col md={3}><p><b>Số tiền</b>: </p></Col>
                        <Col md={9}>{formatMoney(report?.bookingId.price)}</Col>
                    </Row>
                    {report?.bookingId.hours.length !== 0 && (
                        <>
                            <Row>
                                <Col md={3}> <p><b>Ngày thuê</b>: </p></Col>
                                <Col md={9}>{formatDate(report?.bookingId.createdAt)}</Col>
                            </Row>
                            <Row>

                                <Col md={3}> <p><b>Khung giờ thuê</b>: </p></Col>
                                <Col md={9}> {
                                    report?.bookingId.hours.map((h) => {
                                        return (
                                            <p> {formatTimeH(h.start)} - {formatTimeH(h.end)}</p>
                                        )
                                    })
                                }</Col>
                            </Row>

                        </>
                    )
                    }
                    {report?.bookingId.hours.length === 0 && (
                        <>
                            <Row>
                                <Col md={3}> <p><b>Ngày thuê</b>: </p></Col>
                                <Col md={9}>{formatDate(report?.bookingId.createdAt)}</Col>
                            </Row>
                            <Row>

                                <Col md={3}> <p><b>Khung giờ thuê</b>: </p></Col>
                                <Col md={9}> <p>{formatTime(report?.bookingId.createdAt)} - {formatEndTime(report?.bookingId.createdAt, report?.bookingId.unit)}</p></Col>
                            </Row>

                        </>
                    )
                    }
                </Container>

                <h5>{report?.title}</h5>
                <p>{report?.description}</p>
                <div className='d-flex flex-wrap'>
                    {
                        report?.screenShot?.map((s, index) => {
                            let converted_path = s.replaceAll("\\", "/")
                            const url = baseUrl + converted_path;
                            return (
                                <div className='report-screen-shot mb-5' >
                                    <div className='report-screen-shot-img' style={{
                                        backgroundImage: `url('${url}')`, backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}>
                                        <div className='report-screen-shot-action d-flex justify-content-center align-items-center'>
                                            <LuEye onClick={() => openModal(index)} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    report?.status && report?.status === 2 && (
                        <p><b>Hình thức xử lý</b>: {report.formsProcessing}</p>
                    )
                }
                {
                    report?.status && report?.status === 1 && (
                        <>
                            <h5 className='mt-20'>Xử lý khiếu nại</h5>
                            <Form.Label className='mt-10' style={{ color: "black" }}>Hình thức xử lý</Form.Label>
                            <Form.Select style={{ color: "black" }} onChange={(e) => { setComplaint(e.target.value) }}>
                                <option value="" disabled selected hidden>Chọn hình thức xử lý</option>
                                <option value={0} style={{ color: "black" }}>Từ chối đơn tố cáo</option>
                                <option value={1} style={{ color: "black" }}>Hoàn tiền</option>
                            </Form.Select>
                            <Button variant='success' style={{
                                padding: "10px 30px",
                                marginTop: "20px"
                            }} disabled={disabledBtn} onClick={processReport}>Xử lý</Button>
                        </>
                    )
                }

            </Modal.Body>
            {
                report && report?.screenShot && <ImageGallery image={report.screenShot[currentImageIndex]} isOpen={isOpen} closeModal={closeModal} previousImage={previousImage} nextImage={nextImage} />
            }
        </Modal >
    )
}

export default ReportBookingModal
