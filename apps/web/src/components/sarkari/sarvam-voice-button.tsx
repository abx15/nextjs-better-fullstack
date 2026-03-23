"use client";

import { useState, useRef } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface SarvamVoiceButtonProps {
  onTranscript: (text: string) => void;
  language: string;
}

export default function SarvamVoiceButton({ onTranscript, language }: SarvamVoiceButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        chunksRef.current = [];
        
        // Convert to base64 and send to transcription API
        setIsProcessing(true);
        try {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64Audio = reader.result as string;
            
            // Mock transcription for now
            setTimeout(() => {
              const mockTranscription = language === 'hi' 
                ? "मेरे लिए कौन सी योजनाएं हैं"
                : "What schemes are available for me";
              
              onTranscript(mockTranscription);
              setIsProcessing(false);
            }, 1500);
          };
          reader.readAsDataURL(audioBlob);
        } catch (error) {
          console.error('Transcription failed:', error);
          setIsProcessing(false);
        }

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isProcessing}
      className={`p-2 rounded-full transition-colors ${
        isRecording
          ? 'bg-red-500 text-white hover:bg-red-600'
          : isProcessing
          ? 'bg-gray-300 text-gray-500'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {isProcessing ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isRecording ? (
        <MicOff className="w-4 h-4" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );
}
