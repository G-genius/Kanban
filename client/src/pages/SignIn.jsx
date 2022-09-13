import { useState } from 'react';
import '../css/style.css';
import {Link} from 'react-router-dom';

const SignIn = () => {
    const [loading, setLoading] = useState(false)
    const handleSubmit = () => {

    }
    return (
        <div className="box" onSubmit={handleSubmit} noValidate>
            <form className='form'>
                <input type="text" id='username' name='username' required disabled={loading} placeholder='Введите логин'/>
                <input type="password" id='password' name='password' required disabled={loading} placeholder='Введите пароль'/>
                <button className="log">Войти </button>
                <Link to='/SignUp'><button className='no_akk'>Нет аккаунта? Зарегестрируйтесь</button></Link>

            </form>
        </div>
    )
}
export default SignIn