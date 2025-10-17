"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("LocalStorage error:", err);
    }
  }, []);

  useEffect(() => {
    if (!userData?.roomId || !userData?.name) return;

    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.emit("join_room", {
      user: userData.name,
      room: userData.roomId,
    });

    newSocket.on("recivedmsg", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userData]);

  const sendMessage = () => {
    if (!socket || !message.trim()) return;

    const msgData = {
      room: userData.roomId,
      username: userData.name,
      message: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("sendmsg", msgData);
    setMessage("");
  };

  // Handle invalid user
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-700 font-medium">
        Please login first to join the chat.
      </div>
    );
  }

  if (!userData.roomId || !userData.name) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-red-600 font-medium">
        Invalid room or username.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Full-screen chat container */}
      <div className="flex flex-col h-full max-w-full mx-auto w-full">
        {/* Chat Header - WhatsApp Style */}
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="font-semibold">{userData.roomId}</h2>
              <p className="text-xs text-gray-300">online</p>
            </div>
          </div>
          <div className="text-sm text-gray-300">{userData.name}</div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-3">
          <AnimatePresence>
            {chat.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className={`flex ${msg.username === userData.name ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-3xl shadow-sm ${
                    msg.username === userData.name
                      ? "bg-green-500 text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                  }`}
                >
                  {msg.username !== userData.name && (
                    <p className="text-xs font-semibold text-gray-600 mb-0.5">
                      {msg.username}
                    </p>
                  )}
                  <p>{msg.message}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.username === userData.name ? "text-green-100 text-right" : "text-gray-500"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area - WhatsApp Style */}
        <div className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border-none outline-none text-gray-800 placeholder-gray-500 px-4 py-2.5 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-green-300"
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className={`p-3 rounded-full flex items-center justify-center ${
              message.trim()
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-all duration-200`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}