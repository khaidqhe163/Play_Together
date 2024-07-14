import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import LoginLeft from './LoginLeft';
import '../css/resetpassword.css'
import axios from 'axios'
import { useFormik } from 'formik';
function ResetPassword() {
    const { token } = useParams();
    const [email, setEmail] = useState("");
    const nav = useNavigate();
    const [pwRule, setPwRule] = useState([]);
    useEffect(() => {
        verifyToken();
    }, [])

    const verifyToken = async () => {
        try {
            const verifiedToken = await axios.post("http://localhost:3008/api/user/verify-password-token", {
                token: token
            })
            setEmail(verifiedToken.data.email);
        } catch (error) {
            nav("/");
            // console.log(error.toString());
        }
    }
    const handleCheckPwRule = (e) => {
        const value = e.target.value;
        const pwRules = [];
        if (value.length >= 8 && !pwRules.includes(1)) {
            pwRules.push(1);
        }
        if (/[A-Z]/.test(value) && !pwRules.includes(4)) {
            pwRules.push(4);
        }
        if (/[.%$?]/.test(value) && !pwRules.includes(2)) {
            pwRules.push(2);
        }
        if (/\d/.test(value) && !pwRules.includes(3)) {
            pwRules.push(3);
        }
        setPwRule(pwRules);
    }
    const validate = values => {
        const errors = {};
        if (!values.password) {
            errors.password = 'Bắt buộc';
        }

        if (!values.cfpassword) {
            errors.cfpassword = 'Bắt buộc';
        }
        if (values.password && !/^(?=.*[0-9])(?=.*[A-Z])(?=.*[?.$%])(?=.{8,}).*$/.test(values.password)) {
            errors.password = 'Mật khẩu không hợp lệ';
        }
        if (values.password.trim() !== values.cfpassword.trim() && values.password && values.cfpassword) {
            errors.cfpassword = 'Mật khẩu không khớp';
        }

        return errors;
    };
    const formik = useFormik({
        initialValues: {
            password: '',
            cfpassword: ''
        },
        validate,
        onSubmit: values => {
            handleSubmit(values);
        },
    });

    const handleSubmit = async (values) => {
        try {
            await axios.post("http://localhost:3008/api/user/reset-password", {
                email: email,
                ...values
            });
            nav('/login')
        } catch (error) {
            alert('Xin lỗi: Đang có một vấn đề gì đó xảy ra');
        }
    }
    return (
        <Container fluid>
            <Row sx={{ backgroundColor: 'red' }}>
                <LoginLeft />
                <Col md={6} id='rp-right'>
                    <h1>Reset Password</h1>
                    <Form onSubmit={formik.handleSubmit} id='registerForm'>
                        <Form.Group className="mb-3" controlId="formPassword" onChange={handleCheckPwRule}>
                            <Form.Label>Mật khẩu</Form.Label>
                            <div className='pw-rule'>
                                {
                                    !pwRule.includes(1) ? (
                                        <ion-icon style={{ color: "red", fontSize: "20px" }} name="close-outline"></ion-icon>
                                    ) : (
                                        <ion-icon style={{ color: "green", fontSize: "20px" }} name="checkmark-outline"></ion-icon>
                                    )
                                }
                                <span>chứa ít nhất 8 ký tự</span>
                            </div>
                            <div className='pw-rule'>
                                {
                                    !pwRule.includes(2) ? (
                                        <ion-icon style={{ color: "red", fontSize: "20px" }} name="close-outline"></ion-icon>
                                    ) : (
                                        <ion-icon style={{ color: "green", fontSize: "20px" }} name="checkmark-outline"></ion-icon>
                                    )
                                }
                                <span>chứa ít nhất 1 trong những ký tự sau đây ? . $ %</span>
                            </div>
                            <div className='pw-rule'>
                                {
                                    !pwRule.includes(3) ? (
                                        <ion-icon style={{ color: "red", fontSize: "20px" }} name="close-outline"></ion-icon>
                                    ) : (
                                        <ion-icon style={{ color: "green", fontSize: "20px" }} name="checkmark-outline"></ion-icon>
                                    )
                                }
                                <span>chứa ít nhất 1 số</span>
                            </div>
                            <div className='pw-rule'>
                                {
                                    !pwRule.includes(4) ? (
                                        <ion-icon style={{ color: "red", fontSize: "20px" }} name="close-outline"></ion-icon>
                                    ) : (
                                        <ion-icon style={{ color: "green", fontSize: "20px" }} name="checkmark-outline"></ion-icon>
                                    )
                                }
                                <span>chứa ít nhất 1 chữ in hoa</span>
                            </div>
                            <Form.Control type="password" name='password' placeholder="Nhập mật khẩu" value={formik.values.password} onChange={formik.handleChange} />
                        </Form.Group>
                        {formik.touched.password && formik.errors.password ? <div className='register-error'>{formik.errors.password}</div> : null}
                        <Form.Group className="mb-3" controlId="formCFPassword">
                            <Form.Label>Nhập lại mật khẩu</Form.Label>
                            <Form.Control type="password" name='cfpassword' placeholder="Nhập lại mật khẩu" value={formik.values.cfpassword} onChange={formik.handleChange} />
                        </Form.Group>
                        {formik.touched.cfpassword && formik.errors.cfpassword ? <div className='register-error'>{formik.errors.cfpassword}</div> : null}
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
