import React from 'react'
import "../css/Home.css"

const Board = () => {

    const Edit = () => {

    }

    return (
        <div className="board">
            <p className="title">На паузе</p>
            <div className="board-content">
                <a className="board-title">Автор: <a className="board-text">{}</a></a>
                <a className="board-title">Дата создания: <a className="board-text">{}</a></a>
                <a className="board-title">Клиент: <a className="board-text">{}</a></a>
                <div className="board-table">
                    <a className="board-table">Наименование</a>
                    <a className="board-table">Марка</a>
                    <a className="board-table">Ширина</a>
                    <a className="board-table">Длина</a>
                    <a className="board-table">Кол-во</a>
                    <a className="board-table">Чертёж</a>
                </div>
                <div>
                    <a className="board-text"><input type="checkbox" className="board-title"/> Срочно</a>
                    <button className="edit-btn" onClick={Edit}>Редактировать</button>
                </div>
            </div>
        </div>
    )
}
export default Board