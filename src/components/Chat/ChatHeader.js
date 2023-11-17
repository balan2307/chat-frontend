import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function ChatHeader({ name, onClick, latestMessage = "", status }) {
  // console.log("latest message ",latestMessage)

  return (
    <div className="flex gap-4 cursor-pointer" onClick={onClick}>
      <FontAwesomeIcon icon={faUser} className="h-8 mt-2"></FontAwesomeIcon>
      <div>
        <p className="font-semibold text-lg">{name}</p>
    {status ?  (       <p>
          <span>
            <FontAwesomeIcon
              icon={faCircle}
              className={`h-2 mb-[0.1rem] mr-1 ${
                status === "offline" ? "text-red-500" : "text-green-500"
              }`}
            />
          </span>
          {status}
        </p>) : <br></br>}
      </div>
    </div>
  );
}

export default ChatHeader;
