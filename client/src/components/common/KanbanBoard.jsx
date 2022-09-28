import "../../css/Home.css";
import {DragDropContext, Draggable} from 'react-beautiful-dnd'
import {Droppable} from 'react-beautiful-dnd';
import mockData from '../../moskData'
import {useEffect, useState} from 'react'
import Card from './Card'
import {useDispatch, useSelector} from "react-redux";
import taskApi from "../../api/taskApi";
import {setTask} from "../../redux/features/taskSlice";
import {Typography} from "@mui/material";
import TaskModal from "./TaskModal";

let timer
const timeout = 500

const Kanban = props => {
    //const [data, setData] = useState(mockData)
    const dispatch = useDispatch()
    const task = useSelector((state) => state.task.value)

    const boardId = props.boardId
    const [data, setData] = useState([])
    const [selectedTask, setSelectedTask] = useState(undefined)

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    console.log(task[0])

    let firstTitle = ''

    async function getTitle() {
        for (let i = 0; i < task.length; i++) {
            if (i == 0) {
                firstTitle = task[0].title
            }
        }
    }

    getTitle()


    useEffect(() => {
        const getTask = async () => {
            try {
                const res = await taskApi.getAll()
                dispatch(setTask(res))
            } catch (err) {
                alert(err)
            }
        }
        getTask()
    }, [dispatch])

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

    const createTask = async (sectionId) => {
        try {
            const task = await taskApi.create(boardId, { sectionId })
            const newData = [...data]
            const index = newData.findIndex(e => e.id === sectionId)
            newData[index].tasks.unshift(task)
            setData(newData)
        } catch (err) {
            alert(err)
        }
    }

    const onUpdateTask = (task) => {
        const newData = [...data]
        const sectionIndex = newData.findIndex(e => e.id === task.section.id)
        const taskIndex = newData[sectionIndex].tasks.findIndex(e => e.id === task.id)
        newData[sectionIndex].tasks[taskIndex] = task
        setData(newData)
    }

    const onDeleteTask = (task) => {
        const newData = [...data]
        const sectionIndex = newData.findIndex(e => e.id === task.section.id)
        const taskIndex = newData[sectionIndex].tasks.findIndex(e => e.id === task.id)
        newData[sectionIndex].tasks.splice(taskIndex, 1)
        setData(newData)
    }

    return (
        <>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban">
                {
                    data.map(section => (
                        <Droppable
                            key={section.id}
                            droppableId={section.id}
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    className='kanban__section'
                                    ref={provided.innerRef}
                                >
                                    <div className="kanban__section__title">
                                        {section.title}
                                    </div>
                                    <div className="kanban__section__content">
                                        {
                                            section.tasks.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <Card
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            sx={{
                                                                padding: '10px',
                                                                marginBottom: '10px',
                                                                cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                                                            }}
                                                            onClick={() => setSelectedTask(task)}
                                                        >
                                                            <Typography>
                                                                {task.title === '' ? 'Untitled' : task.title}
                                                            </Typography>
                                                        </Card>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </Box>
                                    )}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </div>
        </DragDropContext>
            <TaskModal
                task={selectedTask}
                boardId={boardId}
                onClose={() => setSelectedTask(undefined)}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
            />
        </>
    )
}

export default Kanban