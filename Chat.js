import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching history", error);
      }
    };
    fetchHistory();
  }, [token]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat/message",
        { text: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages([...messages, { text: input, sender: "user" }, { text: res.data.botMessage, sender: "bot" }]);
      setInput("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{ color: msg.sender === "user" ? "blue" : "green" }}>{msg.text}</p>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
export default Chat;
