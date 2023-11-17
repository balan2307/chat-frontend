import { createSlice } from "@reduxjs/toolkit";


const appSlice=createSlice({
    name:"app",
    initialState:{

        user_detail:localStorage.getItem('user_detail')==undefined ? null
        :  JSON.parse(localStorage.getItem('user_detail')),
        showSidebar:false

    },
    reducers:{
        setuserDetail(state,action){
          

            localStorage.setItem('user_detail',JSON.stringify(action.payload))
            state.user_detail=action.payload

        },
        toggleSidebar(state,action){

            state.showSidebar=!state.showSidebar
        }
    }
})


export const appActions=appSlice.actions;
export default appSlice.reducer;