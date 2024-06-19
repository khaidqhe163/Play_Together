import styled from 'styled-components'

export const HomeContainer = styled.div `
    width: 100%;
    height: 100%;
    margin-top: 10px;

    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
        background: rgb(24 144 227);
    }

    :where(.css-dev-only-do-not-override-17seli4).ant-menu-dark {
        background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
    }

    :where(.css-dev-only-do-not-override-17seli4).ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline {
        background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
    }

    .ant-menu-sub.ant-menu-inline > .ant-menu-item {
        margin-left: 30px;
        width: 250px
    }
`