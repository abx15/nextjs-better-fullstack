"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Volume2, VolumeX, Mic, MicOff, Plus, Trash2 } from "lucide-react";
import AITypingIndicator from "@/components/sarkari/ai-typing";
import SarvamVoiceButton from "@/components/sarkari/sarvam-voice-button";

interface ChatSession {
  id: string;
  title: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [language, setLanguage] = useState("hi");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, reload } = useChat({
    api: "/api/chat",
    body: {
      language,
      sessionId: currentSession?.id,
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load sessions from API
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const response = await fetch("/api/chat/sessions");
      const data = await response.json();
      setSessions(data.sessions || []);
      
      // Set current session to the most recent
      if (data.sessions && data.sessions.length > 0) {
        setCurrentSession(data.sessions[0]);
      }
    } catch (error) {
      console.error("Failed to load sessions:", error);
      // Mock data for demo
      const mockSessions: ChatSession[] = [
        {
          id: "1",
          title: "PM-KISAN के बारे में",
          language: "hi",
          createdAt: new Date(),
          updatedAt: new Date(),
          messageCount: 5,
        },
        {
          id: "2",
          title: "आयुष्मान card",
          language: "hi",
          createdAt: new Date(Date.now() - 86400000),
          updatedAt: new Date(Date.now() - 86400000),
          messageCount: 3,
        },
      ];
      setSessions(mockSessions);
      setCurrentSession(mockSessions[0]);
    }
  };

  const createNewSession = async () => {
    try {
      const response = await fetch("/api/chat/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });
      const data = await response.json();
      const newSession = data.session;
      setSessions([newSession, ...sessions]);
      setCurrentSession(newSession);
    } catch (error) {
      console.error("Failed to create session:", error);
      // Mock session
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: "नई बातचीत",
        language,
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 0,
      };
      setSessions([newSession, ...sessions]);
      setCurrentSession(newSession);
    }
  };

  const deleteSession = async (sessionId: string) => {
    try {
      await fetch(`/api/chat/sessions/${sessionId}`, { method: "DELETE" });
      setSessions(sessions.filter(s => s.id !== sessionId));
      if (currentSession?.id === sessionId) {
        setCurrentSession(sessions[0] || null);
      }
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  const updateSessionTitle = async (sessionId: string, title: string) => {
    try {
      await fetch(`/api/chat/sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      setSessions(sessions.map(s => 
        s.id === sessionId ? { ...s, title, updatedAt: new Date() } : s
      ));
      if (currentSession?.id === sessionId) {
        setCurrentSession({ ...currentSession, title, updatedAt: new Date() });
      }
    } catch (error) {
      console.error("Failed to update session title:", error);
    }
  };

  const quickQuestions = [
    "PM-KISAN ?",
    "Documents ?",
    "मेरी योजनाएं",
    "Scholarship ?",
  ];

  const groupedSessions = sessions.reduce((acc, session) => {
    const today = new Date();
    const sessionDate = new Date(session.createdAt);
    const diffTime = Math.abs(today.getTime() - sessionDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let group = "आज";
    if (diffDays > 1) group = "कल";
    if (diffDays > 2) group = "पुरानी";
    
    if (!acc[group]) acc[group] = [];
    acc[group].push(session);
    return acc;
  }, {} as Record<string, ChatSession[]>);

  const formatDateInHindi = (date: Date) => {
    return new Intl.DateTimeFormat("hi-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* LEFT SIDEBAR - Chat History */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 ease-in-out bg-[#f0f4f8] border-r border-gray-200 overflow-hidden flex flex-col`}
      >
        <div className="p-4 flex-1 flex flex-col">
          {/* New Chat Button */}
          <Button
            onClick={createNewSession}
            className="w-full mb-4 bg-[#FF6B00] hover:bg-[#FF6B00]/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            + नई बातचीत
          </Button>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {Object.entries(groupedSessions).map(([group, groupSessions]) => (
              <div key={group}>
                <h4 className="text-xs font-semibold text-gray-500 mb-2">{group}</h4>
                <div className="space-y-1">
                  {groupSessions.map((session) => (
                    <div
                      key={session.id}
                      className={`group relative p-2 rounded-lg cursor-pointer transition-colors ${
                        currentSession?.id === session.id
                          ? "bg-white border-l-4 border-l-[#1a3a6b]"
                          : "hover:bg-white"
                      }`}
                      onClick={() => setCurrentSession(session)}
                    >
                      {editingTitle === session.id ? (
                        <input
                          type="text"
                          value={tempTitle}
                          onChange={(e) => setTempTitle(e.target.value)}
                          onBlur={() => {
                            updateSessionTitle(session.id, tempTitle);
                            setEditingTitle(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateSessionTitle(session.id, tempTitle);
                              setEditingTitle(null);
                            }
                          }}
                          className="w-full text-sm font-medium bg-transparent border-b border-gray-300 focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <>
                          <h3
                            className="text-sm font-medium text-gray-800 truncate"
                            onDoubleClick={() => {
                              setEditingTitle(session.id);
                              setTempTitle(session.title);
                            }}
                          >
                            {session.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {session.messageCount} messages • {formatDateInHindi(session.updatedAt)}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSession(session.id);
                            }}
                            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}
              <h2 className="text-lg font-semibold text-gray-800">
                {currentSession?.title || "AI साथी"}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg"
              >
                <option value="hi">हिंदी</option>
                <option value="en">English</option>
              </select>
              
              {/* TTS Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={voiceEnabled ? "text-[#FF6B00]" : "text-gray-400"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* MESSAGES AREA */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto p-4 space-y-4">
            {/* Date Separator */}
            <div className="text-center py-2">
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                आज, {new Date().toLocaleDateString("hi-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            {/* Messages */}
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  AI साथी से बात करें
                </h3>
                <p className="text-gray-500 mb-6">
                  कोई भी सरकारी योजना का सवाल हिंदी में पूछें
                </p>
                
                {/* Quick Questions */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const form = document.createElement("form");
                        form.onsubmit = (e) => {
                          e.preventDefault();
                          const formData = new FormData(form);
                          handleSubmit(e as any);
                        };
                        const input = document.createElement("input");
                        input.name = "message";
                        input.value = question;
                        form.appendChild(input);
                        document.body.appendChild(form);
                        form.requestSubmit();
                        document.body.removeChild(form);
                      }}
                      className="px-4 py-2 bg-[#f0f4f8] hover:bg-[#e2e8f0] rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" ? (
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-[#1a3a6b] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">🏛️</span>
                      </div>
                      <Card className="bg-white border-l-4 border-l-[#1a3a6b] p-4 shadow-sm">
                        <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500">
                            {new Date().toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-xs">
                              📋 Copy
                            </Button>
                            {voiceEnabled && (
                              <Button variant="ghost" size="sm" className="text-xs">
                                🔊 सुनें
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  ) : (
                    <Card className="bg-[#FF6B00] text-white p-4 max-w-[80%] shadow-sm">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs text-white/80 mt-2 text-right">
                        {new Date().toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </Card>
                  )}
                </div>
              ))
            )}

            {/* AI Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a3a6b] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">🏛️</span>
                  </div>
                  <Card className="bg-white border-l-4 border-l-[#1a3a6b] p-4 shadow-sm">
                    <AITypingIndicator />
                    <p className="text-gray-600 mt-2">AI साथी सोच रहा है...</p>
                  </Card>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="bg-white border-t border-gray-200">
          {/* Quick Chips */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  const form = document.createElement("form");
                  form.onsubmit = (e) => {
                    e.preventDefault();
                    handleSubmit(e as any);
                  };
                  const input = document.createElement("input");
                  input.name = "message";
                  input.value = question;
                  form.appendChild(input);
                  document.body.appendChild(form);
                  form.requestSubmit();
                  document.body.removeChild(form);
                }}
                className="px-3 py-1 bg-[#f0f4f8] hover:bg-[#e2e8f0] rounded-full text-xs text-gray-700 whitespace-nowrap transition-colors"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Main Input */}
          <div className="px-4 pb-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              {/* Voice Button */}
              <div className="flex-shrink-0">
                <SarvamVoiceButton
                  onTranscript={(text) => {
                    // Set the input value when voice transcription is received
                    const inputElement = inputRef.current;
                    if (inputElement) {
                      inputElement.value = text;
                      handleInputChange({ target: { value: text } } as any);
                    }
                  }}
                  language={language}
                />
              </div>

              {/* Text Input */}
              <Input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Type here..."
                className="flex-1 min-h-[40px] max-h-[120px]"
                disabled={isLoading}
              />

              {/* Send Button */}
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`flex-shrink-0 ${
                  input.trim() ? "bg-[#FF6B00] hover:bg-[#FF6B00]/90" : "bg-gray-300"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-2">
              AI जानकारी देता है, official confirmation के लिए govt site देखें
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
