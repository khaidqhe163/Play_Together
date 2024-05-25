import React from 'react';
import storyImage1 from '../assets/imagevideo2.jpg';
import storyImage2 from '../assets/imagevideo1.jpg';
import storyImage3 from '../assets/imagevideo3.jpg';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';
import { FaRegEye } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";

export default function ListStory() {
    const stories = [
        { id: 1, img: storyImage1, avatar: avatar1, name: 'Minh Châu' },
        { id: 2, img: storyImage2, avatar: avatar2, name: 'Hương Ly' },
        { id: 3, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
        { id: 4, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
        { id: 5, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
    ];

    return (
        <>
            <div className="row" style={{maxHeight:"25em"}}>
                {stories.map(story => (
                    <div className="col-md-2 mb-4" key={story.id}>
                        <div className="card rounded-4 w-100 h-100 text-white hover-card" style={{ backgroundColor: "#20202b" }}>
                            <div className='mx-auto position-relative'>
                                <img src={story.img} style={{ width: "11em", height: "15em", objectFit: "cover" }} className=" mt-2 card-img-top img-fluid mx-auto rounded-top-4" alt="story" />
                                <p className='position-absolute' style={{ bottom: "-10px", right: "10px" }}><FaRegEye />120</p>
                            </div>
                            <div className="card-body py-2 d-flex align-items-center">
                                {/* <h5 className="card-title">{story.name}</h5> */}
                                <img className='rounded-circle' src={story.avatar} style={{ width: "2em", height: "2em", objectFit: "cover", objectPosition: "center", marginRight: "5px" }} alt='none' />
                                <p className="card-text">{story.name}</p>
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
        </>
    );
}