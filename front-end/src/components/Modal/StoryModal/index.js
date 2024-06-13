import { Button, Col, Divider, Form, Image, Input, Row } from "antd";
import { StoryConponent } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCommentAlt, faEye, faGift, faHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import CustomModal from '../CustomModal'
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
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
    const inputRef = useRef(null)
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

    const handleCreateComment = async () => {
        try {
            const values = await form.validateFields()
            const res = await api.post('/api/comment', {
                storyId: open?._id,
                userId: open?.author?._id,
                commentor: user?.value?._id,
                content: values.content
            })
            if(res?.isError) return
            form.setFieldsValue({ content: '' })
            inputRef.current.focus()
            onOk()
        } catch (error) {
          console.log(error);  
        } 
    }

    const handleReply = () => {
        inputRef.current.focus()
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

                    <Col span={10} className="col-user">
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
                                            <div style={{ fontWeight: '700', color: 'hsl(0deg 0.78% 74.71%)'}}>{open?.author?.username}</div>
                                            <div style={{ fontSize: '12px', color: '#A19F9F' }} className="created"> {displayDate} </div>
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
                                <div className="option d-flex justify-content-space-evenly mt-20" style={{color: 'hsl(0deg 0.78% 74.71%)'}}>
                                    <div><FontAwesomeIcon icon={faEye} /> {open?.view.length} </div>
                                    <div><FontAwesomeIcon icon={faCommentAlt} /> 0 </div>
                                    <div><FontAwesomeIcon icon={faHeart} /> {likesCount} </div>
                                </div>
                                <div className="stuatus mt-20 ml-20" style={{color: 'hsl(0deg 0.78% 74.71%)'}}>
                                    {open.text}
                                </div>

                                <Divider className="mt-10" style={{backgroundColor: 'white'}}/>
                            </div>

                            <div className="comment pl-30" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {
                                    comments.map((c, i) =>  (
                                        <div key={i} className="d-flex mb-15">
                                            <div className="d-flex">
                                                <div className="avatar-commnet mr-20 mt-15">
                                                    <Image
                                                        alt="Avatar"
                                                        preview={false}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        src={baseUrl + c?.commentor?.avatar}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column ">
                                                <div style={{ fontWeight: '700', fontSize: '12px'}}> <span style={{color: 'hsl(0deg 0.78% 74.71%)'}}> {c?.commentor?.username} </span></div>
                                                <div className="created" style={{ fontSize: '10px', color: '#A19F9F' }}> 
                                                    <span> {dayjs(c?.createdAt).format('DD-MM-YYYY')} </span> 
                                                    {
                                                        user?.value?._id ? (<span className="ml-10 reply_story_comment" onClick={handleReply}> Trả lời </span>) : (<></>)
                                                    }
                                                </div>
                                                <div className="mt-5" style={{color: 'hsl(0deg 0.78% 74.71%)'}}> {c?.content} </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="comment">
                                <Divider style={{ marginBottom: '15px', backgroundColor: 'white', fontSize: '10px' }} />
                                <div className="ml-20 mr-20 mb-20">
                                    <Form form={form}>
                                        <Form.Item
                                            name="content"
                                            rules={[
                                                { required: true, message: "Hãy khen gì đó nhé." },
                                            ]}
                                        >
                                            <Input 
                                                ref={inputRef}
                                                // focusable
                                                // style={user?.value?._id ? {cursor: 'text'} : {cursor: 'help'}} 
                                                disabled={!user?.value?._id ? true : false}
                                                placeholder="Comment ..."
                                                // name="content"
                                                onPressEnter={handleCreateComment}
                                                suffix={
                                                    <FontAwesomeIcon className="fs-18" style={{ cursor: 'pointer' }} 
                                                    icon={faPaperPlane} onClick={() => handleCreateComment()}/>
                                                } 
                                            />
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
