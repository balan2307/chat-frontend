import { createSlice } from "@reduxjs/toolkit";

const chat = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    receiverName: null,
    receiverId:null,
    activeUsers:[]
  },
  reducers: {
    setCurrentChat(state, action) {
    
      state.chatId = action.payload.id;
      state.receiverName = action.payload.receiver_name;
      state.receiverId=action.payload.receiverId
    },
    setActiveUsers(state,action){
      state.activeUsers=action.payload.users
    }
  },
});

export const chatActions = chat.actions;
export default chat.reducer;
