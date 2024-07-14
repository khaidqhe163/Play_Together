import React, { useEffect } from 'react'
import '../css/socialmedia.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setUserInformation } from '../features/userSlice';
import { setAccessToken } from '../features/accessTokenSlice';
function SocialMediaLogin() {
    const { token } = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        handleLogin();
    }, [])
    const handleLogin = async () => {
        try {
            console.log("gohear");
            const user = await axios.post('http://localhost:3008/api/user/login-success', {
                token: token
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            dispatch(setUserInformation(user.data.user));
            dispatch(setAccessToken(user.data.accessToken));
            nav("/");
        } catch (error) {
            nav('/login')
            console.log(error);
        }
    }
    return (
        <div className='login-success-container'>
            <div className="loader"></div>
        </div>
    )
}

export default SocialMediaLogin
