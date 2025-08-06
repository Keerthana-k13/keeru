import React, { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './Messaging.css';

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const ws = useRef(null);
  const roomName = 'room1';
  const userId = 1;
  const receiverId = 2;

  useEffect(() => {
    ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'typing') {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1500);
      } else {
        setMessages((prev) => [...prev, { ...data, timestamp: new Date() }]);
      }
    };

    return () => ws.current.close();
  }, [roomName]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() && ws.current.readyState === 1) {
      ws.current.send(JSON.stringify({
        message: input,
        sender: userId,
        receiver: receiverId,
      }));
      setInput('');
    }
  };

  const handleTyping = () => {
    if (ws.current.readyState === 1) {
      ws.current.send(JSON.stringify({ type: 'typing', sender: userId }));
    }
  };

  const onEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="messaging-container">
      <h2>Real-Time Messaging</h2>

      <div className="messages-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === userId ? 'sent' : 'received'}`}
          >
            <div className="avatar-circle">
              {msg.sender === userId ? '👩‍💻' : '👨‍💼'}
            </div>
            <div className="message-content">
              <b>{msg.sender === userId ? 'You' : 'User ' + msg.sender}</b>: {msg.message}
              <div className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">User {receiverId} is typing...</div>
        )}
      </div>

      <form className="message-form" onSubmit={sendMessage}>
        <button type="button" className="emoji-toggle" onClick={() => setShowEmoji(!showEmoji)}>
          😊
        </button>
        {showEmoji && (
          <div className="emoji-picker-container">
            <EmojiPicker onEmojiClick={onEmojiClick} height={300} />
          </div>
        )}
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Messaging;
