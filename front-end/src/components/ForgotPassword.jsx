import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useRef, useState } from 'react';
function ForgotPassword({ show, handleClose }) {
    const [email, setEmail] = useState();
    const [sendEmail, setSendEmail] = useState(false);
    const handleSendEmail = async () => {
        try {
            await axios.post("http://localhost:3008/api/user/forgot-password", {
                email: email.trim()
            })
            setSendEmail(true);
            setTimeout(() => {
                setEmail("");
                setSendEmail(false);
                handleClose();
            }, 5000)
        } catch (error) {
            console.log(error);
        }
    }
    console.log(email);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    !sendEmail ? (
                        <>
                            <label htmlFor='rp-email'>Enter your email</label> <br></br>
                            <input type='text' placeholder='Enter you email' id="rp-email"
                                style={{ width: "75%", borderRadius: "10px", padding: "5px" }} onChange={(e) => { setEmail(e.target.value) }} />
                            <button style={{
                                padding: "7px 15px", borderRadius: "10px", backgroundColor: "#6b47ff", border: "none", marginLeft: "30px",
                                color: "white"
                            }}
                                onClick={handleSendEmail}>Send</button>
                        </>
                    ) : (
                        <p>Email reset password đã được gửi tới <span style={{ color: "#6b47ff" }}>{email}</span></p>
                    )
                }

            </Modal.Body>
        </Modal>
    );
}

export default ForgotPassword;