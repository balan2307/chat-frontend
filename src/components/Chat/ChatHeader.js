import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";


function ChatHeader({name,status='Available',onClick}) {

 
  return (
    <div className="flex gap-4 cursor-pointer" onClick={onClick}>
      <FontAwesomeIcon icon={faUser} className="h-8 mt-2"></FontAwesomeIcon>
      <div>
        <p className="font-semibold text-lg">{name}</p>
        <p>{status}</p>
       
      </div>

    
    </div>
  );
}

export default ChatHeader;
