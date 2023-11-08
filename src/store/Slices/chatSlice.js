import { createSlice } from "@reduxjs/toolkit";

const chat = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    chatName: null,
  },
  reducers: {
    setCurrentChat(state, action) {
      console.log("chat store ", action.payload);
      state.chatId = action.payload.id;
      state.chatName = action.payload.name;
    },
  },
});

export const chatActions = chat.actions;
export default chat.reducer;
