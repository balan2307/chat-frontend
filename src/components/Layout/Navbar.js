import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch ,faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { appActions } from "../../store/Slices/appSlice";
import Modal from "./Modal";

function Navbar() {
  const dispatch = useDispatch();
  const [isOpen,setOpen]=useState(false)


  function toggleModal()
  {
    setOpen((prev)=>!prev)


  }

  function toggleSideBar() {
   
    dispatch(appActions.toggleSidebar())
  }
  return (
    <div className="border h-12 p-2 bg-[#5a5a5a] text-white flex justify-between">
      <div className="flex gap-4 w-[20%] cursor-pointer" onClick={toggleSideBar}>
        <FontAwesomeIcon
          icon={faSearch}
         
          className="mt-1"
        ></FontAwesomeIcon>
        <p>Search users</p>
      </div>

      <div className="cursor-pointer" onClick={toggleModal}>
      <FontAwesomeIcon icon={faPlus} className="h-4" />
      <span className="ml-2">Create a group</span>
      </div>

     {<Modal onClose={toggleModal} isOpen={isOpen}></Modal>}

      
    </div>
  );
}

export default Navbar;
