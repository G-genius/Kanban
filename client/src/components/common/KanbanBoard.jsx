//import './kanban.scss'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd';
import mockData from '../../moskData'
import {useEffect, useState} from 'react'
import Card from './Card'
import {useDispatch, useSelector} from "react-redux";
import taskApi from "../../api/taskApi";
import {setTask} from "../../redux/features/taskSlice";

const Kanban = () => {
    const [data, setData] = useState(mockData)
    const dispatch = useDispatch()
    const task = useSelector((state) => state.task.value)
    console.log(task[0])

    let firstTitle = ''

    async function getTitle() {
        for (let i = 0; i < task.length; i++){
            if(i == 0) {
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

    const onDragEnd = result => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
            const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)

            const sourceCol = data[sourceColIndex]
            const destinationCol = data[destinationColIndex]

            const sourceTask = [...sourceCol.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            data[sourceColIndex].tasks = sourceTask
            data[destinationColIndex].tasks = destinationTask

            setData(data)
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban">
                {
                    data.map(section => (
                        <Droppable
                            key={section.id}
                            droppableId={section.id.toString()}
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
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                opacity: snapshot.isDragging ? '0.5' : '1'
                                                            }}
                                                        >
                                                            <Card>
                                                                {firstTitle}
                                                            </Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </div>
        </DragDropContext>
    )
}

export default Kanban