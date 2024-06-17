import React from 'react';
import { baseUrl } from '../utils/service.js'
import api from '../utils/axiosConfig.js';

export default function ListStoryPage({ stories, setOpenModalStory, setCurrentStory }) {

    // const handleViewStory = async () => {
    //     try {
    //       const res = await api.post('/api/stories/viewStory/' + stories?._id)
    //       if (res?.isError) return 
    //     } catch (error) {
    //       console.log(error);
    //     } finally { 
    //     }
    // }

    return (
        <>
            <div className="row">
                {stories?.map((story, index) => (
                    <div className="col-6 col-md-4 col-lg-2 mb-4" key={story._id}
                        onClick={() => setCurrentStory(index)}
                    >
                        <div className="card rounded-4 text-white hover-card" style={styles.card}>
                            <img src={baseUrl + story.thumbnail} className="card-img-top rounded-top-4" style={styles.cardImage} alt="story" />
                            <div className="overlay-info" style={styles.overlayInfo}>
                                <img className='rounded-circle' src={baseUrl + story.author?.avatar} style={styles.avatar} alt='author' />
                                <p className="mb-0" style={styles.name}>{story.author?.username}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}

const styles = {
    card: {
        backgroundColor: "#20202b",
        position: "relative",
        width: "100%",
        textAlign: "center",
        overflow: "hidden"
    },
    cardImage: {
        width: "100%",
        height: "15em",
        objectFit: "cover"
    },
    overlayInfo: {
        position: "absolute",
        top: "10px",
        left: "10px",
        display: "flex",
        alignItems: "center",
        borderRadius: "5px",
        padding: "5px 10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    avatar: {
        width: "2em",
        height: "2em",
        objectFit: "cover",
        objectPosition: "center",
        marginRight: "5px"
    },
    name: {
        margin: "0",
        color: "#fff",
        fontWeight: "bold"
    }
};
