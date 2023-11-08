import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { appActions } from "../../store/Slices/appSlice";


function Navbar() {
  const dispatch = useDispatch();


  function toggleSideBar() {
    console.log("clicked");
    dispatch(appActions.toggleSidebar())
  }
  return (
    <div className="border h-12 p-2">
      <div>
        <FontAwesomeIcon
          icon={faSearch}
          onClick={toggleSideBar}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default Navbar;
