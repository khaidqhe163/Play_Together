import React, { useState } from 'react';
import api from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlayerAlbum = () => {
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        try {
            const response = await api.post('http://localhost:3008/api/user/album', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Đăng ảnh thành công');
            console.log(response.data); // handle response from server if needed
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('Đăng ảnh thất bại');
        }
    };

    return (
        <div className="container">
            <h1 className='text-white mb-4'>Album của tôi</h1>
            <form onSubmit={handleSubmit} className="">
                <input type="file" multiple onChange={handleImageChange} className="mb-4" />
                <div className="grid grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                            <img src={preview} alt={`Image ${index}`} className="rounded-lg w-full h-auto" />
                        </div>
                    ))}
                </div>
                <button type="submit" className="bg-[#7b47ff] text-white font-bold py-2 px-4 rounded mt-4" >
                    Đăng
                </button>
            </form>
            {uploadStatus && <p className="text-center mt-4">{uploadStatus}</p>}
        </div>
    );
};

export default PlayerAlbum;
