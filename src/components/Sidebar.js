import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch ,useSelector } from "react-redux";
import { appActions } from "../store/Slices/appSlice";
import { useEffect } from "react";
import ChatHeader from "./Chat/ChatHeader";
import { chatActions } from "../store/Slices/chatSlice";

function SideBar() {


  const userId=useSelector((state)=>state.app.user_detail.id)

  
  

  const showSidebar = useSelector((store) => store.app.showSidebar);
  const [user,searchUser]=useState("")
  const [users,setUsers]=useState([])
  const dispatch = useDispatch();

  async function getUsers(user){

    if(user=="") return
    const data=await fetch(`http://localhost:3000/auth/searchusers?search=${user}&userId=${userId}`);
    const users=await data.json();
    setUsers(users)



  }
  useEffect(()=>{


    let timer=setTimeout(()=>{
        
        getUsers(user)


    },300)

    return ()=>{
        clearTimeout(timer)

    }
  },[user])

  function setChat(id,receiver_name,receiverId)
  {
   
   
    dispatch(chatActions.setCurrentChat({id,receiver_name,receiverId}));
  }
 


  return (
    <>
      <div
        className={`flex border bg-gray-100 font-lato px-[1rem] py-[0.45rem] m-0 flex-col gap-[0rem]
       h-[100vh] w-[45%] sm:w-[30%] lg:w-[20%]  z-50 
         left-0 top-0

         absolute ease-in-out duration-300 ${
           showSidebar ? "translate-x-0 " : "-translate-x-[40rem]"
         }  `}
      >
        <div>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => dispatch(appActions.toggleSidebar())}
          ></FontAwesomeIcon>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <input
            className="w-[100%] rounded-md py-1 px-2
        focus:outline-0"
         onChange={(e)=>searchUser(e.target.value)}
         value={user}
          ></input>


        {
            users.map((userinfo)=>   <ChatHeader 
            name={userinfo.user.name} key={userinfo.user._id} 
            onClick={()=>setChat(userinfo.chatId,userinfo.user.name,userinfo.user._id)}></ChatHeader>)
        }
          
        </div>
      </div>
    </>
  );
}

export default SideBar;
