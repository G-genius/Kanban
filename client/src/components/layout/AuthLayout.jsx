import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import authUtils from '../../utils/authUtils';
import logo from '../../assets/images/logo-dark.png';
import '../../css/style.css';

const AuthLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await authUtils.isAuthenticated()
            if(!isAuth) {
                setLoading(false)
            }
            else {
                navigate("/")
            }
        }
        checkAuth()
    }, [navigate])


  return (
    loading ? (
        <loading fullHeight/>
    ) : (
        <div className="container" component='main'>
            <div className="box">
                <img src={logo} className='logo' alt="" />
                <Outlet/>
            </div>
        </div>
    )
  )
}

export default AuthLayout
