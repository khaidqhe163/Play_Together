import React, { useEffect } from 'react'
import { adminInfor, setAdminInfo } from '../features/adminInfoSlice';
import { setAccessTokenAdmin } from '../features/accessTokenAdminSlice';
import { setRefreshTokenAdmin } from '../features/refreshTokenAdminSlice';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AdminLogout() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post("http://localhost:3008/api/user/admin-logout", {},
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    }
                )
                dispatch(setAdminInfo(null));
                dispatch(setAccessTokenAdmin(null));
                dispatch(setRefreshTokenAdmin(null));
                toast("Đăng xuất thành công!");
                nav('/admin/login')
            } catch (error) {
                console.log(error);
            }
        }
        logout();
    }, [])
    return (
        <></>
    )
}

export default AdminLogout
