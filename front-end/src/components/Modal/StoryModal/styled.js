import styled from 'styled-components'

export const StoryConponent = styled.div`
    width: 100%;
    height: 500px;

    .prev, .next{
        margin-top: 260px;
        margin-left: 50px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: #e3e3e3;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    .heart {
        margin-top: 80px;
    }
    
    .share, .heart, .gift {
        margin-left: 50px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #e3e3e3;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 19px;
        color: #666;
    }

    .prev:hover, .next:hover {
        background-color: #f0564a;
        color: white;
        cursor: pointer;
    }

    .heart:hover, .gift:hover, .share:hover {
        background-color: #e2e2e2;
        color: #333;
        cursor: pointer;
    }

    .video__content {
        margin-top: 30px;
        width: 90%;
        background-color: #666;
    }

    .user {
        height: 100%;
        background-color: #e3e3e3;
        color: #636363;
    }

    .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

    /* .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    } */
`