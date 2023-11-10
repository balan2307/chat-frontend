import { createSlice } from "@reduxjs/toolkit";

const chat = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    receiverName: null,
    receiverId:null
  },
  reducers: {
    setCurrentChat(state, action) {
    
      state.chatId = action.payload.id;
      state.receiverName = action.payload.receiver_name;
      state.receiverId=action.payload.receiverId
    },
  },
});

export const chatActions = chat.actions;
export default chat.reducer;
