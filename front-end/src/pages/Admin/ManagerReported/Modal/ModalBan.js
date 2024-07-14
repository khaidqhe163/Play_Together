import { Button } from "antd";
import CustomModal from "../../../../components/Modal/CustomModal";
import axios from "axios";

const ModalBan = ({ open, onCancel, onOk }) => {
    console.log("open: ", open);

    const handleBan = async () => {
        try {
            const res = await axios.put("http://localhost:3008/api/stories/banOrUnbanStory", {
                id: open?.storyId?._id
            })
            if(res?.isError) return
            onOk()
            onCancel()
        } catch (error) {
            console.log(error);
        }
    }

    const footer = () => (
        <div className="d-flex d-flex-end">
            <Button
                className="mr-10 mb-10"
                onClick={() => onCancel()}
            >
                Đóng
            </Button>
            <Button
                type="primary" danger
                className="mb-10"
                onClick={() => handleBan()}
            >
                {!open?.storyId?.status ? "Khóa" : "Mở khóa"}
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
                Bạn có chắc muốn chặn Video này không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalBan
