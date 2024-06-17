import React, { useState } from 'react'
import { baseUrl } from '../../utils/service';
import ImageGallery from '../ImageGallery'
function Album({ player }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => {
        console.log("click here");
        setIsOpen(false);
    };
    const previousImage = (e) => {
        e.stopPropagation()
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? player.player.images.length - 1 : prevIndex - 1
        );
    };

    const nextImage = (e) => {
        e.stopPropagation()
        setCurrentImageIndex((prevIndex) =>
            prevIndex === player.player.images.length - 1 ? 0 : prevIndex + 1
        );
    };
    return (
        <>
            <div className='d-flex p-40 flex-wrap'>
                {
                    player?.player?.images?.map((i, index) => {
                        let converted_path = i.replaceAll("\\", "/")
                        const url = baseUrl + converted_path;
                        return (
                            <div className="mr-20  mb-20" style={{
                                backgroundImage: `url(${url})`,
                                width: "200px",
                                height: "250px",
                                borderRadius: "15px",
                                backgroundSize: "cover"
                            }}
                                onClick={() => openModal(index)}
                            >
                            </div>
                        )
                    })
                }
            </div >
            <ImageGallery image={player.player?.images[currentImageIndex]} isOpen={isOpen} closeModal={closeModal} previousImage={previousImage} nextImage={nextImage} />
        </>
    )
}

export default Album
