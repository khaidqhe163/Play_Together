import { Button, Col, Divider, Form, Image, Input, Row } from "antd";
import { StoryConponent } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCommentAlt, faEye, faGift, faHeart, faPaperPlane, faShare } from "@fortawesome/free-solid-svg-icons";
import CustomModal from '../CustomModal'

const StoryModal = ({open, onCancel}) => {
    const [form] = Form.useForm();

    // const footer = (
    //   <div className="d-flex justify-content-flex-end">
    //     <Button
    //       btnType="linear"
    //       className="btn-linear-2"
    //       onClick={onCancel}
    //     >
    //       Cancel
    //     </Button>
    //   </div>
    // )

    console.log(open);

    return (  
        <CustomModal
            // title="Story"
            open={!!open}
            onCancel={onCancel}
            width={1000}
            footer={null}
        >
          <StoryConponent>
            <Row gutter={[16, 24]}>
              <Col span={14} className="video">
                <Row gutter={[16, 24]}>
                  <Col span={6}>
                    <div className="prev">
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                  </Col>
                  <Col span={12} className="video__content">
                      <div>
                        Video
                      </div>
                  </Col>
                  <Col span={6}>
                    <div className="next">
                      <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                    <div className="d-flex flex-column">
                      <div className="heart"> 
                        <FontAwesomeIcon icon={faHeart} />
                      </div>
                      <div className="gift mt-10">
                        <FontAwesomeIcon icon={faGift} />
                      </div>
                      {/* <div className="share mt-10">
                        <FontAwesomeIcon icon={faShare} />
                      </div> */}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={10}>
                <div className="user d-flex flex-column justify-content-space-between">
                  <div className=" d-flex flex-column">
                    <div className="d-flex justify-content-space-between mt-40">
                      <div className="owner ml-20 d-flex">
                        <div className="avatar">
                          <Image 
                            alt="Avatar"
                            preview={false}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            src={open.avatar}
                          />
                        </div>
                        <div className="ml-20 d-flex flex-column">
                          <div style={{fontWeight: '700'}}>{open.name}</div>
                          <div style={{fontSize: '12px', color: '#A19F9F'}}>Hôm kia</div>
                        </div>
                      </div>
                      <div className="thue mr-20">
                        <Button danger type="primary" shape="round"
                          style={{color: 'white', height: '34px', width: '84px', fontSize: '16px', fontWeight: 600}}
                        >
                          Thuê
                        </Button>
                      </div>
                    </div>
                    <div className="option d-flex justify-content-space-evenly mt-20">
                      <div><FontAwesomeIcon icon={faEye} /> 100</div>
                      <div><FontAwesomeIcon icon={faCommentAlt} /> 0</div>
                      <div><FontAwesomeIcon icon={faHeart} /> 0</div>
                    </div>
                    <div className="stuatus mt-20 ml-20">
                      abcxyz
                    </div>
                    <Divider/>
                  </div>
                  <div className="comment">
                    <Divider style={{marginBottom: '15px'}}/>
                    <div className="ml-20 mr-20 mb-20">
                      <Form form={form}>
                        <Form.Item
                          name="comment"
                        >
                          <Input placeholder="Comment ..." suffix={<FontAwesomeIcon className="fs-18" style={{cursor: 'pointer'}} icon={faPaperPlane}/>}/>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>     
          </StoryConponent>
        </CustomModal>
    );
}
 
export default StoryModal;