import styled from 'styled-components'


export const DashboardContainer = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;

    .title {
        background: linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232));
        color: rgb(52, 71, 103);
        border-radius: 0.5rem;
        padding: 5px 16px;
        opacity: 1;
        z-index: 2;
        width: 500px;
        margin-left: 20px;
        margin-top: 20px;
        position: relative;


        h6 {
            color: rgb(255, 255, 255);
            font-size: 1.25rem;
            line-height: 1.625;
            font-family: Roboto, Helvetica, Arial, sans-serif;
            font-weight: 700;
            letter-spacing: 0.0075em;
            opacity: 1;
            text-transform: none;
            vertical-align: unset;
        }
    }

    .card {
        z-index: 1;
        margin-top: -5px;
    }

    .card-item {
        display: flex;
        height: 100px;
        margin: 0 8px; 
        
        .left-side, .right-side {
            padding: 15px; 
        }
        .money {
            font-weight: 800;
            font-size: 20px;
            margin-bottom: 6px;
        }
        .name {
            font-size: 15px;
            font-weight: 500;
            color: gray;
        }
        .icon {
            height: 60px;
            width: 60px;
            border-radius: 50%;
            background: hsl(212.73deg 44% 95.1%);
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }


    .item1 {
        border-top-left-radius: 10%;
        border-bottom-left-radius: 10%;
    }
    
    .item2 {
        border-top-right-radius: 10%;
        border-bottom-right-radius: 10%;
    }

`