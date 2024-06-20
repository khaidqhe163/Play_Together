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
        <div className="flex flex-col items-center space-y-4">
            {stories.length === 0 ? (
                <p className="text-center text-gray-500">No stories available.</p>
            ) : (
                stories.map(story => (
                    <div key={story._id} className="w-full max-w-md p-2 bg-white shadow rounded">
                        <video className="w-full rounded" src={`http://localhost:3008/${story.path}`} controls></video>
                        <p className="mt-2 text-gray-700 text-sm">{story.text}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Feeds;
