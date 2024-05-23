import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import LoginLeft from './LoginLeft';
import '../css/resetpassword.css'
function ResetPassword() {
    const { token } = useParams();
    const [email, setEmail] = useState("");
    const nav = useNavigate();
    const [pwRule, setPwRule] = useState([]);
    // useEffect(() => {
    //     token = atob(token);
    //     const splToken = token.split("&");
    //     setEmail(splToken[0]);
    //     if (splToken[1] < Date.now()) {
    //         nav("/");
    //     };
    // }, [])
    return (
        <Container fluid>
            <Row sx={{ backgroundColor: 'red'}}>
                <LoginLeft />
                <Col md={6} id='rp-right'>
                    <h1>Reset Password</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>New password</Form.Label>
                            <div className='pw-rule'>
                                {
                                    !pwRule.includes(1) ? (
                                        <ion-icon style={{ color: "red", fontSize: "20px" }} name="close-outline"></ion-icon>
                                    ) : (
                                        <ion-icon style={{ color: "green", fontSize: "20px" }} name="checkmark-outline"></ion-icon>
                                    )
                                }
                                <span>contains at least 8 characters</span>
                            </div>
                            <div className='pw-rule'>
                                {
                                    !pwRule.includes(2) ? (
                                        <ion-icon style={{ color: "red", fontSize: "20px" }} name="close-outline"></ion-icon>
                                    ) : (
                                        <ion-icon style={{ color: "green", fontSize: "20px" }} name="checkmark-outline"></ion-icon>
                                    )
                                }
                                <span>contains at least 1 of the following special characters ? . $ %</span>
                            </div>
                            <div className='pw-rule'>
                                {
                                    !pwRule.includes(3) ? (
                                        <ion-icon style={{ color: "red", fontSize: "20px" }} name="close-outline"></ion-icon>
                                    ) : (
                                        <ion-icon style={{ color: "green", fontSize: "20px" }} name="checkmark-outline"></ion-icon>
                                    )
                                }
                                <span>contains at least 1 number</span>
                            </div>
                            <div className='pw-rule'>
                                {
                                    !pwRule.includes(4) ? (
                                        <ion-icon style={{ color: "red", fontSize: "20px" }} name="close-outline"></ion-icon>
                                    ) : (
                                        <ion-icon style={{ color: "green", fontSize: "20px" }} name="checkmark-outline"></ion-icon>
                                    )
                                }
                                <span>contains at least one capital letter</span>
                            </div>
                            <Form.Control type="password" placeholder="Enter new password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formNewPassword">
                            <Form.Label>Confirm new password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm new password" />
                        </Form.Group>
                        <button id='login-submit'>
                            Reset
                        </button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default ResetPassword
