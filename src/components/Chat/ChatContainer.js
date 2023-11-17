import React from "react";

import ChatHeader from "./ChatHeader";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { useState } from "react";
import AllChats from "./AllChats";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { useCallback } from "react";
import { useRef } from "react";

function ChatContainer() {
  // console.log("chat container");

  const user = useSelector((state) => state.app);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const chat = useSelector((store) => store.chat);
  const [socket, setSocket] = useState(null);
  const chatContainerRef = useRef(null);
  const [activeUsers,setActiveUsers]=useState([])

  useEffect(() => {
    
    scrollToBottom();
  }, [chats]); 

  const scrollToBottom = () => {
   
    const container = chatContainerRef.current;

    
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };


  useEffect(() => {
    setSocket(io.connect("http://localhost:3000"));
  }, []);

  const handleMessage = useCallback(
    (message) => {
      // console.log("receive message ", message);
      // console.log("check ", message.sender._id, user.user_detail.id, chat);

      if (
        message.sender._id == user.user_detail.id ||
        message.sender._id == chat.receiverId
      ) {
        setChats((prevChats) => [...prevChats, message]);
      }
    },
    [chat, user.user_detail.id]
  );

  useEffect(() => {
    socket?.emit("addUser", user.user_detail.id);

    socket?.on("getUsers", (users) => {
      // console.log("Users ", users);
      setActiveUsers(users)
    });

    socket?.on("getMessage", handleMessage);
    return () => {
      // console.log("off")
      socket?.off("getMessage", handleMessage);
    };
  }, [socket, handleMessage]);

  useEffect(() => {
    if (chat.chatId != null) fetchMessages(chat.chatId);
  }, [chat.chatId]);

  async function fetchMessages(chatId) {
    const response = await fetch(
      `http://localhost:3000/message/${chat.chatId}`
    );

    const data = await response.json();

    setChats(data);
  }


  async function sendMessage() {
    const Newmessage = {
      sender: user.user_detail.id,
      chat: chat.chatId != "new" ? chat.chatId : null,
      content: message,
      receiver: chat.receiverId,
    };

    socket?.emit("sendMessage", Newmessage);

    const resp = await fetch(`http://localhost:3000/message/`, {
      method: "POST",
      body: JSON.stringify(Newmessage),
      headers: {
        "Content-type": "application/json",
      },
    });

    setMessage("");
  }

  return (
    <div className="flex h-[100vh]">
      <AllChats  activeUsers={activeUsers}></AllChats>

      {chat.receiverName != null ? (
        <div className="w-[80%]  border border-t-0 p-4">
          <ChatHeader name={chat.receiverName}></ChatHeader>
          <hr></hr>

          <div className="h-[90%]">
            <div
            ref={chatContainerRef}
              className="p-2 flex flex-col gap-2  h-[80%] 
        overflow-y-scroll border-b-2 mb-4
        "
            >
              {chats && chats.length > 0 ? (
                chats.map((chat) => {
                  return chat.sender._id == user.user_detail.id ? (
                    <Chat
                      message={chat.content}
                      key={chat._id}
                      style="ml-auto bg-[#3654ff] text-white"
                    ></Chat>
                  ) : (
                    <Chat
                      message={chat.content}
                      key={chat._id}
                      style="bg-[antiquewhite]"
                    ></Chat>
                  );
                })
              ) : (
                <p className="font-semibold text-3xl p-4">Start a chat</p>
              )}
            </div>

            <div className="flex gap-4 ">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border focus:outline-none px-2 py-1
          w-[80%]"
              ></input>

              <FontAwesomeIcon
                icon={faPaperPlane}
                className="h-8"
                onClick={() => sendMessage()}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[100%] h-[70%] flex justify-center items-center">
          <h1 className="font-semibold text-2xl">Start a conversation</h1>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
