import { Button, message } from "antd";
import CustomModal from "../../CustomModal";
import api from '../../../../utils/axiosConfig';

const ModalDeleteStory = ({ open, onCancel, onOk }) => {
    const handleDeleteStory = async () => {
        try {
            const response = await api.delete(`/api/stories/${open?._id}`);
            if (response.status === 200) {
                message.success('Xóa tin thành công');
                onOk();
                onCancel();
            } else {
                message.error('Xóa tin không thành công');
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi xóa tin:', error);
            message.error('Đã xảy ra lỗi khi xóa tin');
        }
    }
    
    const footer = () => (
        <div className="d-flex justify-content-center ">
            <Button className="mr-10 mb-10" onClick={onCancel}>
                Đóng
            </Button>
            <Button onClick={handleDeleteStory} danger type="primary">
                Xóa
            </Button>
        </div>
    );
console.log(open);
    return (
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            width={450}
            footer={footer}
        >
            <div className="fw-700 fs-20 text-center pt-20" style={{ marginTop: '200px' }}>
                Bạn chắc chắn muốn xóa tin này chứ?
            </div>
        </CustomModal>
    );
};

export default ModalDeleteStory;
