import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import boardApi from '../api/boardApi'
import Kanban from '../components/common/Kanban'


const Board = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { boardId } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sections, setSections] = useState([])


  return (
    <div>
      <div sx={{ padding: '10px 50px' }}>
        <div>
          {/* Kanban board */}
          <Kanban data={sections} boardId={boardId} />
        </div>
      </div>
    </div>
  )
}

export default Board