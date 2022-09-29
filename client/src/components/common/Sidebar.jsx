import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import boardApi from '../../api/boardApi'
import {setBoards} from '../../redux/features/boardSlice'
import "../../css/Main.css";
import sectionApi from "../../api/sectionApi";
import {setSection} from "../../redux/features/sectionSlice";
import taskApi from "../../api/taskApi";
import {setTask} from "../../redux/features/taskSlice";


const Sidebar = () => {
    const user = useSelector((state) => state.user.value)
    const boards = useSelector((state) => state.board.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {boardId} = useParams()
    const [activeIndex, setActiveIndex] = useState(0)

    const task = useSelector((state) => state.task.value)

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

    let taskMark = ''
    const getMark = () => {
        for (let i = 0; i < task.length; i++) {
            if(i <= task.length) {
                taskMark = task[i].mark
                console.log(taskMark)
            }
        }

    }
    getMark()

    //Фильтр поиска
    //const data = task

    const [markList, setMarkList] = useState(taskMark);
    const [searchTermin, setSearchTermin] = useState('')

    const filterMark = (searchText, listOfTask) => {
        if (!searchText) {
            return listOfTask;
        }
        return listOfTask.filter(({task_mark}) =>
            task_mark.toLowerCase().includes(searchText.toLowerCase())
        )
    }
    useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredMarks = filterMark(searchTermin, taskMark)
            setMarkList(filteredMarks)
        }, 300)

        return () => clearTimeout(Debounce)
    }, [searchTermin])


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
        <div className="side-bar">
            <div className="user">
                <a className="user-name">Пользователь:
                    <a> {user.username} </a>
                </a>
                <input
                    value={searchTermin}
                    autoFocus
                    type="text"
                    autoComplete="off"
                    placeholder="Поиск по марке"

                    onChange={(e) => {setSearchTermin(e.target.value)}}
                />
                <button className="exit-btn" onClick={exitBtn}>Выйти</button>
            </div>

        </div>
    )
}

export default Sidebar