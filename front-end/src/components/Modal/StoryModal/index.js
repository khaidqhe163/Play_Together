import { Button, Col, Divider, Form, Image, Input, Row } from "antd";
import { StoryConponent } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCommentAlt, faEye, faGift, faHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import CustomModal from '../CustomModal'
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../utils/service";
import api from '../../../utils/axiosConfig.js';
import { useSelector } from "react-redux";

const StoryModal = ({ open, onCancel, setCurrentStory, stories, onViewStory, onOk }) => {
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user);
    const [likedStatus, setLikedStatus] = useState(open?.like?.some(i => i?._id === user?.value?._id))
    const [likesCount, setLikesCount] = useState(0);
    const [viewCount, setViewCount] = useState(open?.view?.some(i => i?._id === user?.value?._id));
    const [comments, setComments] = useState([])
    const createdAt = dayjs(open.createdAt);
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');

    let displayDate;

    if (createdAt.isSame(today, 'day')) {
        displayDate = 'Hôm nay';
    } else if (createdAt.isSame(yesterday, 'day')) {
        displayDate = 'Hôm qua';
    } else {
        displayDate = createdAt.format('DD-MM-YYYY');
    }

    const handlePrevStory = () => {
        setCurrentStory((prev) => {
            if (prev === 0) {
                return stories.length - 1;
            }
            return prev - 1;
        });
    };

    const handleNextStory = () => {
        setCurrentStory((prev) => {
            if (prev === stories.length - 1) {
                return 0;
            }
            return prev + 1;
        });
    };

    const handleViewStory = async () => {
        try {
            await onViewStory();
            setViewCount(!viewCount);
        } catch (error) {
            console.log(error);
        }
    }


    const handleLikedOrUnliked = async () => {
        try {
            const res = await api.post('/api/stories/likedOrUnlikedStory/' + open._id)
            if (res?.isError) return
            onOk()
            setLikedStatus(!likedStatus)
            setLikesCount((prevCount) => likedStatus ? prevCount - 1 : prevCount + 1);
        } catch (error) {
            console.log(error);
        } finally {
        }
    }

    const getListComments = async () => {
        try {
            const res = await api.get('/api/comment/' + open?._id);
            if (res?.isError) return;
            setComments(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    console.log("comment", comments);


    useEffect(() => {
        setLikedStatus(open?.like?.some(i => i === user?.value?._id));
        setLikesCount(open?.like?.length);
        handleViewStory()
        getListComments()
    }, [open, user, open?.author?._id]);

    return (
        <CustomModal
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
                                <div className="prev" onClick={handlePrevStory}>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </div>
                            </Col>
                            <Col span={12} className="video__content">
                                <div>
                                    <video key={open._id} controls style={{ width: '100%' }} autoPlay loop autoCapitalize="true">
                                        <source src={baseUrl + open.path} type="video/mp4" />
                                    </video>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="next" onClick={handleNextStory}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="heart" onClick={() => handleLikedOrUnliked()}>
                                        <FontAwesomeIcon color={!!likedStatus ? 'red' : ''} icon={faHeart} />
                                    </div>
                                    <div className="gift mt-10">
                                        <FontAwesomeIcon icon={faGift} />
                                    </div>
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
                                                src={baseUrl + open?.author?.avatar}
                                            />
                                        </div>
                                        <div className="ml-20 d-flex flex-column">
                                            <div style={{ fontWeight: '700' }}>{open?.author?.username}</div>
                                            <div style={{ fontSize: '12px', color: '#A19F9F' }}> {displayDate} </div>
                                        </div>
                                    </div>
                                    <div className="thue mr-20">
                                        <Button danger type="primary" shape="round"
                                            style={{ color: 'white', height: '34px', width: '84px', fontSize: '16px', fontWeight: 600 }}
                                        >
                                            Thuê
                                        </Button>
                                    </div>
                                </div>
                                <div className="option d-flex justify-content-space-evenly mt-20">
                                    <div><FontAwesomeIcon icon={faEye} /> {open?.view.length} </div>
                                    <div><FontAwesomeIcon icon={faCommentAlt} /> 0 </div>
                                    <div><FontAwesomeIcon icon={faHeart} /> {likesCount} </div>
                                </div>
                                <div className="stuatus mt-20 ml-20">
                                    {open.text}
                                </div>

                                <Divider />

                                <div className="comment pl-30">
                                    {
                                        comments && comments.map((c, i) => (
                                            <div key={i} className="d-flex flex-column mb-25">
                                                <div className="d-flex">
                                                    <div className="avatar-commnet mr-20">
                                                        <Image
                                                            alt="Avatar"
                                                            preview={false}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            src={baseUrl + c?.commentor?.avatar}
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column ">
                                                        <div style={{ fontWeight: '700', fontSize: '12px' }}> <span> {c?.commentor?.username} </span></div>
                                                        <div style={{ fontSize: '10px', color: '#A19F9F' }}> <span> {dayjs(c?.createdAt).format('DD-MM-YYYY')} </span> </div>
                                                    </div>
                                                </div>
                                                <div className="mt-5">
                                                    <span className="ml-10"> {c?.content} </span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="comment">
                                <Divider style={{ marginBottom: '15px' }} />
                                <div className="ml-20 mr-20 mb-20">
                                    <Form form={form}>
                                        <Form.Item
                                            name="comment"
                                        >
                                            <Input placeholder="Comment ..." suffix={<FontAwesomeIcon className="fs-18" style={{ cursor: 'pointer' }} icon={faPaperPlane} />} />
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
