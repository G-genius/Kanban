import { Box, CircularProgress } from '@mui/material'
import '../../css/Main.css';

const Loading = props => {
  return (
    <div className='Loading'>
      <CircularProgress />
    </div>
  )
}

export default Loading