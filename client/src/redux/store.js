<<<<<<< Updated upstream
import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./features/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer
    }
=======
import { configureStore } from "@reduxjs/toolkit"
import userReducer from './features/userSlice'
import boardReducer from './features/boardSlice'
import favouriteReducer from './features/favouriteSlice'
import sectionReducer from "./features/sectionSlice"
import taskReducer from "./features/taskSlice"
import plateReducer from "./features/plateSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    section: sectionReducer,
    favourites: favouriteReducer,
    task: taskReducer,
    plate: plateReducer
  }
>>>>>>> Stashed changes
})