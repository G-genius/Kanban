import { useState } from 'react';
import '../css/style.css';
import {Link, useNavigate} from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate()

    return (
        <div className="box">
            <form className='form'>
                <input type="text" id='username'name='username' required placeholder='Введите логин'/>
                
                <input type="password" id='password' name='password' required placeholder='Введите пароль'/>
                <input type="password" id='confirmPassword' name='confirmPassword' required placeholder='Подтвердите пароль'/>
                <div className="buttons">
                <button className="reg reg_up">
                    Зарегистрироваться
                </button>
                </div>
                <Link to='/SignIn'><button className='no_akk'>Уже есть аккаунт? Войти</button></Link>

            </form>
        </div>
    )
}
export default SignUp