import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import '../css/postcreate.css'
import { useSelector } from 'react-redux';
import { userInfor } from '../features/userSlice';
import api from '../utils/axiosConfig'
import { baseUrl } from '../utils/service';
function StoryCreation({ show, close, stories, setStory }) {
    const inputFile = useRef();
    const [stage, setStage] = useState(0);
    const [file, setFile] = useState();
    const [showDiscard, setShowDiscard] = useState(false);
    const caption = useRef();
    const modalCreate = useRef();
    const userInfo = useSelector(userInfor);
    const videosrc = useRef();
    useEffect(() => {
        if (show === false) {
            setStage(0);
            setFile(null);
        }
    }, [show])
    useEffect(() => {
        if (stage === 1) {
            videosrc.current.src = URL.createObjectURL(file);
        }
    }, [stage])
    const handleShowDiscard = () => {
        setShowDiscard(true);
    }
    const handleCloseDiscard = () => {
        setShowDiscard(false);
    }
    const handleChooseFile = () => {
        if (inputFile) {
            inputFile.current.click();
        }
    }
    const handleVideoChange = (e) => {
        let uploadedFile = e.target.files[0];
        setFile(uploadedFile)
        setStage(1);
    };


    const handleDisCard = () => {
        setStage(0);
        setFile(null);
        handleCloseDiscard();
    }

    const handlePostStory = async () => {
        try {
            const form = new FormData();
            form.append('video', file);
            form.append('text', caption.current.value)
            const story = await api.post('/api/stories/create-story', form,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log(story);
            const updateStory = [story.data, ...stories];
            console.log(updateStory);
            setStory(updateStory)
            close();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Modal show={show} onHide={close} centered ref={modalCreate}>
                <Modal.Header>
                    {
                        stage >= 1 && (
                            <ion-icon id="back-stage" name="arrow-back-outline" onClick={() => {
                                if (stage === 1) {
                                    handleShowDiscard(true);
                                } else {
                                    setStage(stage - 1)
                                }
                            }}></ion-icon>
                        )
                    }
                    <span style={{ fontSize: "20px" }}>Tạo tin mới</span>
                    {
                        stage === 1 && <span id='next-stage' onClick={() => {
                            console.log(videosrc.current.duration);
                            if (videosrc.current.duration > 60) {
                                alert('Video vuot qua 60s')
                                return;
                            }
                            setStage(2)
                        }}>Tiếp theo</span>
                    }
                    {
                        stage === 2 && <span id='share-post' onClick={handlePostStory}>Chia sẻ</span>
                    }
                    <ion-icon id="close-create-modal" name="close-outline" onClick={close}></ion-icon>
                </Modal.Header>
                {
                    stage === 0 && (
                        <div className='create-img-input'>
                            <div>
                                <svg aria-label="Icon to represent media such as images or videos" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                            </div>
                            <p>Kéo/thả hình ảnh vào đây</p>
                            <Button onClick={handleChooseFile}>Chọn từ máy tính của bạn</Button>
                            <input type='file' style={{ display: "none" }} ref={inputFile} multiple accept='video/*' onChange={(e) => handleVideoChange(e)} />
                        </div>
                    )}
                {
                    stage > 0 && (
                        <div className='form-post'>
                            {
                                stage === 1 && (
                                    <div className='img-create-box'>
                                        <video controls style={{ maxWidth: "100%", maxHeight: "100%" }} ref={videosrc} >
                                            <source type='video/mp4' src='' />
                                            Have some problem with your internet
                                        </video>
                                    </div>
                                )
                            }

                            {
                                stage === 2 && (
                                    <div className='post-caption'>
                                        <div className='user-info'>
                                            <img src={baseUrl + userInfo.avatar} alt='error' />
                                            <span>{userInfo?.username}</span>
                                        </div>
                                        <div>
                                            <Form>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                >
                                                    <Form.Control as="textarea" rows={10} placeholder='Write a caption' ref={caption} />
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </Modal >
            <Modal show={showDiscard} onHide={handleCloseDiscard} className="modal-editpost" centered animation size='sm' >
                <Modal.Header>
                    <div style={{ textAlign: "center", width: "100%" }}>
                        <p style={{ marginBottom: "5px", fontSize: "20px" }}>Discard post?</p>
                        <p style={{ marginBottom: "5px" }}>Your edits won&#39;t be saved.</p>
                    </div>
                </Modal.Header>
                <ul className="post-option">
                    <li onClick={handleDisCard}>Discard</li>
                    <hr style={{ margin: "0" }}></hr>
                    <li onClick={() => setShowDiscard(false)}>Cancle</li>
                </ul>
            </Modal>
        </>
    )
}

export default StoryCreation
