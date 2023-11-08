import React from "react";

import ChatHeader from "./ChatHeader";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { useState } from "react";
import AllChats from "./AllChats";
import { useEffect } from "react";

function ChatContainer() {
  const user = useSelector((state) => state.app);
  const [chats, setChats] = useState([]);
  const chatId = useSelector((store) => store.chat.chatId);
  const chatName=useSelector((store)=>store.chat.chatName)

  useEffect(() => {
    if (chatId != null) fetchMessages(chatId);
  }, [chatId]);

  async function fetchMessages(chatId) {
    const response = await fetch(`http://localhost:3000/message/${chatId}`);

    const data = await response.json();
    console.log("chats ",data)
  
    setChats(data);

  }

  function showUserChats(id) {
    console.log("ID ", id);
    // fetchMessages(id);
  }

  return (
    <div className="flex h-[100vh]">
      <AllChats showUserChats={showUserChats}></AllChats>

      <div className="w-[80%]  border border-t-0 p-4">
        <ChatHeader name={chatName}></ChatHeader>
        <hr></hr>

        <div className="h-[90%]">
          <div
            className="p-2 flex flex-col gap-2  h-[90%] 
        overflow-y-scroll border-b-2 mb-4"
          >
            {chats && chats.length > 0  ? chats.map((chat) => {
              console.log("chat ", chat.sender._id);
              return chat.sender._id == user.user_detail.id ? (
                <Chat
                  message={chat.content}
                  key={chat._id}
                  style="ml-auto bg-[#a8ccd8]"
                ></Chat>
              ) : (
                <Chat message={chat.content} key={chat._id} style=""></Chat>
              );
            }) : <p className="font-semibold text-3xl p-4">Start a chat</p>}
          </div>

          <div className=" ">
            <input
              type="text"
              className="border focus:outline-none px-2 py-1
          w-[80%]"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
