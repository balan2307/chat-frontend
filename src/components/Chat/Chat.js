import React from "react";

function Chat({ message, style ,color,sender}) {


  return (
    <div className={` ${style}`}>
      <p className={`w-fit p-4 rounded-lg flex flex-col  ${color} `}>
        {message}
        
      </p>
      <p className="px-1 font-bold text-sm">{sender}</p>
     
    </div>
  );
}

export default Chat;
