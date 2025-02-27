"use client"; // Mark this as a Client Component

import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const predefinedResponses = {
    hello: "Hi there! How can I assist you today?",
    "what is c programming":
      "C programming is a general-purpose, procedural computer programming language. It was designed by Dennis Ritchie at Bell Labs in the 1970s.",
    "what is python":
      "Python is an interpreted, high-level, general-purpose programming language. It's widely used for web development, data analysis, machine learning, and more.",
    "what is js":
      "JavaScript is a versatile programming language that enables you to create dynamic and interactive content on websites.",
    "what is react":
      "React is a JavaScript library for building user interfaces, especially single-page applications where you need a fast, interactive user experience.",
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsLoading(true);

    // Simulate AI response with a delay
    setTimeout(() => {
      const response =
        predefinedResponses[input.toLowerCase()] ||
        "Sorry, I don't have an answer for that.";
      const assistantMessage = { role: "assistant", content: response };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setIsLoading(false);
    }, 1000);

    setInput(""); // Clear input field after sending
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
      {/* Chat Header */}
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

      {/* Chat Messages */}
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
            {message.role === "user" && (
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#007bff",
                  marginLeft: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                👤
              </div>
            )}
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

      {/* Input Area */}
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
