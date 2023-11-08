import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./Slices/appSlice";
import chatSlice from "./Slices/chatSlice";

const store=configureStore({

    reducer:{
        app:appSlice,
        chat:chatSlice
    }
})

export default store;