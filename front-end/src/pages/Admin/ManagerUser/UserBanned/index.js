import { useEffect, useState } from "react";
import LayoutAdmin from "../../../../layouts/LayoutAdmin";
import axios from "axios";
import { Button, Image } from "antd";
import { baseUrl } from "../../../../utils/service";
import dayjs from "dayjs";
import { ContainerPage } from "../Users/styled";
import ModalBanUser from "../Modal/ModalBanUser";

const UserBanned = () => {
    const [usersBan, setUsersBan] = useState(null)
    const [openModal, setOpenModal] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const getList = async () => {
        try {
            const res = await axios.post("http://localhost:3008/api/user/users")
            setUsersBan(res?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <LayoutAdmin>
            <ContainerPage>
                <div className="title">
                    <h6>Danh sách người dùng đã bị khóa</h6>
                </div>
                <div className="table">
                    <div style={{ height: '80px' }}></div>
                    <div>
                        <table className="data_table">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3">Tài khoản</th>
                                    <th className="px-6 py-3">Trạng thái</th>
                                    <th className="px-6 py-3">Ngày tạo</th>
                                    <th className="px-6 py-3">Ngày khóa</th>
                                    <th className="px-6 py-3">Lý do</th>
                                    <th className="px-6 py-3">Khóa tài khoản</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usersBan?.filter(u => u.status).map((u, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-3">
                                                <div className="d-flex">
                                                    <div className="avatar">
                                                        <Image
                                                            alt="Avatar"
                                                            preview={false}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            src={baseUrl + u?.avatar}
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column ml-30">
                                                        <div className="mb-4 username">{u?.username}</div>
                                                        <div>{u?.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">{u?.player ? <span className="onl">Player</span> : <span className="off">Người dùng</span>}</td>
                                            <td className="px-6 py-3 created-user">{dayjs(u?.createdAt).format('DD-MM-YYYY')}</td>
                                            <td>Ngày</td>
                                            <td>Lý do</td>
                                            <td className="px-6 py-3">
                                                <Button className="ml-20" type="primary" danger onClick={() => { setCurrentPlayer(i); setOpenModal(true) }}>
                                                    Mở khóa
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {usersBan && (
                    <ModalBanUser
                        show={openModal}
                        players={usersBan}
                        onCancel={() => setOpenModal(false)}
                        player={usersBan[currentPlayer]}
                        setPlayers={setUsersBan}
                    />
                )}
            </ContainerPage>
        </LayoutAdmin>
    );
}

export default UserBanned;