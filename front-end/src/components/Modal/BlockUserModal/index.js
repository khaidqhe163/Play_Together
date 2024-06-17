import { Button } from "antd";
import api from '../../../utils/axiosConfig.js';
import CustomModal from "../CustomModal";

const BlockUserModal = ({open, onCancel, blocked, setBlocked}) => {
    console.log("blocked", blocked);
    console.log("setBlocked", setBlocked);
    
    const footer = () => (
        <div className="d-flex justify-content-center">
            <Button
                className="mr-10"
                onClick={() => onCancel()}
            >
                Đóng
            </Button>
            <Button
                onClick={() => handleBlockUser()}
                danger type="primary"
                className="mb-20"
            >
                {
                    !blocked ? 'Chặn' : 'Bỏ chặn'
                }
            </Button>
        </div>
    )

    const handleBlockUser = async () => {
        try {
            const res = await api.post('/api/user/blockOrUnBlockUser/' + open?._id)
            if (res?.isError) return
            setBlocked(!blocked)
            } catch (error) {
                console.log(error);
            } finally {
                onCancel()
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
                {
                    !blocked 
                        ? `Bạn chắc chắn muốn chặn ${open?.username} không ?`
                        : `Bạn muốn bỏ chặn ${open?.username} không ?`
                }
            </div>

        </CustomModal>
    );
}
 
export default BlockUserModal;