import React, { useEffect, useState } from 'react';
import ListIdol from '../layouts/ListIdol';
import NavBar from '../layouts/NavBar';
import ListStoryPage from "../components/ListStoryPage";
import StoryModal from '../components/Modal/StoryModal';
import api from '../utils/axiosConfig'
import { Spin } from 'antd';

export default function StoryPage() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentStory, setCurrentStory] = useState();
    const [openModalStory, setOpenModalStory] = useState(false)

    useEffect(() => {
        if (currentStory !== undefined && !openModalStory) {
            setOpenModalStory(true);
        }
    }, [currentStory])

    const getListStories = async () => {
        try {
            const response = await fetch('http://localhost:3008/api/stories');
            const data = await response.json();
            setStories(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching stories:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getListStories()
    }, [])

    if (loading) {
        return <Spin spinning={loading} className='d-flex justify-content-center align-content-center h-100'></Spin>;
    }

    const handleViewStory = async () => {
        try {
            const res = await api.post('/api/stories/viewStory/' + stories[currentStory]?._id)
            if (res?.isError) return
        } catch (error) {
            console.log(error);
        } finally {
        }
    }


    return (
        <div className="container-fluid d-flex flex-column vh-100 overflow-x-hidden bg-bgMain">
            <div className="row sticky-top bg-white shadow-sm" style={{ zIndex: '1' }}>
                <div className="col-12">
                    <NavBar />
                </div>
            </div>
            <div className="row flex-grow-1">
                <div className="col-2 p-0">
                    <div className="sticky-top" style={{ top: '4rem' }}>
                        <ListIdol stories={stories} setStory={setStories} />
                    </div>
                </div>
                <div className="col-10" style={{ backgroundColor: '#20202b' }}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-10 py-3">
                            <ListStoryPage stories={stories} setOpenModalStory={setOpenModalStory} setCurrentStory={setCurrentStory} handleViewStory={handleViewStory} />
                        </div>
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
                    onOk={getListStories}
                // story={stories[currentStory]}
                // onOk={getList}
                />
            )}
        </div>

    );
};
