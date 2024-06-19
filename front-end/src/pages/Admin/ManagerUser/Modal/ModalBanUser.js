import { Button } from "antd";
import CustomModal from "../../../../components/Modal/CustomModal";
import api from '../../../../utils/axiosConfig.js'

const ModalBanUser = ( {open, onCancel, onOk} ) => {
    const footer = () => (
        <div className="d-flex justify-content-center">
            <Button
                className="mr-10"
                onClick={() => onCancel()}
            >
                Đóng
            </Button>
            <Button
                danger type="primary"
                className="mb-20"
                onClick={() => handleBan()}
            >
                {
                    open?.status === false ? "Khóa" : "Mở khóa"
                }
            </Button>
        </div>
    )

    const handleBan = async () => {
        try {
            const res = await api.put('/api/user/ban/' + open?._id)
            if (res?.isError) return
            onOk()
            onCancel()
        } catch (error) {
            console.log(error);
        }
    }

    console.log("open", open);
    console.log("id", open?._id);
    
    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            width={600}
            footer={footer}
        >
            <div className="fw-700 fs-20 text-center pt-20" style={{marginTop: '200px'}}>
                {
                    open?.status === false
                        ? `Bạn có chắc muốn khóa tài khoản ${open?.username} không?` 
                        : `Bạn có chắc muốn mở khóa tài khoản ${open?.username} không?`
                }
            </div>
        </CustomModal>
    );
}
 
export default ModalBanUser;