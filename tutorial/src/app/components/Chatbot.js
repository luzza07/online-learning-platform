"use client";

import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    if (lowerCaseMessage === "hello") {
      return "Hello! How can I assist you today?";
    } else if (lowerCaseMessage === "what is c programming") {
      return "C is a powerful general-purpose programming language that is widely used for system programming, developing operating systems, and embedded systems.";
    } else {
      return "I'm a simple chatbot. I can only respond to 'hello' and 'what is C programming'!";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const assistantMessage = { role: "assistant", content: botResponse };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setIsLoading(false);
      setInput("");
    }, 1000);
  };

  return (
    <div
      style={{
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        border: "1px solid #ccc",
        overflow: "hidden",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Chatbot
      </div>

      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          borderBottom: "1px solid #ccc",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                message.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            {message.role === "assistant" && (
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#ccc",
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                🤖
              </div>
            )}
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "8px",
                backgroundColor:
                  message.role === "user" ? "#007bff" : "#e9ecef",
                color: message.role === "user" ? "#fff" : "#000",
              }}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ textAlign: "left", marginBottom: "10px" }}>
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "8px",
                backgroundColor: "#e9ecef",
                color: "#000",
              }}
            >
              Typing...
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          padding: "10px",
          backgroundColor: "#fff",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
