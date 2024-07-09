import React, { useState } from 'react';

function PlayerAlbum() {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImages(prevImages => [...prevImages, reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = (index) => {
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    return (
        <>
            <h1 className='text-white'>Album</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImages.length > 0 && (
                <div>
                    <h2 className='text-white'>Selected Images:</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selectedImages.map((image, index) => (
                            <div key={index} style={{ position: 'relative', margin: '10px' }}>
                                <img src={image} alt={`Selected ${index}`} style={{ maxWidth: '100%', height: 'auto' }} />
                                <button
                                    onClick={() => handleDeleteImage(index)}
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        background: 'red',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '25px',
                                        height: '25px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        lineHeight: '25px',
                                        textAlign: 'center',
                                        padding: '0',
                                    }}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default PlayerAlbum;
