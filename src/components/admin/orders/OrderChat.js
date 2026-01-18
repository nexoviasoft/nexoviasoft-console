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
      initials: order.client.name.charAt(0),
    },
    {
      id: 2,
      sender: "team",
      text: "Hello! We are currently finalizing the hero section. You should see an update by EOD.",
      time: "9:45 AM",
      avatar: null, // Team avatar
      initials: "Me",
    },
    {
      id: 3,
      sender: "client",
      text: "Great, thanks for the update!",
      time: "9:46 AM",
      avatar: order.client.avatar,
      initials: order.client.name.charAt(0),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "team",
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: null,
      initials: "Me",
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-white/15 bg-black/40 overflow-hidden">
      <div className="bg-black/60 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={order.client.avatar} />
            <AvatarFallback>{order.client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-white">
              {order.client.name}
            </div>
            <div className="text-xs text-emerald-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/50 hover:text-white"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.sender === "team";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}
            >
              {!isMe && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>{msg.initials}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`flex flex-col max-w-[80%] ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "bg-[#EFFC76] text-black rounded-br-none"
                      : "bg-white/5 border border-white/15 text-white/90 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-white/50 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-black/60 border-t border-white/10">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-white/50 hover:text-[#EFFC76]"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-black/40 border-white/20 text-white placeholder:text-white/40 focus:bg-black/60 focus:border-[#EFFC76] focus-visible:ring-0"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black rounded-lg glass-button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
