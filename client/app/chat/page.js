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

  // ✅ Step 4: Handle invalid user
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-700">
        Please login first to join a chat room.
      </div>
    );
  }

  if (!userData.roomId || !userData.name) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Invalid room or username.
      </div>
    );
  }

  // ✅ Step 5: UI layout
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col h-[80vh]">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 text-lg font-semibold flex justify-between">
          <span>Room: {userData.roomId}</span>
          <span>{userData.name}</span>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
          <AnimatePresence>
            {chat.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex ${
                  msg.username === userData.name
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-xl text-sm shadow-sm ${
                    msg.username === userData.name
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="font-semibold text-xs opacity-80">
                    {msg.username}
                  </p>
                  <p>{msg.message}</p>
                  <p className="text-[10px] opacity-60 text-right">
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-3 flex gap-2 border-t bg-white">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
