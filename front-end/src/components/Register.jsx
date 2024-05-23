import React, { useState } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import LoginLeft from './LoginLeft'
import { useNavigate } from 'react-router-dom'
import '../css/register.css'
import { useFormik } from 'formik';
import axios from 'axios'
function Register() {
    const nav = useNavigate();
    const [pwRule, setPwRule] = useState([]);
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
        console.log(value);
    }
    const validate = values => {
        const errors = {};
        if (!values.username) {
            errors.username = 'Bắt buộc';
        }
        if (!values.email) {
            errors.email = 'Bắt buộc';
        }

        if (!values.dob) {
            errors.dob = 'Bắt buộc';
        }

        if (!values.dob) {
            errors.dob = 'Bắt buộc';
        }


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
            email: '',
            username: '',
            gender: 'Nam',
            password: '',
            cfpassword: '',
            dob: '',
        },
        validate,
        onSubmit: values => {
            handleSubmit(values);
        },
    });

    const handleSubmit = async (values) => {
        try {
            await axios.post("http://localhost:3008/api/user/register", values);
            console.log("success");
            nav('/login')
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message)
            } else {
                alert('Xin lỗi: Đang có một vấn đề gì đó xảy ra');
            }
        }
    }
    return (
        <Container fluid>
            <Row>
                <LoginLeft />
                <Col md={6} id='login-rightside'>
                    <div id='login-header'>
                        <button onClick={() => { nav('/login') }}>Đăng nhập</button>
                        <div id='login-close'>
                            <ion-icon name="close-outline"></ion-icon>
                        </div>
                    </div>
                    <div id='formRegister'>
                        <h1>Đăng ký</h1>
                        <Form onSubmit={formik.handleSubmit} id='registerForm'>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name='email' placeholder="Nhập email" value={formik.values.email} onChange={formik.handleChange} />
                            </Form.Group>
                            {formik.touched.email && formik.errors.email ? <div className='register-error'>{formik.errors.email}</div> : null}
                            <Form.Group className="mb-3" controlId="formUserName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name='username' placeholder="Nhập username" value={formik.values.username} onChange={formik.handleChange} />
                            </Form.Group>
                            {formik.touched.username && formik.errors.username ? <div className='register-error'>{formik.errors.username}</div> : null}
                            <Form.Group className="mb-3" controlId="formDob">
                                <Form.Label>Ngày sinh</Form.Label>
                                <Form.Control type="date" name='dob' placeholder="Nhập username" value={formik.values.dob} onChange={formik.handleChange} />
                            </Form.Group>
                            {formik.touched.dob && formik.errors.dob ? <div className='register-error'>{formik.errors.dob}</div> : null}
                            <Form.Group className="mb-3" controlId="formGender">
                                <Form.Label>Giới tính</Form.Label>
                                <Form.Select value={formik.values.gender} onChange={formik.handleChange} name='gender'>
                                    <option value={"Nam"}>Nam</option>
                                    <option value={"Nữ"}>Nữ</option>
                                    <option value={"Khác"}>Khác</option>
                                </Form.Select>
                            </Form.Group>
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
                                Đăng ký
                            </button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Register
