import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/"



const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    console.log("Ez az auth", JSON.stringify(getState()));
    console.log("Tokenem: ", token);
    let newToken = null
    if(window.localStorage.getItem("user") !== null)
    {
        newToken = JSON.parse(window.localStorage.getItem("user")).accessToken
    }
    console.log("newToken", newToken);
    // If we have a token set in state, let's assume that we should be passing it.
    if (newToken) {
        console.log("Volt tokenem");
      headers.set('authorization', `Bearer ${newToken}`)
    }
    console.log("Header: ", headers);
    return headers
  },
})

export const tasksApiSlice = createApi({
    reducerPath: 'tasksApi',
    baseQuery: baseQuery, // fetchBaseQuery({ baseUrl: BASE_URL})
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => ({
                url: "tasks"
            }),
            transformResponse: (response) => response.data,
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "authentication",
                method: "POST",
                body
            }),
        }),
        getEditableTasks : builder.query({
            query: (id) => `tasklists/${id}`,
        }),
        registration: builder.mutation({
            query: (body) => ({
                url: "users",
                method: "POST",
                body
            }),
        }),
        getTaskLists: builder.query({
            query: () => ({
                url: "tasklists"
            }),
            transformResponse: (response) => response.data,
        }),
        createTasklist: builder.mutation({
            query: (body) => ({
                url: "tasklists",
                method: "POST",
                body
            }),
        }),
        updateTasklist: builder.mutation({
            query: (body) => ({
                url: `tasklists/${body.id}`,
                method: "PATCH",
                body: body
            }),
        }),
        getTenData: builder.query({
            query: (skip) => ({
                url: `tasks?$skip=${skip}&$limit=10`
            }),
            transformResponse: (response) => response.data,
        }),
    }),
})

//reducer
export const tasksApiSliceReducer = tasksApiSlice.reducer;

//Automatikusan generált hookok:
//hooks
export const { useGetTasksQuery, 
    useLoginMutation, 
    useGetEditableTasksQuery, 
    useRegistrationMutation, 
    useGetTaskListsQuery, 
    useCreateTasklistMutation, 
    useUpdateTasklistMutation, 
    useGetTenDataQuery
 } = tasksApiSlice