import {useSelector, useDispatch} from 'react-redux'
import {Box, Drawer, IconButton, List, ListItem, ListItemButton, Typography} from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import {Link, useNavigate, useParams} from 'react-router-dom'
import assets from '../../assets/index'
import {useEffect, useState} from 'react'
import boardApi from '../../api/boardApi'
import {setBoards} from '../../redux/features/boardSlice'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import "../../css/Sidebar.css"
import KanbanBoard from './KanbanBoard'

const Sidebar = () => {
    const user = useSelector((state) => state.user.value)
    const boards = useSelector((state) => state.board.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {boardId} = useParams()
    const [activeIndex, setActiveIndex] = useState(0)

    const sidebarWidth = 250

    useEffect(() => {
        const getBoards = async () => {
            try {
                const res = await boardApi.getAll()
                dispatch(setBoards(res))
            } catch (err) {
                alert(err)
            }
        }
        getBoards()
    }, [dispatch])


    useEffect(() => {
        const activeItem = boards.findIndex(e => e.id === boardId)
        if (boards.length > 0 && boardId === undefined) {
            navigate(`/boards/${boards[0].id}`)
        }
        setActiveIndex(activeItem)
    }, [boards, boardId, navigate])

    const exitBtn = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }




    return (
        <div className='components'>
        <div className="side-bar">

            <div className="user">
                <a className="user-name">Пользователь:
                    <a> {user.username} </a>
                </a>
                <a className="exit-btn" onClick={exitBtn}>Выйти</a>
            </div>
        </div>
        </div>
    )
}

export default Sidebar