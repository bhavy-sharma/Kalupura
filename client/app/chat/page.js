// app/component/chat/page.js
"use client";

import { useEffect, useState, useRef } from 'react';
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [userData, setUserData] = useState(null);
  const messagesEndRef = useRef(null);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

 
  useEffect(() => {
   
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserData(parsed);
      } catch (e) {
        console.error("Failed to parse userData from localStorage", e);
      }
    }
  }, []);

  // Fetch chat history once userData is available
  useEffect(() => {
    if (!userData) return;

    const fetchChats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/kalupra/getChat');
        const data = await res.json();
        setChat(data || []);
      } catch (error) {
        console.error("Error fetching chats", error);
      }
    };

    fetchChats();
  }, [userData]);

  
  useEffect(() => {
    if (!userData?.name || !userData?.roomId) return;

    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.emit("join_room", {
      username: userData.name,
      room: userData.roomId,
    });

    newSocket.on("recivedmsg", (data) => {
      console.log("ya dta ha",data)
      setChat((prev) => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userData]);

  const sendMessage = async () => {
    if (!socket || !message.trim() || !userData) return;

    const msgData = {
      room: userData.roomId, 
      username: userData.name,
      message: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
    };

    try {
      // Save to DB
      await fetch('http://localhost:5000/api/v1/kalupra/addChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: msgData.username,
          message: msgData.message,
          date: new Date(),
          time: msgData.time,
        }),
      });

      
      socket.emit("sendmsg", msgData);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  
  if (!userData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!userData.name || !userData.roomId) {
    return <div className="flex items-center justify-center h-screen">Invalid user data</div>;
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col h-[80vh]">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 text-lg font-semibold flex justify-between">
          <span>Room: Kalupura</span>
          <span>{userData.name}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
          <AnimatePresence>
            {chat.map((msg, i) => (
              <motion.div
                key={`${msg.username}-${msg.time}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.username === userData.name ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-xl text-sm shadow-sm ${
                    msg.username === userData.name
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="font-semibold text-xs opacity-80">{msg.username}</p>
                  <p>{msg.message}</p>
                  <p className="text-[10px] opacity-60 text-right">{msg.time}</p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="p-3 flex gap-2 border-t bg-white">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
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