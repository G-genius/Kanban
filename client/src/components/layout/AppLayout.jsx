import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';
import Sidebar from '../Sidebar';

const AppLayout = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated()
            if(!user) {
                navigate("/signIn")
            }
            else {
                setLoading(false)
            }
        }
        checkAuth()
    }, [navigate])
    return (
        loading ? (
            <loading fullHeight/>
        ) : (
            <div className="box">
            <Sidebar/>
            <div className="case">
            <Outlet/>
            </div>
            </div>

        )
    )
}
export default AppLayout