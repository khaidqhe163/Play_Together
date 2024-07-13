import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DonateModal.css';
import { setUserInformation, userInfor } from '../../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../../../utils/service';
import api from '../../../utils/axiosConfig';
import { toast } from 'react-toastify';

function DonateModal({ showDonate, handleClose, player }) {
    const dispatch = useDispatch();
    const userInfo = useSelector(userInfor);
    const [money, setMoney] = useState(null);
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
        if (userInfo !== null) {
            const m = formatMoney(userInfo?.accountBalance)
            if (m !== "")
                setMoney(m)
        }
    }, [userInfo, player]);

    useEffect(() => {
        console.log("change change");
    }, [money])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjDonate((prev) => ({
            ...prev,
            [name]: name === "money" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (objDonate.money > userInfo.accountBalance) {
                toast("Số tiền trong tài khoản của bạn không đủ để donate. ❌");
                return;
            }
            const response = await api.post(`/api/donate`, objDonate);
            console.log(response);

            if (response.status === 201) {
                toast(response.data.message);
                dispatch(setUserInformation(response.data.restUser));
                handleClose();
            }

        } catch (error) {
            console.log(error.message);
        }
    };
    console.log(objDonate);

    return (
        <>

            <Modal show={showDonate} onHide={handleClose} size="lg">
                <Modal.Header closeButton className="custom-modal-header" id='hed'>
                    <Modal.Title className="custom-modal-title">Donate</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit} className='m-0'>
                    <Modal.Body className="custom-modal-body">
                        <table className="tablex">
                            <tbody>
                                <tr>
                                    <td className='fw-medium'>Người nhận:</td>
                                    <td>{player?.username}</td>
                                </tr>
                                <tr>
                                    <td className='fw-medium'>Số dư hiện tại:</td>
                                    <td>{money}</td>
                                </tr>
                                <tr>
                                    <td className='fw-medium'>Số tiền muốn Donate:</td>
                                    <td>
                                        <input
                                            name="money"
                                            onChange={handleChange}
                                            type="number"
                                            value={objDonate?.money}
                                            style={{ width: "100px", height: "30px", margin: '0' }}
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
                                    <td className='fw-medium'>Nội dung:</td>
                                    <td>
                                        <textarea
                                            className="form-control bg-bgSecondary h-20"
                                            id='txtarea'
                                            name="content"
                                            onChange={handleChange}
                                            value={objDonate?.content}
                                        ></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer className="custom-modal-footer" id='fot'>
                        <div className='col-md-12 d-flex justify-end'>
                            <button className='w-36 mt-2 mx-2 fw-medium cancel bg-bgSecondButton text-white px-4 py-2 rounded-xl' type='button' onClick={handleClose}>Huỷ</button>
                            <button className='w-32 mt-2 mx-2 fw-medium cancel text-white rounded-xl hover:bg-bgButtonHover' type='submit' disabled={objDonate.money === 0}>Xác nhận</button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default DonateModal;
