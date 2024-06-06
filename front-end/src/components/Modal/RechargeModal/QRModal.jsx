import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Thank from './Thank';
import { baseUrl } from '../../../utils/service';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userInfor } from '../../../features/userSlice';
import api from '../../../utils/axiosConfig';
import { toast } from 'react-toastify';

const QrModal = (props) => {
    const { show,
        setShow,
        total,
        randomCode,
        postData,
        ...rest } = props;
    console.log(`show: ${show}`);
    const bank = {
        BANK_ID: "MBBank",
        ACCOUNT_NO: "7500120072002",
        TEMPLATE: "compact2",
        AMOUNT: total,
        DESCRIPTION: randomCode,
        ACCOUNT_NAME: 'TRAN%20MANH%20HUNG'
    };

    console.log(bank);
    const api_get = "https://oauth.casso.vn/v2/transactions?sort=DESC";
    const CASSO_API_KEY = "AK_CS.197d9940236711efa25ac5d284bd6c82.EZwBQL0GI0zjnlBcWB4FTKWvKoxeRWr1fElSoyMWVwWDbjvxDvcvnaUijEEYVDI9bnXHW3Rh"

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [isPaid, setIsPaid] = useState(false);

    const fetchData = async () => {
        try {
            const res = await fetch(api_get, {
                headers: {
                    Authorization: `apikey ${CASSO_API_KEY}`,
                    "Content-Type": "application/json",
                }
            });
            const jsonData = await res.json();
            setData(jsonData);
            //handle send success
            jsonData.data.records.forEach(trans => {
                if (Math.floor(trans.amount) == Math.floor(total) && trans.description.includes(randomCode.replace(/-/g, ""))) {
                    setShow(false);
                    setIsPaid(true);
                    savePayment();
                    return;
                }
            })

        } catch (error) {
            console.log('fetchData qr error', error);
        }
    }

    useEffect(() => {
        if (show && !isPaid) {
            fetchData();

            const intervalId = setInterval(() => {
                fetchData();
            }, 3000)

            //clear khi component bi huy
            return () => clearInterval(intervalId);
        }
    }, [show, isPaid])

    const savePayment = async () => {
        try {
            const res = await api.post(`${baseUrl}api/payment`, { total });
            console.log(res.data);
            toast(res.data.message);
        } catch (error) {
            if (error.response.status === 400) {
                toast(error.response.data.error);
              } else {
                toast('Có lỗi trong việc đổi mật khẩu!');
              }
        }
    }


    const [showT, setShowT] = useState(false);
    useEffect(() => {
        if (isPaid) {
            setShowT(true); 
        }
    }, [isPaid]);

    console.log(showT);
    return (
        <div>
            {isPaid ? <Thank show={showT} handleClose={() => { setShowT(false); setIsPaid(false); }} setIsPaid={setIsPaid} /> : <Modal show={show} style={{ minWidth: '100%' }}>
                <div>
                    <Modal.Header>
                        <Modal.Title style={{ color: 'red' }}>
                            Vui lòng không sửa nội dung chuyển khoản!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={`https://img.vietqr.io/image/${bank.BANK_ID}-${bank.ACCOUNT_NO}-${bank.TEMPLATE}.png?amount=${bank.AMOUNT}&addInfo=${bank.DESCRIPTION}&accountName=${bank.ACCOUNT_NAME}`} alt="Error" width={'100%'} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </div>

            </Modal>}

        </div>

    )
}

export default QrModal