"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Globe, Headphones } from "lucide-react";

interface Message {
  id: string;
  text: string;
  speaker: "user" | "assistant";
  timestamp: Date;
  language?: "hi" | "en";
}

interface SarvamResponse {
  text: string;
  language_detected?: string;
  confidence?: number;
}

export default function SarvamVoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<"hi" | "en">("hi");
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isSupported, setIsSupported] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Check if browser supports speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = currentLanguage === "hi" ? "hi-IN" : "en-US";
    
    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript;
      
      if (transcript.trim()) {
        const userMessage: Message = {
          id: Date.now().toString(),
          text: transcript,
          speaker: "user",
          timestamp: new Date(),
          language: currentLanguage
        };
        
        setMessages(prev => [...prev, userMessage]);
        
        // Process with Sarvam AI
        processWithSarvam(transcript, currentLanguage);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [currentLanguage]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const processWithSarvam = async (text: string, language: string) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch("/api/sarvam/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          target_language: language === "hi" ? "hi" : "en",
          source_language: language,
          voice: "female",
          model: "bulbul:v1",
          pitch: 0,
          pace: 1.1,
          loudness: 0.8,
          speech_sample_rate: 8000,
          enable_preprocessing: true,
          output_format: "mp3",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process with Sarvam AI");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        text: data.text || "मैं आपकी सहायता करने का प्रयास करूंगा।",
        speaker: "assistant",
        timestamp: new Date(),
        language: currentLanguage
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Sarvam AI error:", error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "क्षमा करें, मैं आपकी सहायता नहीं कर पाया। कृपया बाद में प्रयास करें।",
        speaker: "assistant",
        timestamp: new Date(),
        language: currentLanguage
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const startListening = () => {
    if (!isSupported || isListening) return;
    
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (!isSupported) return;
    
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const playAudio = async (audioBase64: string) => {
    try {
      const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
      audio.volume = isMuted ? 0 : volume;
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            सरकारी सैथी AI सहायता
          </h3>
          
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={currentLanguage === "hi" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentLanguage("hi")}
                className="px-3 py-1 text-sm"
              >
                हिंदी
              </Button>
              <Button
                variant={currentLanguage === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentLanguage("en")}
                className="px-3 py-1 text-sm"
              >
                English
              </Button>
            </div>
            
            {/* Clear Messages */}
            <Button
              variant="outline"
              size="sm"
              onClick={clearMessages}
              className="text-gray-600"
            >
              साफ करें
            </Button>
          </div>
        </div>

        {/* Support Status */}
        {!isSupported && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
            <p className="text-sm text-yellow-800">
              ⚠️ आपका ब्राउज़र speech recognition का समर्थन नहीं है। कृपया Chrome या Edge ब्राउज़र का उपयोग करें।
            </p>
          </div>
        )}

        {/* Voice Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <Button
            onClick={isListening ? stopListening : startListening}
            disabled={!isSupported || isProcessing}
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className="relative"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                <span>प्रोसेसिंग...</span>
              </div>
            ) : isListening ? (
              <div className="flex items-center gap-2">
                <div className="animate-pulse">
                  <Mic className="w-5 h-5 text-red-500" />
                </div>
                <span>बोल रहे हैं...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MicOff className="w-5 h-5 text-gray-500" />
                <span>बोलें शुरू करें</span>
              </div>
            )}
          </Button>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMute}
              className="p-2"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20"
            />
          </div>
        </div>

        {/* Messages */}
        <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Headphones className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">
                  {currentLanguage === "hi" 
                    ? "नमस्ते, मैं आपकी सहायता करने के लिए बोल सकता हूं। माइक्रोफोन दबाएं और बोलें।" 
                    : "Hello! I can assist you in Hindi and English. Please click the microphone and start speaking."
                  }
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.speaker === "user" ? "justify-end" : "justify-start"} mb-3`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                      message.speaker === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <div className="flex-shrink-0">
                        {message.speaker === "user" ? (
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mic className="w-3 h-3 text-blue-600" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm break-words">
                          {message.text}
                        </p>
                        {message.language && (
                          <span className="text-xs text-gray-500 ml-1">
                            ({message.language === "hi" ? "हिंदी" : "English"})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>
            Powered by <a href="https://www.sarvam.ai" target="_blank" className="text-blue-600 hover:underline">
              Sarvam AI
            </a>
          </p>
          <p className="mt-1">
            भाषा: {currentLanguage === "hi" ? "हिंदी" : "English"} | 
            स्थिति: {isSupported ? "समर्थित" : "असमर्थित"}
          </p>
        </div>
      </div>
    </Card>
  );
}
