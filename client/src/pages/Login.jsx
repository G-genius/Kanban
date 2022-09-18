import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import authApi from '../api/AuthApi'

const Login = () => {
    const navigate = useNavigate()
    const [usernameErrText, setUsernameErrText] = useState('')
    const [passwordErrText, setPasswordErrText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUsernameErrText('')
        setPasswordErrText('')

        const data = new FormData(e.target)
        const username = data.get('username').trim()
        const password = data.get('password').trim()

        let err = false

        if (username === '') {
            err = true
            setUsernameErrText('Please fill this field')
        }
        if (password === '') {
            err = true
            setPasswordErrText('Please fill this field')
        }

        if (err) return

        try {
            const res = await authApi.login({ username, password })
            localStorage.setItem('token', res.token)
            navigate('/')
        } catch (err) {
            const errors = err.data.errors
            errors.forEach(e => {
                if (e.param === 'username') {
                    setUsernameErrText(e.msg)
                }
                if (e.param === 'password') {
                    setPasswordErrText(e.msg)
                }
            })
        }
    }

    return (
        <>
            <Box
                component='form'
                sx={{ mt: 1 }}
                onSubmit={handleSubmit}
                noValidate
            >
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='username'
                    label='Username'
                    name='username'
                    error={usernameErrText !== ''}
                    helperText={usernameErrText}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='password'
                    label='Password'
                    name='password'
                    type='password'
                    error={passwordErrText !== ''}
                    helperText={passwordErrText}
                />
                <LoadingButton
                    sx={{ mt: 3, mb: 2 }}
                    variant='outlined'
                    fullWidth
                    color='success'
                    type='submit'
                >
                    Войти
                </LoadingButton>
            </Box>
            <Button
                component={Link}
                to='/signup'
                sx={{ textTransform: 'none' }}
            >
                У вас нет учетной записи? Зарегистрироваться
            </Button>
        </>
    )
}

export default Login