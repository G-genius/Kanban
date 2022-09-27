import React, {useEffect} from 'react';
import "../css/Home.css";
import {useState} from "react";
import sectionApi from '../api/sectionApi'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setBoards} from "../redux/features/boardSlice";
import {setSection} from "../redux/features/sectionSlice";

const Home = () => {
    const dispatch = useDispatch()
    const section = useSelector((state) => state.section.value)

    useEffect(() => {
        const getSection = async () => {
            try {
                const res = await sectionApi.getAll()
                dispatch(setSection(res))
            } catch (err) {
                alert(err)
            }
        }
        getSection()
    }, [dispatch])

    let firstTitle = ''
    let secondTitle = ''
    let thirdTitle = ''
    let fourthTitle = ''
    let fifthTitle = ''
    let sixthTitle = ''

    async function getTitle() {
        for (let i = 0; i < section.length; i++){
            if(i == 0) {
                firstTitle = section[0].title
            }
            if(i == 1) {
                secondTitle = section[1].title
            }
            if(i == 2){
                thirdTitle = section[2].title
            }
            if(i == 3){
                fourthTitle = section[3].title
            }
            if(i == 4){
                fifthTitle = section[4].title
            }
            if(i == 5){
                sixthTitle = section[5].title
            }
        }
    }
    getTitle()
    return (
        <div className="home">
            <div className="scroll-bar">
                <div className="board">
                    <p className="title">{firstTitle}</p>
                    <div className="board-section">
                        <a className="board-title">Автор: {}<a className="board-text">{}</a></a>
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
                        </div>
                    </div>
                </div>
                <div className="board">
                    <p className="title">{secondTitle}</p>

                </div>
                <div className="board">
                    <p className="title">{thirdTitle}</p>

                </div>
                <div className="board">
                    <p className="title">{fourthTitle}</p>

                </div>
                <div className="board">
                    <p className="title">{fifthTitle}</p>

                </div>
                <div className="board">
                    <p className="title">{sixthTitle}</p>

                </div>
            </div>
        </div>
    )
}
export default Home