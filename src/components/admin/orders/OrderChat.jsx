"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MoreVertical, Paperclip, Loader2 } from "lucide-react";
import { 
  useGetOrderMessagesQuery, 
  useCreateOrderMessageMutation 
} from "@/api/admin/orders/orderApi";
import { toast } from "sonner";

function formatTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrderChat({ order }) {
  const [inputText, setInputText] = useState("");
  const orderId = order?.id;

  const { data: messagesData, isLoading, refetch } = useGetOrderMessagesQuery(orderId, {
    skip: !orderId,
    pollingInterval: 30000, // Poll every 30 seconds for new messages
  });

  const [createMessage, { isLoading: isSending }] = useCreateOrderMessageMutation();

  const messages = messagesData || [];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !orderId) return;

    try {
      await createMessage({
        orderId,
        senderType: 'team',
        message: inputText.trim(),
        senderName: 'Team',
      }).unwrap();
      
      setInputText("");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-white/15 bg-black/40 overflow-hidden">
      <div className="bg-black/60 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={order?.client?.photo} />
            <AvatarFallback>{order?.client?.name?.charAt(0) || 'C'}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-white">
              {order?.client?.name || 'Client'}
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
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-[#EFFC76]" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-white/50 text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderType === "team";
            const senderName = msg.senderName || (isMe ? "Team" : order?.client?.name || "Client");
            const senderAvatar = msg.senderAvatar || (isMe ? null : order?.client?.photo);
            const initials = senderName.charAt(0).toUpperCase();
            
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}
              >
                {!isMe && (
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarImage src={senderAvatar} />
                    <AvatarFallback>{initials}</AvatarFallback>
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
                    {msg.message}
                  </div>
                  <span className="text-[10px] text-white/50 mt-1 px-1">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
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
            disabled={isSending || !inputText.trim()}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black rounded-lg glass-button disabled:opacity-50"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
