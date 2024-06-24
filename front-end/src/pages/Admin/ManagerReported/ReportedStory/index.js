import { useEffect, useState } from "react";
import LayoutAdmin from "../../../../layouts/LayoutAdmin";
import { ContainerPage } from "./styled";
import axios from "axios";
import { Button, Image } from "antd";
import dayjs from "dayjs";
import { baseUrl } from "../../../../utils/service";
import ReportModal from "../Modal";

const ReportedStory = () => {
    const [reporting, setReproting] = useState([])
    const [openModalReport, setOpenModalReport] = useState(false)

    const getAll = async () => {
        try {
            const res = await axios.post("http://localhost:3008/api/report/getAllReports")
            setReproting(res?.data?.reports)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    return (  
        <LayoutAdmin>
            <ContainerPage>
                <div className="title">
                    <h6>Danh sách Story đang bị báo cáo</h6>
                </div>
                <div className="table">
                    <div style={{height: '80px'}}></div>
                    <div>
                        <table className="data_table">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3">Tài khoản báo cáo</th>
                                    <th className="px-6 py-3">Ngày báo cáo</th>
                                    <th className="px-6 py-3" style={{paddingLeft: '15%'}}>Chi tiết</th>
                                    <th className="px-6 py-3">Video</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reporting?.filter(r => r?.reportReason?.type === 1)?.map((r, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-3">
                                                <div className="d-flex">
                                                    <div className="avatar">
                                                        <Image
                                                            alt="Avatar"
                                                            preview={false}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            src={baseUrl + r?.owner?.avatar}
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column ml-30">
                                                        <div className="mb-4 username">{r?.owner?.username}</div>
                                                        <div>{r?.owner?.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 fw-600"> {dayjs(r?.createdAt).format('DD-MM-YYYY')} </td>
                                            <td className="px-6 py-3 des"> 
                                                <div className="d-flex flex-column align-items-cente">
                                                    <div className="mb-5">Nguyên nhân: <span className="reason"> {r?.reportReason?.content} </span></div>
                                                    <div> Chi tiết: <span className="description-report"> {r?.description} </span></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="story" onClick={() => setOpenModalReport(r)}>
                                                    <Image
                                                        alt="Story"
                                                        title="Click để xem chi tiết"
                                                        preview={false}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        src={baseUrl + r?.storyId?.thumbnail}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <Button className="" type="primary" danger>
                                                    Khóa
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </ContainerPage>
            
            {!!openModalReport && (
                <ReportModal
                    open={openModalReport}
                    onCancel={() => setOpenModalReport(false)}
                    onOk={getAll}
                />
            )}
        </LayoutAdmin>
    );
}
 
export default ReportedStory;