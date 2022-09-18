import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import authApi from '../api/AuthApi'

const Signup = () => {
    const navigate = useNavigate()

    const [usernameErrText, setUsernameErrText] = useState('')
    const [passwordErrText, setPasswordErrText] = useState('')
    const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUsernameErrText('')
        setPasswordErrText('')
        setConfirmPasswordErrText('')

        const data = new FormData(e.target)
        const username = data.get('username').trim()
        const password = data.get('password').trim()
        const confirmPassword = data.get('confirmPassword').trim()

        let err = false

        if (username === '') {
            err = true
            setUsernameErrText('Пожалуйста, заполните это поле')
        }
        if (password === '') {
            err = true
            setPasswordErrText('Пожалуйста, заполните это поле')
        }
        if (confirmPassword === '') {
            err = true
            setConfirmPasswordErrText('Пожалуйста, заполните это поле')
        }
        if (password !== confirmPassword) {
            err = true
            setConfirmPasswordErrText('Пароли не совпадают')
        }

        if (err) return


        try {
            const res = await authApi.signup({
                username, password, confirmPassword
            })
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
                if (e.param === 'confirmPassword') {
                    setConfirmPasswordErrText(e.msg)
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
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='confirmPassword'
                    label='Confirm Password'
                    name='confirmPassword'
                    type='password'
                    error={confirmPasswordErrText !== ''}
                    helperText={confirmPasswordErrText}
                />
                <LoadingButton
                    sx={{ mt: 3, mb: 2 }}
                    variant='outlined'
                    fullWidth
                    color='success'
                    type='submit'
                >
                    Регистрация
                </LoadingButton>
            </Box>
            <Button
                component={Link}
                to='/login'
                sx={{ textTransform: 'none' }}
            >
                У вас уже есть учетная запись? Авторизоваться
            </Button>
        </>
    )
}

export default Signup