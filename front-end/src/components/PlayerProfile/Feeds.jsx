import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Feeds = () => {
    const { id } = useParams(); // Assuming you get the player id from the URL
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get(`http://localhost:3008/api/stories/user/${id}`);
                setStories(response.data);
            } catch (error) {
                setError('Error fetching stories.');
                console.error('Error fetching stories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, [id]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto px-4 mt-16">
            <div className="flex flex-wrap -mx-2">
                {stories.length === 0 ? (
                    <p className="text-center text-gray-500 w-full">No stories available.</p>
                ) : (
                    stories.map(story => (
                        <div key={story._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                            <div className="bg-white shadow-md rounded-md overflow-hidden">
                                <video className="w-full h-auto" src={`http://localhost:3008/${story.path}`} controls></video>
                                <p className="mt-2 p-2 text-gray-700 text-sm">{story.text}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Feeds;
