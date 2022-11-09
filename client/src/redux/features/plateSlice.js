import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: [] }

export const plateSlice = createSlice({
    name: 'plate',
    initialState,
    reducers: {
        setPlate: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setPlate } = plateSlice.actions

export default plateSlice.reducer