import { useState } from 'react';
import '../css/style.css';
import {Link, useNavigate} from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate()


    const [loading, setLoading] = useState(false)
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
          setUsernameErrText('Пожалуйста заполните это поле')
        }
        if (password === '') {
          err = true
          setPasswordErrText('Пожалуйста заполните это поле')
        }
        if (confirmPassword === '') {
          err = true
          setConfirmPasswordErrText('Пожалуйста заполните это поле')
        }
        if (password !== confirmPassword) {
          err = true
          setConfirmPasswordErrText('Пароли не совпадают')
        }
    
        if (err) return
    }

    return (
        <div className="box" onSubmit={handleSubmit} noValidate>
            <form className='form'>
                <input type="text" id='username'name='username' required disabled={loading} placeholder='Введите логин' error={usernameErrText !== ''} helperText={usernameErrText}/>
                
                <input type="password" id='password' name='password' required disabled={loading} placeholder='Введите пароль' error={passwordErrText !== ''} helperText={passwordErrText}/>
                <input type="password" id='confirmPassword' name='confirmPassword' required disabled={loading} placeholder='Подтвердите пароль' error={confirmPasswordErrText !== ''} helperText={confirmPasswordErrText}/>
                <div className="buttons">
                <button className="reg reg_up" loading={loading} variant='outlined'>
                    Зарегистрироваться
                </button>
                </div>
                <Link to='/SignIn'><button className='no_akk'>Уже есть аккаунт? Войти</button></Link>

            </form>
        </div>
    )
}
export default SignUp