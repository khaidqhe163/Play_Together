import { useEffect, useState } from "react";
import LayoutAdmin from "../../../../layouts/LayoutAdmin";
import { ContainerPage } from "./styled";
import axios from "axios";
import { Button, Image } from "antd";
import dayjs from "dayjs";
import { baseUrl } from "../../../../utils/service";
import ModalBanUser from "../Modal/ModalBanUser";

const ManagerUser = () => {
    const [users, setUsers] = useState(null)
    const [openModal, setOpenModal] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const getAllUsers = async () => {
        try {
            const res = await axios.post("http://localhost:3008/api/user/users")
            setUsers(res?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (  
        <LayoutAdmin>
            <ContainerPage>
                <div className="title">
                    <h6>Danh sách người dùng</h6>
                </div>
                <div className="table">
                    <div style={{height: '80px'}}></div>
                    <div>
                        <table className="data_table">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3">Tài khoản</th>
                                    <th className="px-6 py-3">Trạng thái</th>
                                    <th className="px-6 py-3">Giới tính</th>
                                    <th className="px-6 py-3">Ngày tạo</th>
                                    <th className="px-6 py-3">Khóa tài khoản</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.map((u, i) => (
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
                                            <td className="px-6 py-3" style={{fontWeight: 600, fontSize: '12px'}}> {u?.gender} </td>
                                            <td className="px-6 py-3 created-user">{dayjs(u?.createdAt).format('DD-MM-YYYY')}</td>
                                            <td className="px-6 py-3">
                                                <Button className="ml-20" type="primary" danger onClick={() => { setCurrentPlayer(i); setOpenModal(true) }}>
                                                    {u?.status === false ? "Khóa" : "Mở khóa"}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {users && (
                    <ModalBanUser
                        show={openModal}
                        players={users}
                        onCancel={() => setOpenModal(false)}
                        player={users[currentPlayer]}
                        setPlayers={setUsers}
                        type={1}
                    />
                )}
            </ContainerPage>
        </LayoutAdmin>
    );
}
 
export default ManagerUser;