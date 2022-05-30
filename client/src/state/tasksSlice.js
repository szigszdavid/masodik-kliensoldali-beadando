import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  title: null,
  description: null,
  createAt: null,
  updatedAt: null,
  tasks: [
  ],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setAllTasks: (state, { payload: tasks }) => {
      state.tasks = tasks;
    },
    setUpdatedTaskList: (state, { payload : result}) => {
      state = result;
      console.log("Task sliceban: " + JSON.stringify(state));
    }
  },
});

//reducer
export const tasksReducer = taskSlice.reducer;
//actions
export const { setAllTasks, setUpdatedTaskList} = taskSlice.actions;
//selectors
export const selectUpdatedTaskListId = (state) => state.id;
export const selectUpdatedTaskList = (state) => state.tasks;