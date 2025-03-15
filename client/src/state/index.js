import {createSlice } from "@reduxjs/toolkit";

const initialState =  {
    mode: "light",
    user: null,
    token: null,
    groups: [],
    projects: [],
    tasks: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin:(state, action) =>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setGroups: (state,action) => {
            if (state.user) {
                state.user.groups = action.payload.groups;
            }else{
                console.error("no groups");
            }
        },
        setProjects: (state, action) => {
            state.projects = action.payload.projects;
        },
        setProject: (state,action) => {
            const updatedProjects = state.project.map((project) => {
                if (project._id === action.payload.project._id) return action.payload.project;
                return project;
              });
              state.project = updatedProjects;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload.tasks;
        },
    }
})

export const {setMode , setLogin, setGroups, setLogout , setProject , setProjects, setTasks} = authSlice.actions;
export default authSlice.reducer;