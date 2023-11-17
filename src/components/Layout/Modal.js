import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Modal({ onClose, isOpen }) {
  const [groupMembers, setGroupMembers] = useState([]);
  const [users, setUsers] = useState("");
  const [searchedUser, setSearchedUser] = useState("");

  useEffect(() => {
    if (searchedUser == "") {
      setUsers([]);
    }
    let timer = setTimeout(() => {
      getUsers(searchedUser);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchedUser]);

  async function getUsers(user) {
    if (user == "") return;

    const data = await fetch(
      `http://localhost:3000/auth/searchusers?search=${user}&userId=${null}`
    );
    const users = await data.json();

    setUsers(users);
  }

  function addtoGroup(name, id) {
    console.log("user ", name, id);
    setGroupMembers((prev)=> [...prev ,{name,id}])
  }

  return (
    <dialog open={isOpen} className="p-4 w-[60%] border bg-[#f2f0f0]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end w-[100%]">
          <form method="dialog">
            <button
              className=" px-2 py-1  rounded-sm text-2xl "
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </button>
          </form>
        </div>
        <h2 className="font-semibold text-2xl">Create group chat</h2>

        <form className="flex justify-between ">
          <input
            type="text"
            className="border p-1 rounded-lg w-[85%] focus:outline-none"
            placeholder="Search user"
            onChange={(e) => setSearchedUser(e.target.value)}
          ></input>

          <button
            className="border  px-2 py-1 bg-[#1460ee]
           text-white  rounded-md"
          >
            Add User
          </button>
        </form>

        <div className="bg-[#e4d9d9]  w-[85%] text-[#272626]">
          {users?.length > 0 &&
            users?.map((user) => {
              return (
                <p
                  className="border  px-3 py-1 cursor-pointer
            "
                  key={user._id}
                  onClick={()=>addtoGroup(user.name, user._id)}
                >
                  {user.name}
                </p>
              );
            })}
        </div>

        <div>
          {console.log("group members ",groupMembers)}
          {groupMembers?.length>0 && groupMembers?.map((member)=>{

            return <p name>{member.name}</p>
          })}
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
