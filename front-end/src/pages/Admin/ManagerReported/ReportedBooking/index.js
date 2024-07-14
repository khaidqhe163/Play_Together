import { Button } from "antd";
import LayoutAdmin from "../../../../layouts/LayoutAdmin";
import { ContainerPage } from "../ReportedStory/styled";
import { useEffect, useState } from "react";
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs';
import ReportBookingModal from "./ReportBookingModal";
const ReportedBooking = () => {
    dayjs.extend(relativeTime);
    const [reports, setReports] = useState(null);
    const [lgShow, setLgShow] = useState(false);
    const [reportId, setReportId] = useState(null);
    useEffect(() => {
        const getReports = async () => {
            try {
                const data = await axios.get("http://localhost:3008/api/report/report-booking")
                setReports(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getReports();
    }, [])

    return (
        <LayoutAdmin>
            <ContainerPage>
                <div className="title">
                    <h6>Danh sách Player đang bị báo cáo</h6>
                </div>
                <div className="table">
                    <div style={{ height: '80px' }}></div>
                    <div>
                        <table className="data_table">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3">Tài khoản báo cáo</th>
                                    <th className="px-6 py-3">Loại báo cáo</th>
                                    <th className="px-6 py-3">Tiêu đề</th>
                                    <th className="px-6 py-3">Ngày báo cáo</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reports?.map((r) => {
                                        return (
                                            <tr>
                                                <td className="px-6 py-3">
                                                    <b>{r.owner.username}</b>
                                                </td>
                                                <td className="px-6 py-3 text-danger">
                                                    {r.reportReason.content}</td>
                                                <td className="px-6 py-3">
                                                    {r.title}
                                                </td>
                                                <td className="px-6 py-3 text-primary">
                                                    {dayjs(r.createdAt).fromNow()}
                                                </td>
                                                <td className="px-6 py-3">
                                                    <Button className="" type="primary" primary
                                                        onClick={() => { setLgShow(true); setReportId(r._id) }}>
                                                        {
                                                            r.status && r.status === 1 ? "Xử lý" : "Xem"
                                                        }
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    reportId && <ReportBookingModal lgShow={lgShow} setLgShow={setLgShow} id={reportId} reports={reports} setReports={setReports} />
                }
            </ContainerPage>
        </LayoutAdmin>
    );
}

export default ReportedBooking