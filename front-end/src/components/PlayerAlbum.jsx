import React, { useState } from 'react';
import axios from 'axios';

const PlayerAlbum = () => {
    const [images, setImages] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        try {
            const response = await axios.post('http://localhost:3008/api/user/album', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploadStatus('Upload successful');
            console.log(response.data); // handle response from server if needed
        } catch (error) {
            console.error('Error uploading images:', error);
            setUploadStatus('Upload failed');
        }
    };

    return (
        <div>
            <h2>Upload Images</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" multiple onChange={handleImageChange} />
                <button type="submit">Upload</button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default PlayerAlbum;
