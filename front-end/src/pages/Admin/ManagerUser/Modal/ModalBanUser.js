import { Button } from "antd";
import api from '../../../../utils/axiosConfig.js'
import { Form, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const ModalBanUser = ({ show, players, onCancel, setPlayers, player, type }) => {
    const [complaint, setComplaint] = useState(null);
    const reason = useRef();
    const [disabledBtn, setDisabledBtn] = useState(true);

    useEffect(() => {
        if (player?.status && player?.status === true) {
            setDisabledBtn(false);
        }
    }, [show])
    useEffect(() => {
        if (complaint === null) return;
        disableSubmit();
    }, [complaint])
    const disableSubmit = () => {
        if (complaint >= 1 && reason && reason.current?.value !== "") {
            setDisabledBtn(false)
        } else
            setDisabledBtn(true)
    }

    const handleClose = () => {
        setDisabledBtn(true);
        setComplaint(null);
        onCancel();
    }
    const handleBan = async () => {
        try {
            let res;
            if (player.status) {
                res = await axios.put("http://localhost:3008/api/user/unban", {
                    userId: player._id
                })
            } else {
                res = await axios.post('http://localhost:3008/api/user/ban', {
                    complaint: Number(complaint),
                    userId: player._id,
                    reason: reason.current.value
                })
            }
            let newPlayer
            if (type === 1) {
                newPlayer = players.map((m) => {
                    if (m._id === res.data._id) return res.data;
                    else return m;
                })
            }
            else if (type === 2) {
                newPlayer = players.filter((m) => {
                    return m._id !== player._id;
                })
            }
            setPlayers(newPlayer);
            handleClose()
        } catch (error) {
            console.log(error);
        }
    }
    console.log("player", player);

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <h6>Bạn có muốn {player?.status ? "mở khoá" : "khoá"} "{player?.username}"</h6>
            </Modal.Header>
            {
                (!player?.status || player?.status === false) && (
                    <Modal.Body>
                        <div className="p-20">
                            <Form.Label className='mt-10' style={{ color: "black" }}>Chọn thời gian khoá tài khoản</Form.Label>
                            <Form.Select style={{ color: "black" }} onChange={(e) => { setComplaint(e.target.value) }}>
                                <option value="" disabled selected hidden>Chọn hình thức xử lý</option>
                                <option value={1} style={{ color: "black" }}>Cấm tài khoản 3 ngày</option>
                                <option value={2} style={{ color: "black" }}>Cấm tài khoản 7 ngày</option>
                                <option value={3} style={{ color: "black" }}>Cấm tài khoản 1 tháng</option>
                                <option value={4} style={{ color: "black" }}>Cấm tài khoản vĩnh viễn</option>
                            </Form.Select>
                            <Form.Label htmlFor="reason" className='mt-10' style={{ color: "black" }}>
                                Lý do cấm tài khoản
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                id="reason"
                                rows={2}
                                defaultValue=""
                                ref={reason}
                                onChange={disableSubmit} />
                        </div>
                    </Modal.Body>
                )
            }

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="success" disabled={disabledBtn} onClick={handleBan}>
                    {player?.status === false ? "Khóa" : "Mở khóa"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalBanUser;