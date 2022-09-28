import { Container, Box } from '@mui/material'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import authUtils from '../../utils/authUtils'
import assets from '../../assets'
import '../../css/Main.css';

const AuthLayout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await authUtils.isAuthenticated()
            if (!isAuth) {
            } else {
                navigate('/')
            }
        }
        checkAuth()
    }, [navigate])

    return (
        (
            <Container component='main' maxWidth='xs'>
                <div classname='authLayout'>
                    <img src={assets.images.logolight} style={{ width: '100px' }} alt='app logo' />
                    <Outlet />
                </div>
            </Container>
        )
    )
}

export default AuthLayout