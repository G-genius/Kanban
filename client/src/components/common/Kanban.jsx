import { Box, Button, Typography, Divider, TextField, IconButton, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import sectionApi from '../../api/sectionApi'
import Home from "../../pages/Home";
import {useDispatch, useSelector} from "react-redux";
import {setSection} from "../../redux/features/sectionSlice";
import taskApi from "../../api/taskApi";

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

    //const task = useSelector((state) => state.task.value)

    // useEffect(() => {
    //     const getTask = async () => {
    //         try {
    //             const res = await taskApi.getAll()
    //             dispatch(setSection(res))
    //         } catch (err) {
    //             alert(err)
    //         }
    //     }
    //     getTask()
    // }, [dispatch])


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