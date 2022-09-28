import React, { useEffect, useState } from 'react'
import sectionApi from '../../api/sectionApi'
import Home from "../../pages/Home";
import {useDispatch, useSelector} from "react-redux";
import {setSection} from "../../redux/features/sectionSlice";

const Kanban = props => {
    const boardId = props.boardId
    const [data, setData] = useState([])
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

    let sectionId = ''
    const getId = () => {
        for (let i = 0; i < section.length; i++) {
            if(i == 0) {
                sectionId = section[0].id
            }
        }

    }
    getId()
    console.log(sectionId)
    return (
        <div>
            <Home/>
        </div>
    )
}

export default Kanban