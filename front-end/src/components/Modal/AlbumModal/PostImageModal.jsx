import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import '../../../css/albumcreate.css'
import axios from 'axios';
import api from '../../../utils/axiosConfig'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserInformation, userInfor } from '../../../features/userSlice';
import { useDispatch } from 'react-redux';

function PostImageModal({ show, close, setListPost, listPost, setShowCreate, offset, setOffset }) {
    const inputFile = useRef();
    const inputImage = useRef();
    const [stage, setStage] = useState(0);
    const [files, setFiles] = useState();
    const [showDiscard, setShowDiscard] = useState(false);
    const caption = useRef();
    const modalCreate = useRef();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (show === false) {
            setStage(0);
            setImageUrls(0);
            setFiles(null);
            setCurImg(0);
        }
    }, [show])
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
    const [curImg, setCurImg] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);
    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files) {
            setFiles(files);
            setStage(1);
        }
    };

    const handleSetCurImg = (num) => {
        if (curImg + num >= 0 && curImg + num <= files.length - 1) {
            setCurImg(curImg + num);
        }
    }

    const handleDisCard = () => {
        setStage(0);
        setImageUrls(0);
        setFiles(null);
        handleCloseDiscard();
        setCurImg(0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }
        try {
            const response = await api.post('http://localhost:3008/api/user/album', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Đăng ảnh thành công');
            console.log(response.data); // handle response from server if needed
            dispatch(setUserInformation(response.data))
            close();
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('Đăng ảnh thất bại');
        }
    };
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
                    <span style={{ fontSize: "20px" }}>Create new post</span>
                    
                    {
                        stage === 1 && <span id='share-post' onClick={handleSubmit}>Share</span>
                    }
                    <ion-icon id="close-create-modal" name="close-outline" onClick={close}></ion-icon>
                </Modal.Header>
                {
                    stage === 0 && (
                        <div className='create-img-input' ref={inputImage}>
                            <div>
                                <svg aria-label="Icon to represent media such as images or videos" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                            </div>
                            <p>Drag photos here</p>
                            <Button className='secondary' onClick={handleChooseFile}>Select from computer</Button>
                            <input type='file' style={{ display: "none" }} ref={inputFile} multiple accept='image/*' onChange={(e) => handleImageChange(e)} />
                        </div>
                    )}
                {
                    stage > 0 && (
                        <div className='form-post'>
                            {
                                stage === 1 && (
                                    <div className='img-create-box'>
                                        {
                                            curImg > 0 && (
                                                <div className='pre-img' onClick={() => handleSetCurImg(-1)}>
                                                    <ion-icon name="chevron-back-outline"></ion-icon>
                                                </div>
                                            )
                                        }
                                        {imageUrls.length !== 0 && <img src={URL.createObjectURL(files[curImg])} alt="Preview" ref={inputImage}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "100%"
                                            }} />}

                                        {
                                            curImg < files.length - 1 && (
                                                <div className='next-img' onClick={() => handleSetCurImg(1)}>
                                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                                </div>
                                            )
                                        }
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

export default PostImageModal