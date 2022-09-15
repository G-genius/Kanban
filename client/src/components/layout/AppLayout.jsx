import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';

const AppLayout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated()
            if(!user) {
                navigate("/login")
            }
        }
        checkAuth()
    }, [navigate])
    return (
        <div>
            <p>Загрузка . . .</p>
        </div>
    )
}
export default AppLayout