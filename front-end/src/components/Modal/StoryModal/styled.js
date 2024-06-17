import styled from 'styled-components'

export const StoryConponent = styled.div`
    width: 100%;
    height: 530px;
    background-color: hsl(240deg 2.38% 16.47%);

    .prev, .next{
        margin-top: 260px;
        margin-left: 50px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: hsl(0deg 0.78% 74.71%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    .video {
        background-color: hsl(240deg 2.38% 16.47%);
    }

    .heart {
        margin-top: 80px;
    }
    
    .share, .heart, .gift {
        margin-left: 50px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: hsl(0deg 0.78% 74.71%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 19px;
        color: hsl(0deg 0.8% 24.51%);
    }

    .prev:hover, .next:hover {
        background-color: #f0564a;
        color: white;
        cursor: pointer;
    }

    .created {
        color: hsl(0deg 1.4% 87.97%)
    }

    .heart:hover, .gift:hover, .share:hover {
        background-color: #e2e2e2;
        color: #333;
        cursor: pointer;
    }

    .video__content {
        /* margin-top: 10px; */
        padding-top: 15px;
        width: 100%;
    }

    .col-user {
        height: 530px;
    }

    .user {
        height: 100%;
        background-color: #1f1f22;
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

    .avatar-commnet {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .reply_story_comment:hover {
        color: white;
        cursor: pointer;
    }
`