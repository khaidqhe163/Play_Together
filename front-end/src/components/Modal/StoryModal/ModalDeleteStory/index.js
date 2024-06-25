import { Button } from "antd";
import CustomModal from "../../CustomModal";

const ModalDeleteStory = ({ open, onCancel, onOk }) => {
    const footer = () => (
        <div className="d-flex justify-content-center">
            <Button
                className="mr-10"
                onClick={() => onCancel()}
            >
                Đóng
            </Button>
            <Button
                onClick={() => handleDeleteStory()}
                danger type="primary"
                className="mb-20"
            >
                Xóa
            </Button>
        </div>
    )

    const handleDeleteStory = async () => {
        try {
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
            width={450}
            footer={footer}
        >
            <div className="fw-700 fs-20 text-center pt-20" style={{marginTop: '200px'}}>
                Bạn chắc chắn muốn xóa tin này chứ ?
            </div>
        </CustomModal>
    );
}
 
export default ModalDeleteStory;