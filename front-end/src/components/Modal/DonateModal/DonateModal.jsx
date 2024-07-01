import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DonateModal.css';
import { userInfor } from '../../../features/userSlice';
import { useSelector } from 'react-redux';

function DonateModal({ showDonate, handleClose, player }) {
    const userInfo = useSelector(userInfor);
    const [objDonate, setObjDonate] = useState({
        userId: userInfo?._id,
        playerId: player?._id,
        money: 0,
        content: "",
    });

    useEffect(() => {
        if (userInfo && player) {
            setObjDonate({
                userId: userInfo._id,
                playerId: player._id,
                money: 0,
                content: "",
            });
        }
    }, [userInfo, player]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjDonate((prev) => ({
            ...prev,
            [name]: name === "money" ? parseInt(value) : value,
        }));
    };

    console.log(objDonate);

    return (
        <>
            <Modal show={showDonate} onHide={handleClose} size="lg">
                <Modal.Header closeButton className="custom-modal-header">
                    <Modal.Title className="custom-modal-title">Donate</Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">
                    <table className="tablex">
                        <tbody>
                            <tr>
                                <td>Người nhận</td>
                                <td>{player?.username}</td>
                            </tr>
                            <tr>
                                <td>Số dư hiện tại</td>
                                <td>{userInfo?.accountBalance}</td>
                            </tr>
                            <tr>
                                <td>Số tiền muốn Donate</td>
                                <td>
                                    <input
                                        name="money"
                                        onChange={handleChange}
                                        type="number"
                                        value={objDonate?.money}
                                        style={{ width: "100px", height: "30px", margin: '0 10px' }}
                                        className="px-1 bg-bgSecondary text-center border-0 border-bottom"
                                        onKeyDown={(e) => {
                                            const value = e.target.value;
                                            if (e.key === '-' || (value === '' && e.key === '0')) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onFocus={(e) => e.target.classList.add('no-outline')}
                                        onBlur={(e) => e.target.classList.remove('no-outline')}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Nội dung</td>
                                <td>
                                    <textarea
                                        className="form-control"
                                        name="content"
                                        onChange={handleChange}
                                        value={objDonate?.content}
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer className="custom-modal-footer">
                    <div className='col-md-12 d-flex justify-end'>
                        <button className='w-36 mt-2 mx-2 fw-medium cancel bg-black text-white px-4 py-2 rounded-xl' type='button' onClick={handleClose}>Huỷ</button>
                        <button className='w-32 mt-2 mx-2 fw-medium cancel text-white rounded-xl hover:bg-bgButtonHover' type='submit'>Xác nhận</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DonateModal;
