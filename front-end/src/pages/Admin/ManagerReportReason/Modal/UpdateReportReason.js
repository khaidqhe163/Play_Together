import { Button, Form, Input } from "antd"
import api from '../../../../utils/axiosConfig.js';
import CustomModal from "../../../../components/Modal/CustomModal/index.js";
import { useEffect } from "react";

const UpdateReportReasonModal = ({ open, onCancel, onOk }) => {
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            content: open?.content
        })
    })
    
    const footer = () => (
        <div className="d-flex d-flex-end">
            <Button
                className="mr-10 mb-20"
                onClick={() => onCancel()}
            >
                Đóng
            </Button>
            <Button
                type="primary"
                className="mb-20"
                onClick={() => handleUpdate()}
            >
                Xác nhận
            </Button>
        </div>
    )

    const handleUpdate = async () => {
        try {
            const value = await form.validateFields()
            const res = await api.put(`/api/report-reason/${open?._id}`, value)
            if(res?.isError) return
            onCancel()
            onOk()
        } catch (error) {
            console.log(error);
        }
    }
    
    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            width={600}
            footer={footer}
        >
            <div className="fw-700 fs-20 text-center pt-20" style={{marginTop: '200px'}}>
                Chỉnh sửa phản hồi
            </div>

            <div className="mt-20 text-center fw-600">
                <Form form={form}>
                    <Form.Item
                        name="content"
                        rules={[
                            { required: true, message: "Không được để trống" },
                        ]}
                    >
                        <Input style={{width: '90%'}} placeholder="Nhập lý do"/>
                    </Form.Item>
                </Form>
            </div>
        </CustomModal>
    );
}
 
export default UpdateReportReasonModal;