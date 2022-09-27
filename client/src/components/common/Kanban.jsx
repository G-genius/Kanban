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

    useEffect(() => {
        const getTask = async () => {
            try {
                const res = await taskApi.getAll()
                dispatch(setSection(res))
            } catch (err) {
                alert(err)
            }
        }
        getTask()
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

      const onUpdateTask = (task) => {
    const newData = [...data]
    const sectionIndex = newData.findIndex(e => e.id === task.section.id)
    const taskIndex = newData[sectionIndex].tasks.findIndex(e => e.id === task.id)
    newData[sectionIndex].tasks[taskIndex] = task
    setData(newData)
  }

    const onDragEnd = async ({ source, destination }) => {
        if (!destination) return
        const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
        const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)
        const sourceCol = data[sourceColIndex]
        const destinationCol = data[destinationColIndex]
    
        const sourceSectionId = sourceCol.id
        const destinationSectionId = destinationCol.id
    
        const sourceTasks = [...sourceCol.tasks]
        const destinationTasks = [...destinationCol.tasks]
    
        if (source.droppableId !== destination.droppableId) {
          const [removed] = sourceTasks.splice(source.index, 1)
          destinationTasks.splice(destination.index, 0, removed)
          data[sourceColIndex].tasks = sourceTasks
          data[destinationColIndex].tasks = destinationTasks
        } else {
          const [removed] = destinationTasks.splice(source.index, 1)
          destinationTasks.splice(destination.index, 0, removed)
          data[destinationColIndex].tasks = destinationTasks
        }
    
        try {
          await taskApi.updatePosition(boardId, {
            resourceList: sourceTasks,
            destinationList: destinationTasks,
            resourceSectionId: sourceSectionId,
            destinationSectionId: destinationSectionId
          })
          setData(data)
        } catch (err) {
          alert(err)
        }
      }
    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}></DragDropContext>
            <Home/>
        </div>
    )
}

export default Kanban