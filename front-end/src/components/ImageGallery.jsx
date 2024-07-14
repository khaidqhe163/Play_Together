import React from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { IoMdClose } from 'react-icons/io';
import Modal from 'react-modal';
import { baseUrl } from '../utils/service';

const ImageGallery = ({ image, isOpen, closeModal, previousImage, nextImage }) => {
    let converted_path;
    let url;
    if (image && !image.startsWith('blob:')) {
        converted_path = image.replaceAll("\\", "/")
        url = baseUrl + converted_path;
    } else
        url = image
    return (
        <div onClick={closeModal}>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                style={{
                    content: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(0, 0, 0, 0.8)',
                        border: 'none',
                        borderRadius: '10px',
                        width: "100vw",
                        top: "0",
                        left: "0",
                        height: "100vh",
                        zIndex: "1060"
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: "1060"
                    },
                }}
            >
                <div style={{ position: "absolute", top: "20px", right: "20px", cursor: "pointer" }} onClick={closeModal}><IoMdClose fontSize={30} /></div>
                <div style={{ cursor: "pointer" }} onClick={previousImage} className='text-white'><GrPrevious fontSize={50} /></div>
                <img src={url} style={{ maxWidth: '90%', maxHeight: '80vh', marginTop: "70px" }} onClick={(e) => e.stopPropagation()} />
                <div style={{ cursor: "pointer" }} onClick={nextImage} className='text-white'><GrNext fontSize={50} /></div>
            </Modal>
        </div>
    );
};

export default ImageGallery;
