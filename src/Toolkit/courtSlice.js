import {createsSlice}from "@reduxjs/toolkit";


const generalSlice=createsSlice({
    name:'user',
    initialState:{
        userDetails:{},
        userRole:'',
        hobbies:[]

    },
    reducers:{
        setUserDetails:(state,action)=>{
            state.userDetails={name:'sample'}
        },
        setUserRole:(state,action)=>{
            state.userRole='admin'
        }
    }
})
export const {setUserDetails,setUserRole}=generalSlice.actions
export default generalSlice.reducer 