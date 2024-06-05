import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import toast from 'react-hot-toast';
import Thank from './Thank';
import { baseUrl } from '../../../utils/service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const QrModal = (props) => {
    const { show,
        setShow,
        total,
        postData,
        ...rest } = props;
    const bank = {
        BANK_ID: "MBBank",
        ACCOUNT_NO: "7500120072002",
        TEMPLATE: "compact2",
        AMOUNT: total,
        ACCOUNT_NAME: 'TRAN%20MANH%20HUNG'
    }
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
                if (Math.floor(trans.amount) == Math.floor(total)) {
                    console.log("Hell");
                    setIsPaid(true);
                    // saveOrder();
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


    // const saveOrder = async () => {
    //     axios.post(`${baseUrl}/order`, postData)
    //         .then(res => {
    //             toast.success('Thanh toán thành công ❤️\nCảm ơn bạn')
    //             setTimeout(() => {
    //                 navigate("/");
    //             }, 4000)
    //         })
    //         .catch(error => {
    //             console.log('saveOrder error:', error);
    //             toast.error('Có lỗi gì đó đã xảy ra!😭\nVui lòng liên hệ admin qua facebook/zalo/sdt')
    //         })
    // };



    return (
        <div>
            {isPaid ? <Thank show={true}/> : <Modal show={show} style={{ minWidth: '100%' }}>
                <div>
                    <Modal.Header>
                        <Modal.Title style={{ color: 'red' }}>
                            Vui lòng không sửa nội dung chuyển khoản!<br />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={`https://img.vietqr.io/image/${bank.BANK_ID}-${bank.ACCOUNT_NO}-${bank.TEMPLATE}.png?amount=${bank.AMOUNT}&accountName=${bank.ACCOUNT_NAME}`} alt="Error" width={'100%'} />
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