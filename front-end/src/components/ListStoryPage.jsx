import React from 'react';
import storyImage1 from '../assets/imagevideo2.jpg';
import storyImage3 from '../assets/imagevideo3.jpg';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';

export default function ListStoryPage() {
    const stories = [
        { id: 1, img: storyImage1, avatar: avatar1, name: 'Minh Châu' },
        { id: 2, img: storyImage3, avatar: avatar2, name: 'Hương Ly' },
        { id: 3, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
        { id: 4, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
        { id: 5, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
        { id: 6, img: storyImage1, avatar: avatar1, name: 'Minh Châu' },
        { id: 7, img: storyImage3, avatar: avatar2, name: 'Hương Ly' },
        { id: 8, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
        { id: 9, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
        { id: 10, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
    ];

    return (
        <>
            <div className="row">
                {stories.map(story => (
                    <div className="col-6 col-md-4 col-lg-2 mb-4" key={story.id}>
                        <div className="card rounded-4 text-white hover-card" style={styles.card}>
                            <img src={story.img} className="card-img-top rounded-top-4" style={styles.cardImage} alt="story" />
                            <div className="overlay-info" style={styles.overlayInfo}>
                                <img className='rounded-circle' src={story.avatar} style={styles.avatar} alt='none' />
                                <p className="mb-0" style={styles.name}>{story.name}</p>
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
        padding: "5px 10px"
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
