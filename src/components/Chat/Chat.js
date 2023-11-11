import React from "react";

function Chat({ message, style }) {
  return (
    <div>
      <p className={`max-w-[40%] p-3 rounded-lg  ${style}`}>
        {message}
      </p>
    </div>
  );
}

export default Chat;
