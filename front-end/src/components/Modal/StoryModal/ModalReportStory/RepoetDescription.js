import { Button, Form, Radio, Spin } from "antd";
import CustomModal from "../../CustomModal";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

const ReportDescription = ({ open, onCancel, onOk, storyDes, reportReasonId }) => {
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false)

    const handleSendReport = async () => {
        try {
            setLoading(true)
            const value = await form.validateFields()
            const data = {
                description: value?.description,
                owner: user?.value?._id,
                storyId: storyDes?._id,
                reportReason: reportReasonId
            } 
            
            const res = axios.post('http://localhost:3008/api/report', data)
            if (res?.isError) return
            onCancel()
        } catch (error) {
            console.log(error);
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
                onClick={() => handleSendReport()}
            >
                <Spin spinning={loading}>
                    Xác nhận
                </Spin>
            </Button>
        </div>
    )
    
    return (  
        <CustomModal
                open={!!open}
                onCancel={onCancel}
                width={600}
                footer={footer}
            >
                <div className="fw-700 fs-20 text-center pt-20" style={{marginTop: '125px'}}>
                    Nhập chi tiết việc bạn báo cáo video này
                </div>

                <div className="mt-15 ml-10 fs-12 fw-600">
                    <Radio checked>
                        {open?.reason}
                    </Radio>
                </div>

                <div className="mt-20 pl-10 pr-10">
                    <Form form={form}>
                        <Form.Item
                            rules={[
                                { required: true, message: "Hãy viết chi tiết" },
                            ]}
                            name="description"
                        >
                            <TextArea rows={3} placeholder="Nhập chi tiết"/>  
                        </Form.Item>
                    </Form>
                </div>
            </CustomModal>
    );
}
 
export default ReportDescription;