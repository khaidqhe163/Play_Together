import { Button, Form, Radio, Spin } from "antd";
import CustomModal from "../../CustomModal";
import { useEffect, useState } from "react";
import axios from "axios";
import ReportDescription from "./RepoetDescription";

const ModalReportStory = ({ open, onCancel, onOk }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [reportReason, setReportReason] = useState([])
    const [openReportDescription, setOpenReportDescription] = useState(false)
    const [reportReasonId, setReportReasonId] = useState()

    useEffect(() => {
        getAllReportsReason()
    }, [])

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

    const getId = (id) => {
        setReportReasonId(id)
    }

    const handleReport = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            setOpenReportDescription(values)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    const footer = () => (
        <div className="d-flex-end">
            <Button
                className="mr-10 mb-10"
                onClick={() => onCancel()}
            >
                Đóng
            </Button>
            <Button
                className="mr-10 mb-10"
                type="primary"
                onClick={() => handleReport()}
            >
                Xác nhận
            </Button>
        </div>
    )

    return (
        <div className="" style={{background: 'rgb(242 242 242 / 88%)'}}>
            <CustomModal
                open={!!open}
                onCancel={onCancel}
                width={450}
                footer={footer}
            >
                <Spin spinning={loading}>
                    <div className="fw-700 fs-20 text-center pt-20" style={{marginTop: '100px'}}>
                        Chọn Lý do của bạn
                    </div>
                    <div className="mt-20">
                        <Form form={form}>
                            <Form.Item
                                rules={[
                                    { required: true, message: "Hãy chọn lý do" },
                                ]}
                                name="reason"
                            >
                                <Radio.Group className="ml-10">
                                {
                                    reportReason.filter(r => r?.type === 1).map((r, index) => (
                                        <Radio key={r?._id} value={r?.content} className="mb-15" onChange={() => getId(r?._id)}> 
                                            <span className="fs-13 fw-600">
                                                {r?.content} 
                                            </span>
                                        </Radio>
                                    ))
                                }
                                </Radio.Group>    
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </CustomModal>

            {!!openReportDescription && (
                <ReportDescription
                    open={openReportDescription}
                    onCancel={() => {
                        setOpenReportDescription(false);
                        onCancel();
                    }}
                    onOk={onOk}
                    storyDes = {open}
                    reportReasonId={reportReasonId}
                />
            )}
        </div>  
    );
}
 
export default ModalReportStory;