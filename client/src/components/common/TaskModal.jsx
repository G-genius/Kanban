import {Backdrop, Fade, IconButton, Modal, Box, TextField} from '@mui/material'
import React, {useEffect, useRef, useState} from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import taskApi from '../../api/taskApi'


const modalStyle = {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 1,
    height: '80%'
}

let timer
const timeout = 500
let isModalClosed = false
let currentTime = new Date().toLocaleString("ru-RU", )

const TaskModal = props => {
    const boardId = props.boardId
    const [task, setTask] = useState(props.task)
    const [author, setAuthor] = useState('')
    const [date, setDate] = useState()
    const [client, setClient] = useState('')
    const [quickly, setQuickly] = useState(false)
    const [name, setName] = useState('')
    const [mark, setMark] = useState('')
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [count, setCount] = useState(0)
    const [plan, setPlan] = useState(false)
    const editorWrapperRef = useRef()


    useEffect(() => {
        setTask(props.task)
        setAuthor(props.task !== undefined ? props.task.author : '')
        setDate(props.task !== undefined ? props.task.date : '')
        setClient(props.task !== undefined ? props.task.client : '')
        setQuickly(props.task !== undefined ? props.task.quickly : '')
        setName(props.task !== undefined ? props.task.name : '')
        setMark(props.task !== undefined ? props.task.mark : '')
        setWidth(props.task !== undefined ? props.task.width : '')
        setHeight(props.task !== undefined ? props.task.height : '')
        setCount(props.task !== undefined ? props.task.count : '')
        setPlan(props.task !== undefined ? props.task.plan : '')
        if (props.task !== undefined) {
            isModalClosed = false

            updateEditorHeight()
        }
    }, [props.task])

    const updateEditorHeight = () => {
        setTimeout(() => {
            if (editorWrapperRef.current) {
                const box = editorWrapperRef.current
                box.querySelector('.ck-editor__editable_inline').style.height = (box.offsetHeight - 50) + 'px'
            }
        }, timeout)
    }

    const onClose = () => {
        isModalClosed = true
        props.onUpdate(task)
        props.onClose()
    }

    const deleteTask = async () => {
        try {
            await taskApi.delete(boardId, task.id)
            props.onDelete(task)
            setTask(undefined)
        } catch (err) {
            alert(err)
        }
    }
    const updateAuthor = async (e) => {
        clearTimeout(timer)
        const newAuthor = e.target.value
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {author: newAuthor})
            } catch (err) {
                alert(err)
            }
        }, timeout)

        task.author = newAuthor
        setAuthor(newAuthor)
        props.onUpdate(task)
    }
    const updateDate = async (e) => {
        clearTimeout(timer)
        const newDate = e.target.value
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {date: currentTime})
            } catch (err) {
                alert(err)
            }
        }, timeout)

        task.date = currentTime
        setDate(currentTime)
        props.onUpdate(currentTime)
    }
    const updateClient = async (e) => {
        clearTimeout(timer)
        const newClient = e.target.value
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {client: newClient})
            } catch (err) {
                alert(err)
            }
        }, timeout)

        task.client = newClient
        setClient(newClient)
        props.onUpdate(task)
    }

    const updateName = async (e) => {
        clearTimeout(timer)
        const newName = e.target.value
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {name: newName})
            } catch (err) {
                alert(err)
            }
        }, timeout)

        task.name = newName
        setName(newName)
        props.onUpdate(task)
    }

    const updateMark = async (e) => {
        clearTimeout(timer)
        const newMark = e.target.value
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {mark: newMark})
            } catch (err) {
                alert(err)
            }
        }, timeout)

        task.mark = newMark
        setMark(newMark)
        props.onUpdate(task)
    }

    const updateWidth = async (e) => {
        clearTimeout(timer)
        const newWidth = e.target.value
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {width: newWidth})
            } catch (err) {
                alert(err)
            }
        }, timeout)

        task.width = newWidth
        setWidth(newWidth)
        props.onUpdate(task)
    }

    const updateHeight = async (e) => {
        clearTimeout(timer)
        const newHeight = e.target.value
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {height: newHeight})
            } catch (err) {
                alert(err)
            }
        }, timeout)

        task.height = newHeight
        setHeight(newHeight)
        props.onUpdate(task)
    }

    const updateCount = async (e) => {
        clearTimeout(timer)
        const newCount = e.target.value
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {count: newCount})
            } catch (err) {
                alert(err)
            }
        }, timeout)

        task.count = newCount
        setCount(newCount)
        props.onUpdate(task)
    }

    const updatePlan = async (e) => {
        clearTimeout(timer)
        const newPlan = e.target.value
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {plan: newPlan})
            } catch (err) {
                alert(err)
            }
        }, timeout)

        task.plan = newPlan
        setPlan(newPlan)
        props.onUpdate(task)
    }



    const updateQiuckly = async (e) => {


        let isChecked = document.getElementById('one').checked

        timer = setTimeout(async () => {
            try {
                if (isChecked === true) {
                    await taskApi.update(boardId, task.id, {quickly: isChecked})
                    document.getElementById('board-section').style.background = "red"
                }
                else if (isChecked === false){
                    await taskApi.update(boardId, task.id, {quickly: isChecked})
                    document.getElementById('board-section').style.background = "#B6B2B2"
                }

            } catch (err) {
                alert(err)
            }

        }, timeout)
        task.quickly = isChecked
        setQuickly(isChecked)
        props.onUpdate(task)

        console.log(isChecked)

        // clearTimeout(timer)
        // const newQuickly = e.target.value
        // timer = setTimeout(async () => {
        //     try {
        //         await taskApi.update(boardId, task.id, {plan: newQuickly})
        //     } catch (err) {
        //         alert(err)
        //     }
        // }, timeout)
        //



    }



    return (
        <Modal
            open={task !== undefined}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500}}
        >
            <Fade in={task !== undefined}>
                <Box sx={modalStyle}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}>
                        <IconButton variant='outlined' color='error' onClick={deleteTask}>
                            <DeleteOutlinedIcon/>
                        </IconButton>
                    </Box>
                    <TextField
                        value={author}
                        onChange={updateAuthor}
                        placeholder='Автор'/>
                    <TextField
                        value={currentTime}
                        onChange={updateDate}
                        placeholder='Дата создания'
                    />
                    <TextField
                        value={client}
                        onChange={updateClient}
                        placeholder='Клиент'
                    />
                    <TextField
                        value={name}
                        onChange={updateName}
                        placeholder='Наименование'
                    />
                    <TextField
                        value={mark}
                        onChange={updateMark}
                        placeholder='Марка'
                    />
                    <TextField
                        value={width}
                        onChange={updateWidth}
                        placeholder='Ширина заготовки'
                    />
                    <TextField
                        value={height}
                        onChange={updateHeight}
                        placeholder='Длина заготовки'
                    />
                    <TextField
                        value={count}
                        onChange={updateCount}
                        placeholder='Кол-во'
                    />
                    <TextField
                        value={plan}
                        onChange={updatePlan}
                        placeholder='Чертёж'
                    />
                    <input
                        type="checkbox"
                        id="one"
                        onChange={updateQiuckly}
                        placeholder='Срочно'
                        value={quickly}
                    />
                </Box>
            </Fade>
        </Modal>
    )
}

export default TaskModal