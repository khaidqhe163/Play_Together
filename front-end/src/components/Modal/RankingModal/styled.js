import styled from 'styled-components'

export const RankingComponent = styled.div`
    width: 100%;
    height: 850px;

    .title {
        text-align: center;
        font-size: 19px;
        font-weight: bold;
    }

    .custom-tabs .ant-tabs-nav {
        display: flex;
        justify-content: space-evenly;
    }

    .custom-tabs .ant-tabs-tab {
        flex-grow: 1;
        display: flex;
        justify-content: center;
    }

    .custom-tabs .ant-tabs-tab-active .fs-15 {
        border-bottom: solid #f0564a 2px;
    }

    .custom-tabs .ant-tabs-tab-btn {
        width: 100%;
        text-align: center;
    }



    .image-container {
        position: relative;
        display: inline-block;
    }
    
    .background-img {
        display: block; 
        position: relative;
        z-index: 1;
    }

    .foreground-img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 45%;
        height: auto;
        border-radius: 50%;
        z-index: 0;
    }

`