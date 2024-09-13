import React, { useState } from 'react';

function Input({ onSendMessage }) {
  const [text, setText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="input-form">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type your message..." 
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default Input;