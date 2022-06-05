import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { editableTaskReducer, editableTaskSlice } from "./editableTaskSlice";
import { tasksApiSlice, tasksApiSliceReducer } from "./tasksApiSlice";
import { taskSlice, tasksReducer } from "./tasksSlice";

export const store = configureStore({
    reducer: {
        //task: tasksReducer,
        //tasksApi: tasksApiSliceReducer helyette:
        [taskSlice.reducerPath]: tasksReducer,
        [tasksApiSlice.reducerPath]: tasksApiSliceReducer,
        editableTask: editableTaskReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(tasksApiSlice.middleware),
})