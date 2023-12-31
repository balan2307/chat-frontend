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
  console.log("chat container");

  const user = useSelector((state) => state.app);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const chat = useSelector((store) => store.chat);
  const [socket, setSocket] = useState(null);
  const chatContainerRef = useRef(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [reconnect, setReconnect] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  console.log("active users ", activeUsers);

  const scrollToBottom = () => {
    const container = chatContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    setSocket(
      io.connect(`${process.env.REACT_APP_BASE_URL}`, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity,
      })
    );
  }, []);

  useEffect(() => {
    // console.log("receivers ",chat.receiverId)

   

    const receivers = chat.receiverId;
    if (receivers != null && receivers.length > 2) {

      console.log("join group chat")

      socket?.emit("joinroom", {
        room: chat.chatId,
        user: user.user_detail.id,
      });
    }
  }, [chat.chatId]);

  const handleMessage = useCallback(
    (message) => {
      console.log("handle message ", chat.chatId);
      console.log("---CHECK---");


      if (
        (message.chatId == "new" || chat.chatId=="new") &&
        (message.sender._id == user.user_detail.id ||
          message.sender._id == chat.receiverId)
      ) {
        console.log("show chat if", message.chatId);
        setChats((prevChats) => [...prevChats, message]);
        return;
      } else if (message.chatId == chat.chatId) {
        console.log("show chat else ", message.chatId, chat.chatId);
        setChats((prevChats) => [...prevChats, message]);
        return;
      }

      console.log("hide chat ", message);
    },
    [chat, user.user_detail.id]
  );

  useEffect(() => {
    const handleReconnect = () => {
      console.log("reconnect ", socket?.id);

      // The socket.io library handles reconnection, so we don't manually call connect
      // You can add your logic here if needed
      console.log("re connect");
      const updatedSocketId = socket?.id; // Capture the updated socket ID
      socket?.emit(
        "addUser",
        { userId: user.user_detail.id, sockedId: updatedSocketId },
        (response) => {
          if (response.error) {
            console.error('Error emitting "addUser" event:', response.error);
          }
        }
      );

      
    const receivers = chat.receiverId;
    if (receivers != null && receivers.length > 2) {

      console.log("join group chat")

      socket?.emit("joinroom", {
        room: chat.chatId,
        user: user.user_detail.id,
      });
    }
    };

    // socket?.emit("addUser", user.user_detail.id);

    socket?.on("getUsers", (users) => {
      setActiveUsers(users);
    });

    socket?.on("receivegroupChat", handleMessage);

    // socket?.on("reconnect",handleReconnect)

    socket?.on("getMessage", handleMessage);

    socket?.on("connect", () => {
      console.log("Successfully reconnected! ", socket.id);
      handleReconnect(); // Now it should have the updated socket.id
    });

    socket?.io.on("reconnect_attempt", (data) => {
      console.log("RECONNECT attempt ",);

      // handleReconnect()
      // setReconnect(true)
    });

    return () => {
      console.log("off");
      socket?.off("getMessage", handleMessage);
      socket?.off("receivegroupChat", handleMessage);
      socket?.off("reconnect", handleReconnect);
      socket?.off("getUsers", handleReconnect);
      
    };
  }, [socket, handleMessage ,chat,user.user_detail.id]);

  useEffect(() => {
    if (chat.chatId != null) fetchMessages(chat.chatId);
  }, [chat.chatId]);

  async function fetchMessages(chatId) {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/message/${chat.chatId}`
    );

    const data = await response.json();

    // console.log("chats ",data)

    setChats(data);
  }

  async function sendMessage() {
    const Newmessage = {
      sender: user.user_detail.id,
      chat: chat.chatId != "new" ? chat.chatId : null,
      content: message,
      receiver: chat.receiverId,
      chatId: chat.chatId,
      isGroupChat: typeof chat.receiverId == "object" ? true : false,
      senderName: user.user_detail.name,
    };

    socket?.emit("sendMessage", { message: Newmessage });

    setMessage("");

    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/message/`, {
      method: "POST",
      body: JSON.stringify(Newmessage),
      headers: {
        "Content-type": "application/json",
      },
    });

    
  }

  return (
    <div className="flex h-[100vh]">
      <AllChats activeUsers={activeUsers}></AllChats>

      {chat.chatId != null ? (
        <div className="w-[50%]  border border-t-0 p-4">
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
                      sender={
                        chat.sender.name ? chat.sender.name : chat.senderName
                      }
                      color=" bg-[#3654ff] text-white"
                      style="ml-auto"
                    ></Chat>
                  ) : (
                    <Chat
                      message={chat.content}
                      sender={
                        chat.sender.name ? chat.sender.name : chat.senderName
                      }
                      key={chat._id}
                      color="bg-[antiquewhite]"
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
