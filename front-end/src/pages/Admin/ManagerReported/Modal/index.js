import { Button, Col, Row } from "antd";
import CustomModal from "../../../../components/Modal/CustomModal";
import { baseUrl } from "../../../../utils/service";

const ReportModal = ({ open, onCancel, onOk }) => {
    const handleDelete = async () => {
        try {
            onCancel()
        } catch (error) {
            console.log(error);
            onOk()
        }
    }
    
    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            width={720}
            footer={null}
        >
            <div style={{background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))', color: 'white'}}>
                <Row gutter={[16, 24]}>
                    <Col span={12}>
                        <div className="mt-20 mb-20 pl-10" style={{width: '100%', height: '60%'}}>
                            <video key={open._id} controls style={{ height: '470px' }} autoPlay loop autoCapitalize="true">
                                <source src={baseUrl + open?.storyId?.path} type="video/mp4" />
                            </video>
                        </div>
                    </Col>
                    {/* <Col span={3}></Col> */}
                    <Col span={12}>
                        <div className="mt-20">
                            <div>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => handleDelete()}
                                >
                                    Khóa
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </CustomModal>
    );
}
 
export default ReportModal;