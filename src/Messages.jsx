import React from 'react';

function Messages({ messages }) {
  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <div key={index} className={msg.sender === "bot" ? "message-bot" : "message-user"}>
          {msg.text}
        </div>
      ))}
    </div>
  );
}

export default Messages;