import { Button, Input } from "antd";
import CustomModal from "../../../../components/Modal/CustomModal";
import api from '../../../../utils/axiosConfig.js';

const DeleteReportReasonModal = ({ open, onCancel, onOk }) => {
    const footer = () => (
        <div className="d-flex d-flex-end">
            <Button
                className="mr-10 mb-20"
                onClick={() => onCancel()}
            >
                Đóng
            </Button>
            <Button
                danger type="primary"
                className="mb-20"
                onClick={() => handleDelete()}
            >
                Xóa
            </Button>
        </div>
    )

    const handleDelete = async () => {
        try {
            const res = await api.delete('/api/report-reason/' + open?._id)
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
                Bạn có chắc chắn muốn xóa phản hồi này không ?
                <div>
                    <Input className="pt-3 pb-3" value={open?.content} disabled style={{width: '80%'}}/>
                </div>
            </div>
        </CustomModal>
    );
}
 
export default DeleteReportReasonModal;