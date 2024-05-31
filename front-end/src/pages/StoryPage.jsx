import React, { useEffect, useState } from 'react';
import ListIdol from '../layouts/ListIdol';
import NavBar from '../layouts/NavBar';
import ListStoryPage from "../components/ListStoryPage";

export default function StoryPage() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
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

        fetchStories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
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
                            <ListStoryPage stories={stories} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
