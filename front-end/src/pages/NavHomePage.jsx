import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function NavHomePage() {
    const nav = useNavigate();
    useEffect(() => {
        nav("/play-together");
    }, [])
    return (
        <></>
    )
}

export default NavHomePage