import CustomModal from "../../CustomModal";
import api from '../../../../utils/axiosConfig.js';
import { Button } from "antd";

const ModalDeleteComment = ({open, onCancel, onOk, setLoading}) => {
    const handleDeleteComment = async () => {
        try {
            setLoading(true)
            const res = await api.delete('/api/comment/' + open?._id)
            if (res?.isError) return
            onOk()
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
                onCancel()
        }
    }


    const footer = () => (
        <div className="d-flex justify-content-center">
            <Button
                className="mr-10"
                onClick={() => onCancel()}
            >
                Đóng
            </Button>
            <Button
                onClick={() => handleDeleteComment()}
                danger type="primary"
                className="mb-20"
            >
                Xác nhận
            </Button>
        </div>
    )
    
    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            width={450}
            footer={footer}
        >
            <div className="fw-700 fs-20 text-center pt-20" style={{marginTop: '200px'}}>
                Bạn muốn xóa comment này không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalDeleteComment;