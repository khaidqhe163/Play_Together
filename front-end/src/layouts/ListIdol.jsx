import '../App.css';
import storyImage1 from '../assets/imagevideo2.jpg';
import storyImage3 from '../assets/imagevideo3.jpg';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';

export default function ListIdol() {
    const stories = [
        { id: 1, img: storyImage1, avatar: avatar1, name: 'Minh Châu' },
        { id: 2, img: storyImage3, avatar: avatar2, name: 'Hương Ly' },
        { id: 3, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
        { id: 4, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
        { id: 5, img: storyImage3, avatar: avatar3, name: 'Hương Thảo' },
    ];

    const containerStyle = {
        backgroundColor: "#20202b",
        width: "100%",
        position: "sticky",
        top: "56px",
        height: "calc(100vh - 70px)",
        overflowY: "auto",
        padding: "20px",
    };

    const headingStyle = {
        color: "#bcbcbc",
        marginBottom: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "left",
    };

    const buttonContainerStyle = {
        display: "flex",
        alignItems: "center",
        marginBottom: "30px",
    };

    const buttonStyle = {
        backgroundColor: "#8d68f2",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontSize: "24px",
        marginRight: "10px",
    };

    const textContainerStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const iconStyle = {
        fontSize: "24px",
    };

    const storyContainerStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    };

    const storyStyle = {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#282834",
        borderRadius: "10px",
        color: "#fff",
        transition: "background-color 0.3s ease",
    };

    const storyHoverStyle = {
        backgroundColor: "#383844",
    };

    const avatarStyle = {
        width: "3em",
        height: "3em",
        objectFit: "cover",
        objectPosition: "center",
        marginRight: "10px",
        borderRadius: "50%",
    };

    const nameStyle = {
        margin: 0,
        fontSize: "16px",
    };

    return (
        <div style={containerStyle}>
            <div>
                <p style={headingStyle}>Tin của bạn</p>
                <div style={buttonContainerStyle}>
                    <button style={buttonStyle}>
                        <i className="bi bi-plus-circle-fill" style={iconStyle}></i>
                    </button>
                    <div style={textContainerStyle}>
                        <h5 style={{ color: "#fff", margin: "0" }}>Tạo tin</h5>
                        <p style={{ color: "#bcbcbc", margin: "0" }}>Bạn có thể tạo tin ở đây</p>
                    </div>
                </div>
            </div>
            <div>
                <p style={headingStyle}>Thịnh hành</p>
                <div style={storyContainerStyle}>
                    {stories.map(story => (
                        <div 
                            key={story.id} 
                            style={storyStyle} 
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = storyHoverStyle.backgroundColor} 
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = storyStyle.backgroundColor}
                        >
                            <img src={story.avatar} style={avatarStyle} alt='Avatar' />
                            <p style={nameStyle}>{story.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
