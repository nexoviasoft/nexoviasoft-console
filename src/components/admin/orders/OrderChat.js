"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MoreVertical, Paperclip } from "lucide-react";

export default function OrderChat({ order }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: "client", 
      text: "Hi, just checking on the progress of the homepage design?", 
      time: "9:30 AM",
      avatar: order.client.avatar,
      initials: order.client.name.charAt(0)
    },
    { 
      id: 2, 
      sender: "team", 
      text: "Hello! We are currently finalizing the hero section. You should see an update by EOD.", 
      time: "9:45 AM",
      avatar: null, // Team avatar
      initials: "Me"
    },
    { 
      id: 3, 
      sender: "client", 
      text: "Great, thanks for the update!", 
      time: "9:46 AM",
      avatar: order.client.avatar,
      initials: order.client.name.charAt(0)
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "team",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: null,
      initials: "Me"
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50 rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={order.client.avatar} />
            <AvatarFallback>{order.client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-gray-900">{order.client.name}</div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Online
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.sender === "team";
          return (
            <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
              {!isMe && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>{msg.initials}</AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMe 
                    ? 'bg-purple-600 text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-purple-600">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 bg-gray-50 border-transparent focus:bg-white focus:border-purple-200 transition-colors"
          />
          <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
