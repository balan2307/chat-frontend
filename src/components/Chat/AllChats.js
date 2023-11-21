import React from "react";
import ChatHeader from "./ChatHeader";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../store/Slices/chatSlice";
import { useRef } from "react";

function AllChats({ activeUsers }) {
  let [chats, setChats] = useState([]);
  const user = useSelector((state) => state.app);
  const chatContainerRef = useRef(null);

  // console.log("active users ", activeUsers);

  const dispatch = useDispatch();

  const fetchChats = async function () {

    if(!navigator.onLine) return;
    // console.log("check ",navigator.onLine)
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/chats/${user.user_detail.id}`
    );
    let allchats = await response.json();

    // console.log("allchats ", allchats);
    // allchats = allchats.filter((chat) => chat._id != user.user_detail.id);

    let newChats = allchats.map((chat) => {
      const userAvailable = activeUsers?.find(
        (user) => user.userId == chat.user._id
      );

      let updatedChat = chat;
      if (userAvailable) updatedChat.status = "online";
      else updatedChat.status = "offline";

      return updatedChat;
    });

    setChats(newChats);
  };

  useEffect(() => {
    fetchChats();
  }, [activeUsers]);

  function showChat(chat) {

    console.log("show chat ",chat)
    if (chat.isGroupChat) {
      dispatch(
        chatActions.setCurrentChat({
          id: chat.chatId,
          receiver_name: chat.chatName,
          receiverId: chat.user,
        })
      );
    } else {
      dispatch(
        chatActions.setCurrentChat({
          id: chat.chatId,
          receiver_name: chat.user.name,
          receiverId: chat.user._id,
        })
      );
    }
  }

  return (
    <div className="w-[20%] border border-t-0 py-4 px-6 flex flex-col gap-4">
      <div>
        <p className="text-2xl font-semibold ">{user.user_detail.name}</p>
      </div>
      <div ref={chatContainerRef} className="flex flex-col gap-4  ">
        {chats?.length > 0 &&
          chats.map((chat) => {
            return (
              <div key={chat.chatId}>
                <ChatHeader
                  name={chat.isGroupChat ? chat.chatName : chat.user.name}
                  latestMessage={chat?.latestMessage?.content}
                  status={chat.status}
                  onClick={() =>
                    // chat.chatId,chat.chatName ? chat.chatName : chat.user.name, chat.user._id,
                    showChat(chat)
                  }
                ></ChatHeader>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AllChats;
