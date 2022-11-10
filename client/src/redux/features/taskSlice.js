import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: [] }

export const taskSlice = createSlice({
    name: 'task',
    name2: 'task',
    initialState,
    reducers: {
        setTask: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setTask } = taskSlice.actions

export default taskSlice.reducer