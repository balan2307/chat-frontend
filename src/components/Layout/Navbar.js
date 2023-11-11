import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { appActions } from "../../store/Slices/appSlice";


function Navbar() {
  const dispatch = useDispatch();


  function toggleSideBar() {
   
    dispatch(appActions.toggleSidebar())
  }
  return (
    <div className="border h-12 p-2 bg-[#5a5a5a] text-white">
      <div className="flex gap-4 w-[20%] p-1 cursor-pointer" onClick={toggleSideBar}>
        <FontAwesomeIcon
          icon={faSearch}
         
          className="mt-1"
        ></FontAwesomeIcon>
        <p>Search users</p>
      </div>
    </div>
  );
}

export default Navbar;
