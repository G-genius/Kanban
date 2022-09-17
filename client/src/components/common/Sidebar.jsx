import React from 'react'
import {useSelector} from "react-redux";
import "../../css/Sidebar.css"
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    // Навигация
    const navigate = useNavigate()

    // Получаем user name пользователя
    const user = useSelector((state) => state.user.value)

    const exitBtn = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="side-bar">
            <div className="user">
                <a className="user-name">Пользователь:
                    <a> {user.username} </a>
                </a>
                <a className="exit-btn" onClick={exitBtn}>Выйти</a>
            </div>
        </div>
    )
}
export default Sidebar