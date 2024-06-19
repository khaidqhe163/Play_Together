import { useEffect, useState } from "react";
import LayoutAdmin from "../../../../layouts/LayoutAdmin";
import axios from "axios";
import { ContainerPage } from "../Users/styled";
import { Button, Image } from "antd";
import { baseUrl } from "../../../../utils/service";
import dayjs from "dayjs";
import ModalBanUser from "../Modal/ModalBanUser";

const Players = () => {
    const [players, setPlayers] = useState([])
    const [openModalBlockUser, setOpenModalBlockUser] = useState(false)
    
    const getList = async () => {
        try {
            const res = await axios.get("http://localhost:3008/api/user/players")
            setPlayers(res?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getList()
    }, [])

    console.log("players", players);

    return ( 
        <LayoutAdmin>
            <ContainerPage>
                <div className="title">
                    <h6>Danh sách người dùng đã đăng ký</h6>
                </div>
                <div className="table">
                    <div style={{height: '80px'}}></div>
                    <div>
                        <table className="data_table">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3">Tài khoản</th>
                                    <th className="px-6 py-3">Trạng thái</th>
                                    <th className="px-6 py-3">Ngày tạo</th>
                                    <th className="px-6 py-3">Khóa tài khoản</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    players.map((p, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-3">
                                                <div className="d-flex">
                                                    <div className="avatar">
                                                        <Image
                                                            alt="Avatar"
                                                            preview={false}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            src={baseUrl + p?.avatar}
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column ml-30">
                                                        <div className="mb-4 username">{p?.username}</div>
                                                        <div>{p?.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">{i % 2 === 0 ? <span className="onl">Online</span> : <span className="off">Offline</span>}</td>
                                            <td className="px-6 py-3 created-user">{dayjs(p?.createdAt).format('DD-MM-YYYY')}</td>
                                            <td className="px-6 py-3">
                                                <Button className="ml-20" type="primary" danger onClick={() => setOpenModalBlockUser(p)}> 
                                                    {p?.status === false ? "Khóa" : "Mở khóa"}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {!!openModalBlockUser && (
                    <ModalBanUser
                        open={openModalBlockUser}
                        onCancel={() => setOpenModalBlockUser(false)}
                        onOk={getList}
                    />
                )}
            </ContainerPage>
        </LayoutAdmin>
    );
}
 
export default Players;