import React from "react";

function Chat({ message, style }) {
  return (
    <div>
      <p className={`max-w-[50%] p-2 bg-gray-200 rounded-lg  ${style}`}>
        {message}
      </p>
    </div>
  );
}

export default Chat;
