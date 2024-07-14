import { Button, Col, Divider, Dropdown, Form, Image, Input, Row, Spin } from "antd";
import { StoryConponent } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCommentAlt, faEye, faGift, faHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import CustomModal from '../CustomModal'
import dayjs from "dayjs";
import { useContext, useEffect, useRef, useState } from "react";
import { baseUrl } from "../../../utils/service";
import api from '../../../utils/axiosConfig.js';
import { useSelector } from "react-redux";
import ModalDeleteComment from "./ModalDeleteComment/index.js";
import { SocketContext } from "../../../context/SocketContext.jsx";
import ModalDeleteStory from "./ModalDeleteStory/index.js";
import ModalReportStory from "./ModalReportStory/index.js";
import { userInfor } from "../../../features/userSlice.js";

const StoryModal = ({ open, onCancel, setCurrentStory, stories, onViewStory, onOk, commentId }) => {
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false)
    const [likedStatus, setLikedStatus] = useState(open?.like?.some(i => i?._id === user?.value?._id))
    const [likesCount, setLikesCount] = useState(0);
    const [viewCount, setViewCount] = useState(open?.view?.some(i => i?._id === user?.value?._id));
    const [comments, setComments] = useState(null)
    const [openModalDeleteComment, setOpenModalDeleteComment] = useState(false)
    const [openDeleteStory, setOpenDeleteStory] = useState(false)
    const [openReportStory, setOpenReportStory] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [rep, setRep] = useState(false)
    const inputRef = useRef(null)
    const createdAt = dayjs(open?.createdAt);
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');
    const commentBox = useRef()
    const userInfo = useSelector(userInfor);
    useEffect(() => {
        if (commentId && comments) {
            if (document.getElementById(commentId))
                document.getElementById(commentId).scrollIntoView({
                    behavior: "smooth"
                })
        }
    }, [comments])

    let displayDate;
    if (createdAt.isSame(today, 'day')) {
        displayDate = 'Hôm nay';
    } else if (createdAt.isSame(yesterday, 'day')) {
        displayDate = 'Hôm qua';
    } else {
        displayDate = createdAt.format('DD-MM-YYYY');
    }
    const { socket } = useContext(SocketContext)
    const items = (comment) => [
        {
            label: (
                <span className="fs-12" style={{ boxSizing: 'border-box' }} onClick={() => setOpenModalDeleteComment(comment)}>
                    Xóa
                </span>
            ),
            key: '0',
        },
        {
            label: (
                <span className="fs-12" onClick={() => handleEditComment(comment)}>
                    Chỉnh sửa
                </span>
            ),
            key: '1',
        },
    ];

    const item2 = [
        // {
        //     label: (
        //         <span className="fs-12" onClick={() => setOpenReportStory(open)}>
        //             Báo cáo
        //         </span>
        //     ),
        //     key: '1',
        // },
    ];

    if (open?.author?._id !== user?.value?._id && userInfo !== null) {
        item2.unshift({
            label: (
                <span className="fs-12" onClick={() => setOpenReportStory(open)}>
                    Báo cáo
                </span>
            ),
            key: '1',
        },)
    }

    if (open?.author?._id === user?.value?._id) {
        item2.unshift({
            label: (
                <span className="fs-12" style={{ boxSizing: 'border-box' }}
                    onClick={() => setOpenDeleteStory(open)}
                >
                    Xóa tin
                </span>
            ),
            key: '0',
        });
    }

    const handleEditComment = (comment) => {
        form.setFieldsValue({
            content: comment?.content
        });
        inputRef.current.focus();
        setIsEdit(comment)
    }

    const handlePrevStory = () => {
        setCurrentStory((prev) => {
            if (prev === 0) {
                return stories.length - 1;
            }
            form.resetFields()
            setRep(false)
            return prev - 1;
        });
    };

    const handleNextStory = () => {
        setCurrentStory((prev) => {
            if (prev === stories.length - 1) {
                return 0;
            }
            form.resetFields()
            setRep(false)
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
            console.log(likedStatus);
            if (!likedStatus) {
                const likeNotify = await api.post("/api/notification/like-story-notification", {
                    storyId: open._id
                })
                socket.emit("sendNotification", likeNotify.data)
                console.log(likeNotify.data);
            }
            setLikedStatus(!likedStatus)
            setLikesCount((prevCount) => likedStatus ? prevCount - 1 : prevCount + 1);
        } catch (error) {
            console.log(error);
        } finally {
        }
    }

    const handleCreateComment = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()

            const data = rep !== false ? {
                storyId: open?._id,
                userId: open?.author?._id,
                commentor: user?.value?._id,
                content: values.content,
                reply: rep?.commentor?._id
            } : {
                storyId: open?._id,
                userId: open?.author?._id,
                commentor: user?.value?._id,
                content: values.content,
            }
            const res = isEdit === false
                ? await api.post('/api/comment', data)
                : await api.put(`/api/comment/${isEdit?._id}`, data)

            if (!data.reply || userInfo._id !== data.commentor) {
                if (isEdit === false) {
                    const commentNotify = await api.post("/api/notification/comment-story-notification", {
                        storyId: data.storyId,
                        author: data.userId,
                        commentId: res.data._id
                    })
                    console.log("zoday 1");
                    console.log(commentNotify.data);
                    socket.emit("sendNotification", commentNotify.data)
                }
            }
            if (data.reply && isEdit === false) {
                const replyNotify = await api.post("/api/notification/send-reply-story-notifcation", {
                    storyId: data.storyId,
                    commentId: res.data._id,
                    replyId: data.reply
                })
                socket.emit("sendNotification", replyNotify.data)
            }
            if (res?.isError) return
            form.setFieldsValue({ content: '' })
            inputRef.current.focus()
            onOk()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
            setIsEdit(false)
            setRep(false)
        }
    }


    const getListComments = async () => {
        try {
            setLoading(true)
            const res = await api.get('/api/comment/' + open?._id);
            if (res?.isError) return;
            setComments(res.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (rep !== false) {
            setIsEdit(false)
        } else if (isEdit !== false) {
            setRep(false)
        }
    }, [rep, isEdit])

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
                                    <video key={open?._id} controls style={{ width: '100%' }} autoPlay loop autoCapitalize="true">
                                        <source src={baseUrl + open?.path} type="video/mp4" />
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
                                            <div style={{ fontWeight: '700', color: 'hsl(0deg 0.78% 74.71%)' }}>{open?.author?.username}</div>
                                            <div style={{ fontSize: '12px', color: '#A19F9F' }} className="created"> {displayDate} </div>
                                        </div>
                                    </div>
                                    <div className="thue mr-20 d-flex ">

                                        <div className="ml-20 mt-3" style={{}}>
                                            <Dropdown
                                                menu={{ items: item2 }}
                                                trigger={['click']}
                                            >
                                                <span className="fs-14 fw-700 white" style={{ cursor: "pointer" }}>
                                                    . . .
                                                </span>
                                            </Dropdown>
                                        </div>
                                        {/* <Button danger type="primary" shape="round" className="ml-10"
                                            style={{ color: 'white', height: '36px', width: '40px'}}
                                        >
                                        </Button> */}
                                    </div>
                                </div>
                                <div className="option d-flex justify-content-space-evenly mt-20" style={{ color: 'hsl(0deg 0.78% 74.71%)' }}>
                                    <div><FontAwesomeIcon icon={faEye} /> {open?.view.length} </div>
                                    <div><FontAwesomeIcon icon={faCommentAlt} /> {comments?.length} </div>
                                    <div><FontAwesomeIcon icon={faHeart} /> {likesCount} </div>
                                </div>
                                <div className="stuatus mt-20 ml-20" style={{ color: 'hsl(0deg 0.78% 74.71%)' }}>
                                    {open?.text}
                                </div>

                                <Divider className="mt-10 mb-0" style={{ backgroundColor: 'white' }} />
                            </div>


                            <div className="comment pl-30" style={{ height: '250px', overflowY: 'auto' }} ref={commentBox}>
                                {
                                    comments?.map((c, i) => (
                                        <div key={i} className="d-flex mb-10">
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
                                                <div style={{ fontWeight: '700', fontSize: '12px' }}> <span style={{ color: 'hsl(0deg 0.78% 74.71%)' }}> {c?.commentor?.username} </span></div>
                                                <div className="created" style={{ fontSize: '10px', color: '#A19F9F' }}>
                                                    <span> {dayjs(c?.createdAt).format('DD-MM-YYYY')} </span>
                                                    {
                                                        (user?.value?._id && user?.value?._id !== c?.commentor?._id) ? (
                                                            <>
                                                                <span className="ml-10 reply_story_comment" onClick={() => {
                                                                    // handleReply(c)
                                                                    inputRef.current.focus()
                                                                    setRep(c)
                                                                    form.setFieldsValue({
                                                                        reply_user: c?.commentor?.username
                                                                    })
                                                                }}> Trả lời </span>
                                                            </>
                                                        ) : (<></>)
                                                    }
                                                    {
                                                        c?.commentor?._id === user?.value?._id ? (
                                                            <>
                                                                <span className="ml-10">
                                                                    <Dropdown
                                                                        menu={{
                                                                            items: items(c),
                                                                        }}
                                                                        trigger={['click']}
                                                                    >
                                                                        <span className="fs-12 fw-700" style={{ cursor: "pointer" }}>
                                                                            ...
                                                                        </span>
                                                                    </Dropdown>
                                                                </span>
                                                            </>
                                                        ) : (<></>)
                                                    }
                                                </div>
                                                <div className="fs-12" style={{ color: 'hsl(0deg 0.78% 74.71%)' }}>
                                                    {c?.reply
                                                        ? <>
                                                            <span style={{ borderRadius: '30%', backgroundColor: '#7d7c94', padding: '0 4px', fontWeight: 600 }}> {c?.reply?.username} </span>
                                                            <span className="ml-5"> {c?.content} </span>
                                                        </> : <> {c?.content} </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>


                            <div className="comment">
                                <Divider style={{ marginBottom: '15px', marginTop: '0', backgroundColor: 'white', fontSize: '10px' }} />
                                <div className="ml-20 mr-20 mb-20">
                                    <Form form={form}>
                                        {
                                            rep !== false ?
                                                (
                                                    <Form.Item
                                                        name="reply_user"
                                                        style={{ margin: '-25px 0 0 0', padding: '0' }}
                                                    >
                                                        <Input
                                                            onClick={() => setRep(false)}
                                                            className="rep"
                                                            style={{
                                                                padding: '0 3px',
                                                                border: 'none',
                                                                width: '100px',
                                                                fontSize: '12px',
                                                                height: '20px',
                                                                top: '15px',
                                                                left: '5px',
                                                                zIndex: '2',
                                                                backgroundColor: '#7d7c94',
                                                                cursor: 'pointer'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                ) : null
                                        }

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
                                                style={{ zIndex: '1' }}
                                                onPressEnter={handleCreateComment}
                                                suffix={
                                                    <FontAwesomeIcon className="fs-18" style={{ cursor: 'pointer' }}
                                                        icon={faPaperPlane} onClick={() => handleCreateComment()} />
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

            {!!openModalDeleteComment && (
                <ModalDeleteComment
                    open={openModalDeleteComment}
                    onCancel={() => setOpenModalDeleteComment(false)}
                    setLoading={setLoading}
                    onOk={onOk}
                />
            )}

            {!!openDeleteStory && (
                <ModalDeleteStory
                    open={openDeleteStory}
                    onCancelStory={onCancel}
                    onCancel={() => setOpenDeleteStory(false)}
                    onOk={onOk}
                />
            )}

            {!!openReportStory && (
                <ModalReportStory
                    open={openReportStory}
                    onCancel={() => setOpenReportStory(false)}
                    onOk={onOk}
                />
            )}
        </CustomModal>
    );
}

export default StoryModal;
