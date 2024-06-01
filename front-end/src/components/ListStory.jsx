import React, { useState, useEffect } from 'react';
import storyImage1 from '../assets/imagevideo2.jpg';
import storyImage2 from '../assets/imagevideo1.jpg';
import storyImage3 from '../assets/imagevideo3.jpg';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';
import { baseUrl } from '../utils/service';
import { FaRegEye } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import StoryModal from './Modal/StoryModal';

export default function ListStory() {

    const [openModalStory, setOpenModalStory] = useState()
    const [stories, setStories] = useState([]);
    const fetchApiStory = async () => {
        try {
            const response = await fetch(baseUrl + 'api/stories');
            const data = await response.json();
            setStories(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApiStory();
    }, []);
    

    return (
        <>
            <div className="row" style={{maxHeight:"25em"}}>
                {stories.slice(0, 5).map(story => (
                    <div className="col-md-2 mb-4" key={story._id}
                        onClick={() => setOpenModalStory(story)}
                    >
                        <div className="card rounded-4 w-100 h-100 text-white hover-card" style={{ backgroundColor: "#20202b" }}>
                            <div className='mx-auto position-relative'>
                                <img src={baseUrl+story.thumbnail} style={{ width: "11em", height: "15em", objectFit: "cover" }} className=" mt-2 card-img-top img-fluid mx-auto rounded-top-4" alt="story" />
                                <p className='position-absolute' style={{ bottom: "-10px", right: "10px" }}><FaRegEye />120</p>
                            </div>
                            <div className="card-body py-2 d-flex align-items-center">
                                {/* <h5 className="card-title">{story.name}</h5> */}
                                <img className='rounded-circle' src={baseUrl+story.author.avatar} style={{ width: "2em", height: "2em", objectFit: "cover", objectPosition: "center", marginRight: "5px" }} alt='none' />
                                <p className="card-text">{story.author.username}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="col-md-2 mb-4">
                    <div className="card rounded-4 w-100 h-100 text-white hover-card" style={{ backgroundColor: "#20202b" }}>
                        <div className='mx-auto d-flex align-items-center justify-content-center w-100' style={{ height: "16em" }}>
                            <div>
                                <GrLinkNext className='b' size={50} />
                            </div>
                        </div>
                        <div className="card-body py-2 d-flex align-items-center">
                            <p className="card-text mx-auto">Xem thêm</p>
                        </div>
                    </div>
                </div>
            </div>

            {!!openModalStory && (
                <StoryModal
                    open={openModalStory}
                    onCancel={() => setOpenModalStory(undefined)}
                    // onOk={getList}
                />
            )}
        </>
    );
}