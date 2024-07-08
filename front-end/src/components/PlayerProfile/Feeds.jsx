import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../layouts/NavBar';
import ListIdol from '../../layouts/ListIdol';
import ListStoryPage from "../../components/ListStoryPage";
import StoryModal from '../../components/Modal/StoryModal';
import { Spin } from 'antd';
import axios from 'axios';

export default function Feeds() {
    const { id } = useParams(); // Assuming you get the player id from the URL
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentStory, setCurrentStory] = useState();
    const [openModalStory, setOpenModalStory] = useState(false);

    useEffect(() => {
        if (currentStory !== undefined && !openModalStory) {
            setOpenModalStory(true);
        }
    }, [currentStory]);

    const fetchStories = async () => {
        try {
            const response = await axios.get(`http://localhost:3008/api/stories/user/${id}`);
            setStories(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching stories:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, [id]);

    if (loading) {
        return <Spin spinning={loading} className='d-flex justify-content-center align-content-center h-100'></Spin>;
    }

    const handleViewStory = async () => {
        try {
            const res = await axios.post('/api/stories/viewStory/' + stories[currentStory]?._id);
            if (res?.isError) return;
        } catch (error) {
            console.log(error);
        } 
    };

    return (
        <div className="container-fluid d-flex flex-column vh-100 overflow-x-hidden bg-bgMain">
            <div className="col-10">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-10 py-3">
                            <ListStoryPage stories={stories} setOpenModalStory={setOpenModalStory} setCurrentStory={setCurrentStory} handleViewStory={handleViewStory} />
                        </div>
                    </div>
                </div>

            {!!openModalStory && (
                <StoryModal
                    open={stories[currentStory]}
                    onCancel={() => setOpenModalStory(undefined)}
                    setCurrentStory={setCurrentStory}
                    stories={stories}
                    onViewStory={handleViewStory}
                    onOk={fetchStories}
                />
            )}
        </div>
    );
}
