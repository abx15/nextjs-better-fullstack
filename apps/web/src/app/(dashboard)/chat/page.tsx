"use client";

import React, { useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Send, MessageSquare } from "lucide-react";
import { gsap } from "gsap";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });

  // Typing indicator animation
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIndicatorRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (isLoading && typingIndicatorRef.current) {
      gsap.fromTo(
        typingIndicatorRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isLoading]);

  const chatHistory = [
    { id: 1, title: "Getting Started", preview: "How to use this chat interface..." },
    { id: 2, title: "AI Capabilities", preview: "What can this AI assistant do?" },
    { id: 3, title: "Technical Questions", preview: "Ask about programming and development..." },
  ];

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } transition-all duration-300 ease-in-out border-r bg-muted/50 overflow-hidden`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Chat History</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              ×
            </Button>
          </div>
          
          <Button className="w-full mb-4" variant="default">
            <MessageSquare className="w-4 h-4 mr-2" />
            New Chat
          </Button>

          <div className="flex-1 space-y-2">
            {chatHistory.map((chat) => (
              <Card
                key={chat.id}
                className="p-3 cursor-pointer hover:bg-accent transition-colors"
              >
                <h3 className="font-medium text-sm mb-1">{chat.title}</h3>
                <p className="text-xs text-muted-foreground truncate">
                  {chat.preview}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            )}
            <h1 className="text-xl font-semibold">AI Assistant</h1>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground mt-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation with the AI assistant</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Card
                  className={`max-w-[80%] p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </Card>
              </div>
            ))
          )}
          
          {/* Typing Indicator */}
          {isLoading && (
            <div ref={typingIndicatorRef} className="flex justify-start">
              <Card className="bg-muted p-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">AI is thinking...</span>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
