import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import { Button, Col, Row, Spin } from "antd";
import axios from "axios";
import { ContainerPage } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteReportReasonModal from "./Modal/DeleteReportReason";
import UpdateReportReasonModal from "./Modal/UpdateReportReason";
import CreateReportReasonModal from "./Modal/CreateReportReason";

const ReportReason = () => {
    const [loading, setLoading] = useState(false)
    const [reportReason, setReportReason] = useState([])
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)

    const getAllReportsReason = async () => {
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:3008/api/report-reason/getAllReportsReason')
            setReportReason(res?.data?.reports)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllReportsReason()
    }, [])
    
    return (  
        <LayoutAdmin>
            <Spin spinning={loading}>
                <ContainerPage>
                    <div className="mt-20 mr-50 d-flex-end">
                        <Button type="primary" danger onClick={() => setOpenModalCreate(true)}>
                            Tạo phản hồi
                        </Button>
                    </div>
                    <Row gutter={[16, 24]}>
                        <Col span={12}>
                            <div className="title">
                                <h6>Lý do báo cáo Video</h6>
                            </div>
                            <div className="data">
                                <div style={{height: '80px'}}></div>
                                <div>
                                    <table className="data_table">
                                        <tbody>
                                            {
                                                reportReason.filter(r => r?.type === 1).map((r, i) => (
                                                    <tr key={i}>
                                                        <td className="px-6 py-3" style={{width: '80%'}}>
                                                            {r?.content}
                                                        </td>
                                                        <td className="px-6 py-3 d-flex">
                                                            <Button className="ml-10" type="primary" title="Chỉnh sửa" onClick={() => setOpenModalUpdate(r)}>
                                                                <FontAwesomeIcon icon={faPencil} />
                                                            </Button>
                                                            <Button className="ml-5" type="primary" title="Xóa" onClick={() => setOpenModalDelete(r)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="title">
                                <h6>Lý do báo cáo người dùng</h6>
                            </div>
                            <div className="data">
                                <div style={{height: '80px'}}></div>
                                <div>
                                    <table className="data_table">
                                        <tbody>
                                            {
                                                reportReason.filter(r => r?.type === 2).map((r, i) => (
                                                    <tr key={i}>
                                                        <td className="px-6 py-3" style={{width: '80%'}}>
                                                            {r?.content}
                                                        </td>
                                                        <td className="px-6 py-3 d-flex">
                                                            <Button className="ml-10" type="primary" title="Chỉnh sửa" onClick={() => setOpenModalUpdate(r)}>
                                                                <FontAwesomeIcon icon={faPencil} />
                                                            </Button>
                                                            <Button className="ml-5" type="primary" title="Xóa" onClick={() => setOpenModalDelete(r)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </ContainerPage>
            </Spin>

            {!!openModalDelete && (
                <DeleteReportReasonModal
                    open={openModalDelete}
                    onCancel={() => setOpenModalDelete(false)}
                    onOk={getAllReportsReason}
                />
            )}                                
            {!!openModalUpdate && (
                <UpdateReportReasonModal
                    open={openModalUpdate}
                    onCancel={() => setOpenModalUpdate(false)}
                    onOk={getAllReportsReason}
                />
            )}                                
            {!!openModalCreate && (
                <CreateReportReasonModal
                    open={openModalCreate}
                    onCancel={() => setOpenModalCreate(false)}
                    onOk={getAllReportsReason}
                />
            )}                                

        </LayoutAdmin>
    );
}
 
export default ReportReason;