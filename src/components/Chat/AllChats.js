import React from "react";
import ChatHeader from "./ChatHeader";
import { useState, useEffect } from "react";
import { useSelector ,useDispatch } from "react-redux";
import { chatActions } from "../../store/Slices/chatSlice";

function AllChats() {
  const [chats, setChats] = useState([]);
  const user = useSelector((state) => state.app);

  const dispatch=useDispatch()

  const fetchChats = async function () {
    const response = await fetch(
      `http://localhost:3000/chats/${user.user_detail.id}`
    );
    let allchats = await response.json();
    allchats = allchats.filter((chat) => chat._id != user.user_detail.id);

    console.log("all chats ",allchats)
    setChats(allchats);
  };
  useEffect(() => {
    fetchChats();
  }, []);

  function showChat(id,name) {


    console.log("show chat ",id)
    dispatch(chatActions.setCurrentChat({id,name}));
    
  }

 
  return (
    <div className="w-[20%] border border-t-0 py-4 px-6 flex flex-col gap-4">
      <div>
        <p className="text-3xl font-semibold ">{user.user_detail.name}</p>
      </div>
      <div className="flex flex-col gap-4 ">
        {chats?.length > 0 &&
          chats.map((chat) => {
            return (
              <div onClick={() => showChat(chat.chatId,chat.user.name)} key={chat.chatId}>
                <ChatHeader
                  name={chat.user.name}
                ></ChatHeader>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AllChats;
