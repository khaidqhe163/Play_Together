import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useRef } from 'react';
function ForgotPassword({ show, handleClose }) {
    const email = useRef();
    const handleSendEmail = async () => {
        try {
            await axios.post("http://localhost:3008/account/reset-password", {
                email: email.current.value
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor='rp-email'>Enter your email</label> <br></br>
                <input type='text' placeholder='Enter you email' id="rp-email"
                    style={{ width: "75%", borderRadius: "10px", padding: "5px" }} ref={email} />
                <button style={{ padding: "7px 15px", borderRadius: "10px", backgroundColor: "#6b47ff", border: "none", marginLeft: "30px" }}
                    onClick={handleSendEmail}>Send</button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancle
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ForgotPassword;