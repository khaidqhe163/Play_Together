import React from 'react'
import { Col } from 'react-bootstrap'
import "../css/login.css"
import { IoGameController } from "react-icons/io5";
import { IconContext } from 'react-icons/lib';
function LoginLeft() {
    return (
        <Col md={6} id='login-leftside'>
            <IconContext.Provider value={{ color: "white", size: "3em" }}>
                <IoGameController />
            </IconContext.Provider>
            <h2>Play Together</h2>
            <img src='photo-1-1641312073214533330565.webp' alt='error' id='login-img' />
        </Col>
    )
}

export default LoginLeft
