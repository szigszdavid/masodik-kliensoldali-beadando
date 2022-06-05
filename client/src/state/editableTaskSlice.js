import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditable: false
};

export const editableTaskSlice = createSlice({
  name: "editableTask",
  initialState,
  reducers: {
    setEditableTask: (state, { payload: isEditable }) => {
      state.isEditable = isEditable;
    },
  }
});

//reducer
export const editableTaskReducer = editableTaskSlice.reducer;
//actions
export const { setEditableTask} = editableTaskSlice.actions;
//selectors
export const selectEditableTaskList = (state) => state.editableTask.isEditable;