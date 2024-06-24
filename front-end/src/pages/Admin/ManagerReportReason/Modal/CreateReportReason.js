import { Button, Form, Input, Radio, Select } from "antd"
import api from '../../../../utils/axiosConfig.js';
import CustomModal from "../../../../components/Modal/CustomModal/index.js";

const CreateReportReasonModal = ({ open, onCancel, onOk }) => {
    const [form] = Form.useForm()

    const handleCreate = async () => {
        try {
            const value = await form.validateFields()
            const res = await api.post(`/api/report-reason/`, value)
            if(res?.isError) return
            onCancel()
            onOk()
        } catch (error) {
            console.log(error);
        }
    }
    
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
                onClick={() => handleCreate()}
            >
                Xác nhận
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
            <div className="fw-700 fs-20 text-center pt-20" style={{marginTop: '200px'}}>
                Tạo phản hồi
            </div>

            <div className="mt-20">
                <Form form={form}>
                    <Form.Item
                        name="content"
                        rules={[
                            { required: true, message: "Không được để trống" },
                        ]}
                        className="pl-60"
                    >
                        <Input style={{width: '80%'}} placeholder="Nhập lý do"/>
                    </Form.Item>

                    <Form.Item
                        name="type"
                        rules={[
                            { required: true, message: "Không được để trống" },
                        ]}
                        className="pl-60 m-0"
                        style={{width: '60%'}}
                    >
                        <Select
                            placeholder="Chọn đối tượng dành cho phản hồi này"
                            allowClear
                            optionFilterProp="label"
                            options={[
                            {
                                value: '1',
                                label: 'Dành cho Video',
                            },
                            {
                                value: '2',
                                label: 'Dành cho người dùng',
                            },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </div>
        </CustomModal>
    );
}
 
export default CreateReportReasonModal;