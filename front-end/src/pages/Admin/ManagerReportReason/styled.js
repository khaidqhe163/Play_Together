import styled from 'styled-components'

export const ContainerPage = styled.div `
    width: 90%;
    margin: auto;
    position: relative;

    .title {
        background: linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232));
        color: rgb(52, 71, 103);
        border-radius: 0.5rem;
        padding: 24px 16px;
        opacity: 1;
        z-index: 2;
        width: 95%;
        margin: auto;
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

    .data {
        height: 500px;
        max-height: 500px;
        overflow-y: auto;
        border: 0px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.75rem;
        background: white;
        box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;
        /* overflow: visible; */
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        z-index: 1;
        margin-top: -60px;
        position: relative;

        .data_table {
            display: table;
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0px;
        }

        td {
            text-align: left;
            padding: 12px 24px;
            opacity: 1;
            background: transparent;
            color: rgb(52, 71, 103);
            box-shadow: none;
            font-size: 0.875rem;
            border-bottom: 0.0625rem solid rgb(240, 242, 245);
            font-weight: 600;
            
        }
    }

`