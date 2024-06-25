import React, { useEffect } from 'react'
import { baseUrl } from '../../../utils/service'
import api from '../../../utils/axiosConfig'
import { Link } from 'react-router-dom'
function NotificationBox({ notification, setUnreadNotification }) {
    useEffect(() => {
        const readNotification = async () => {
            try {
                await api.put("/api/notification/read-notification", {});
            } catch (error) {
                console.log(error);
            }
        }
        readNotification();
        setUnreadNotification(0);
    }, [])
    return (
        < div style={{
            width: "500px",
            maxHeight: "600px",
            position: "absolute",
            backgroundColor: "#20202b",
            right: "0px",
            top: "50px",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            borderRadius: "15px",
            textAlign: "left",
        }}>
            <p className="text-white pl-30 mt-10">Thông báo</p>
            <hr style={{ color: "white" }}></hr>
            {
                notification?.map((n) => {
                    return (
                        <Link to={n.url} style={{ textDecoration: "none" }}>
                            <div className="p-20 d-flex notification">
                                <img src={baseUrl + n?.userId.avatar} alt="error" style={{ width: "48px", height: "48px", borderRadius: "50%" }} />
                                <p className="text-white mb-0 ml-5">
                                    <strong>{n?.userId.username}</strong> {n.content}
                                </p>
                            </div>
                        </Link>
                    )
                })
            }
        </div >
    )
}

export default NotificationBox
