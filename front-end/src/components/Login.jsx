import React, { useRef, useState } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import "../css/login.css"
import LoginLeft from './LoginLeft'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setUserInformation } from '../features/userSlice'
import ForgotPassword from './ForgotPassword'
function Login() {
    const nav = useNavigate();
    const email = useRef();
    const password = useRef();
    const dispatch = useDispatch();

    const [showResetPassword, setShowResetPassword] = useState(false);

    const handleClose = () => setShowResetPassword(false);
    const handleShow = () => setShowResetPassword(true);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userInfo = await axios.post(`http://localhost:3008/api/user/login`, {
                email: email.current.value,
                password: password.current.value
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
            )
            console.log(userInfo);
            dispatch(setUserInformation(userInfo.data));
            nav('/')
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                alert(error.response.data.message)
            } else {
                alert('Xin lỗi: Đang có một vấn đề gì đó xảy ra');
            }
        }
    }

    const loginGG = (e, type) => {
        let url;
        type === 1 ? url = 'http://localhost:3008/api/user/auth/google' : url = "http://localhost:3008/api/user/auth/facebook";
        window.open(url, '_self')
    }
    return (
        <Container fluid>
            <Row>
                <LoginLeft />
                <Col md={6} id='login-rightside'>
                    <div id='login-header'>
                        <button onClick={() => { nav('/register') }}>Sign up</button>
                        <div id='login-close'>
                            <ion-icon name="close-outline"></ion-icon>
                        </div>
                    </div>
                    <div id='formlogin'>
                        <h1>Login</h1>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" ref={email} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" ref={password} />
                            </Form.Group>
                            <p style={{ marginBottom: "5px", color: "blue", textAlign: "left", cursor: "pointer" }}
                                onClick={handleShow}>Forgot Password</p> <br />
                            <button id='login-submit'>
                                Submit
                            </button>
                        </Form>
                        <p>or continue with</p>
                        <div id='login-alter'>
                            <button onClick={(e) => loginGG(e, 1)}>
                                <ion-icon name="logo-google"></ion-icon>
                            </button>
                            <button onClick={(e) => loginGG(e, 2)}>
                                <ion-icon name="logo-facebook"></ion-icon>
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
            <ForgotPassword show={showResetPassword} handleClose={handleClose} />
        </Container>
    )
}

export default Login
