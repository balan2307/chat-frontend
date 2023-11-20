import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Modal({ onClose, isOpen }) {
  const loggedInUser = useSelector((state) => state.app.user_detail);
  const [groupMembers, setGroupMembers] = useState([
    { name: loggedInUser.name, id: loggedInUser.id },
  ]);
  const [users, setUsers] = useState("");
  const [searchedUser, setSearchedUser] = useState("");

  const [groupName, setGroupName] = useState("");

  async function createGroupChat() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/chats/groupchat`, {
      method: "POST",
      body: JSON.stringify({ users: groupMembers ,chatName:groupName ,groupAdmin:loggedInUser.id}),
      headers: {
        "Content-type": "application/json",
      },
    });
  }

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
      `${process.env.REACT_APP_BASE_URL}/auth/searchusers?search=${user}&userId=${null}`
    );
    const users = await data.json();

    setUsers(users);
  }

  function addtoGroup(name, id) {
    console.log("user ", name, id);

    const memberExist = groupMembers.find((member) => member.id == id);

    console.log("exist ", memberExist);
    if (id == loggedInUser.id) return;
    if (memberExist) return;

    console.log("check ", id, loggedInUser.id);

    setGroupMembers((prev) => [...prev, { name, id }]);
  }

  function createGroup() {
    console.log("Group ", groupName, groupMembers);
    
    createGroupChat();
  }

  return (
    <dialog open={isOpen} className="p-4 w-[60%] border bg-[#f2f0f0]">
      <div className="flex flex-col gap-4 ">
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

        <form
          className="flex justify-between flex-col gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="border p-1 rounded-lg w-[40%] focus:outline-none"
            placeholder="Group name"
            onChange={(e) => setGroupName(e.target.value)}
          ></input>

          <div className="flex gap-2 ">
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
          </div>
        </form>

        <div className="bg-[#e4d9d9]  w-[85%] text-[#272626]">
          {users?.length > 0 &&
            users?.map((user) => {
              return (
                <p
                  className="border  px-3 py-1 cursor-pointer
            "
                  key={user._id}
                  onClick={() => addtoGroup(user.name, user._id)}
                >
                  {user.name}
                </p>
              );
            })}
        </div>

        <div className="p-2">
          <h1 className="font-semibold text-xl">Members</h1>

          {groupMembers?.length > 0 &&
            groupMembers?.map((member) => {
              return <p key={member.id}>{member.name}</p>;
            })}
        </div>

        <div className="flex justify-center p-2">
          <button
            className="border px-2 py-1 bg-[green]
       text-white rounded-lg"
            onClick={() => createGroup()}
          >
            Create
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
