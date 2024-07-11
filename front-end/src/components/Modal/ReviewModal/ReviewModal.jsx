import React, { useRef } from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import '../../../css/reviewmodal.css'
import { TiStarFullOutline } from "react-icons/ti";
import api from '../../../utils/axiosConfig'
import { toast } from 'react-toastify';

function ReviewModal({ show, handleClose, player, setListBooking, currentIndex, listBooking }) {
    const [rating, setRating] = useState(0);
    const content = useRef();
    console.log(player);
    const handleSubmit = async () => {
        try {
            const review = api.post('/api/comment/review-player', {
                userId: player.playerId,
                rating: rating,
                content: content.current.value,
                bookingId: player._id
            })
            content.current.value = "";
            const updatedArr = listBooking.map((l, index) => {
                if (index === currentIndex) {
                    l.bookingReview = review._id;
                }
                return l;
            })
            setListBooking(updatedArr);
            setRating(0);
            handleClose();
            toast("Đánh giá thành công")
            console.log(review);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header style={{ backgroundColor: "#20202b" }}>
                <Modal.Title>Review Player</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#20202b", color: "white", textAlign: "center" }}>
                <img className='rounded-circle w-20 m-auto' src={"http://localhost:3008/" + player?.avatar} alt='error' />
                <p className='fw-bold fs-20'>{player?.username}</p>
                <p class="star-rating">
                    <label htmlFor="rate-1" style={{ '--i': 1 }}><i><TiStarFullOutline /></i></label>
                    <input type="radio" name="rating" id="rate-1" value="1" onClick={() => setRating(1)} />
                    <label htmlFor="rate-2" style={{ '--i': 2 }}><i><TiStarFullOutline /></i></label>
                    <input type="radio" name="rating" id="rate-2" value="2" onClick={() => setRating(2)} />
                    <label htmlFor="rate-3" style={{ '--i': 3 }}><i><TiStarFullOutline /></i></label>
                    <input type="radio" name="rating" id="rate-3" value="3" onClick={() => setRating(3)} />
                    <label htmlFor="rate-4" style={{ '--i': 4 }}><i><TiStarFullOutline /></i></label>
                    <input type="radio" name="rating" id="rate-4" value="4" onClick={() => setRating(4)} />
                    <label htmlFor="rate-5" style={{ '--i': 5 }}><i><TiStarFullOutline /></i></label>
                    <input type="radio" name="rating" id="rate-5" value="5" onClick={() => setRating(5)} />
                </p>
                <Form.Control as="textarea" rows={3} ref={content} />
                <div className='mt-20 d-flex justify-content-evenly'>
                    <Button variant='dark' className='w-40' onClick={handleClose}>Not now</Button>
                    <Button variant='success' className='w-40' onClick={handleSubmit}>Submit</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ReviewModal
