import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import "../../../../css/reportdetail.css"
import { LuEye } from 'react-icons/lu';
import axios from 'axios';
import { baseUrl, formatDate } from '../../../../utils/service';
import ImageGallery from '../../../../components/ImageGallery';
function ReportPlayerModal({ lgShow, setLgShow, id, reports, setReports }) {
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
            const report = await axios.get("http://localhost:3008/api/report/report-player/" + id)
            setReport(report.data)
        }
        getReport();
    }, [])
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
            const res = await axios.post("http://localhost:3008/api/report/process-report-player", {
                playerId: report.accused._id,
                complaint: complaint,
                reason: des.current.value,
                reportId: report._id
            });
            const updatedReports = reports.map((r) => {
                if (r._id !== report._id) {
                    return r;
                } else return report
            })
            setReports(updatedReports);
            setReport(null);
            setCurrentImageIndex(0);
            setLgShow(false);
        } catch (error) {
            console.log(error);
        }
    }
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
                <p><b>Người tố cáo</b>: {report?.owner.username} ({report?.owner._id})</p>
                <p><b>Người bị tố cáo</b>: {report?.accused.username} ({report?.accused._id})</p>
                <p><b>Lý do tố cáo</b>: {report?.reportReason.content}</p>
                <p><b>Ngày tố cáo</b>: {formatDate(report?.createdAt)}</p>
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
                                <option value={1} style={{ color: "black" }}>Gửi cảnh cáo</option>
                                <option value={2} style={{ color: "black" }}>Cấm tài khoản 3 ngày</option>
                                <option value={3} style={{ color: "black" }}>Cấm tài khoản 7 ngày</option>
                                <option value={4} style={{ color: "black" }}>Cấm tài khoản 1 tháng</option>
                                <option value={5} style={{ color: "black" }}>Cấm tài khoản vĩnh viễn</option>
                            </Form.Select>

                            {
                                complaint >= 1 && (
                                    <>
                                        <Form.Label htmlFor="des" className='mt-10' style={{ color: "black" }}>
                                            {complaint == 1 ? "Nội dung" : "Lý do cấm tài khoản"}
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            id="des"
                                            rows={5}
                                            defaultValue=""
                                            ref={des}
                                            onChange={disableSubmit}
                                        />
                                    </>
                                )
                            }
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
        </Modal>
    )
}

export default ReportPlayerModal
