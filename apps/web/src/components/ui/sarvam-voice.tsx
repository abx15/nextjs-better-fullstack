import React, { useState, useRef, useEffect } from 'react'
import { Button } from './button'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { gsap } from 'gsap'
import { useUserStore } from '@/store/user-store'

interface SarvamVoiceButtonProps {
  onTranscript?: (text: string) => void
  language?: 'hi' | 'en' | 'bn' | 'gu' | 'kn' | 'ml' | 'mr' | 'ta' | 'te'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

type RecordingState = 'idle' | 'recording' | 'processing' | 'error'

export function SarvamVoiceButton({ 
  onTranscript,
  language = 'hi',
  size = 'md',
  className = '',
  disabled = false
}: SarvamVoiceButtonProps) {
  const { user } = useUserStore()
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  const [error, setError] = useState<string>('')
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pulseRingRef = useRef<HTMLDivElement>(null)
  
  const sizeConfig = {
    sm: {
      buttonSize: 'w-10 h-10',
      iconSize: 'w-4 h-4',
      pulseSize: 'w-12 h-12'
    },
    md: {
      buttonSize: 'w-14 h-14',
      iconSize: 'w-6 h-6',
      pulseSize: 'w-16 h-16'
    },
    lg: {
      buttonSize: 'w-20 h-20',
      iconSize: 'w-8 h-8',
      pulseSize: 'w-24 h-24'
    }
  }
  
  const config = sizeConfig[size]
  
  // Language code mapping for Sarvam API
  const languageCodeMap: Record<string, string> = {
    hi: 'hi-IN',
    en: 'en-IN',
    bn: 'bn-IN',
    gu: 'gu-IN',
    kn: 'kn-IN',
    ml: 'ml-IN',
    mr: 'mr-IN',
    ta: 'ta-IN',
    te: 'te-IN'
  }
  
  const langCode = languageCodeMap[language] || 'hi-IN'
  
  useEffect(() => {
    if (recordingState === 'recording' && pulseRingRef.current) {
      // Create pulsing animation
      const pulseAnimation = gsap.to(pulseRingRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out"
      })
      
      return () => {
        pulseAnimation.kill()
      }
    }
  }, [recordingState])
  
  const startRecording = async () => {
    try {
      setError('')
      setRecordingState('recording')
      chunksRef.current = []
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000
        } 
      })
      
      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }
      
      mediaRecorder.onstop = async () => {
        await processRecording()
      }
      
      // Start recording
      mediaRecorder.start()
      
    } catch (err) {
      console.error('Error starting recording:', err)
      setError('Microphone access denied')
      setRecordingState('error')
      
      // Reset after 3 seconds
      setTimeout(() => {
        setRecordingState('idle')
        setError('')
      }, 3000)
    }
  }
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      setRecordingState('processing')
      mediaRecorderRef.current.stop()
      
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
  }
  
  const processRecording = async () => {
    try {
      // Create audio blob
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
      
      // Convert to WAV format (required by Sarvam)
      const wavBlob = await convertToWav(audioBlob)
      
      // Send to Sarvam API
      const transcript = await transcribeAudio(wavBlob)
      
      if (transcript && onTranscript) {
        onTranscript(transcript)
      }
      
      setRecordingState('idle')
      
    } catch (err) {
      console.error('Error processing recording:', err)
      setError('Failed to transcribe audio')
      setRecordingState('error')
      
      // Reset after 3 seconds
      setTimeout(() => {
        setRecordingState('idle')
        setError('')
      }, 3000)
    }
  }
  
  const convertToWav = async (webmBlob: Blob): Promise<Blob> => {
    // This is a simplified conversion - in production, you might want to use a proper audio library
    // For now, we'll send the webm blob directly and let the server handle conversion
    return webmBlob
  }
  
  const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    const formData = new FormData()
    formData.append('file', audioBlob, 'recording.webm')
    formData.append('language_code', langCode)
    formData.append('model', 'saaras:v3')
    
    const response = await fetch('https://api.sarvam.ai/speech-to-text', {
      method: 'POST',
      headers: {
        'api-subscription-key': process.env.NEXT_PUBLIC_SARVAM_API_KEY || ''
      },
      body: formData
    })
    
    if (!response.ok) {
      throw new Error(`Sarvam API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data.transcript || ''
  }
  
  const handleClick = () => {
    if (disabled) return
    
    if (recordingState === 'idle') {
      startRecording()
    } else if (recordingState === 'recording') {
      stopRecording()
    }
  }
  
  const getButtonColor = () => {
    switch (recordingState) {
      case 'recording':
        return 'bg-red-500 hover:bg-red-600 text-white'
      case 'processing':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white'
      case 'error':
        return 'bg-red-500 hover:bg-red-600 text-white'
      default:
        return 'bg-primary hover:bg-primary/90 text-primary-foreground'
    }
  }
  
  const getIcon = () => {
    switch (recordingState) {
      case 'recording':
        return <MicOff className={config.iconSize} />
      case 'processing':
        return <Loader2 className={`${config.iconSize} animate-spin`} />
      case 'error':
        return <MicOff className={config.iconSize} />
      default:
        return <Mic className={config.iconSize} />
    }
  }
  
  return (
    <div className={`relative inline-flex flex-col items-center gap-2 ${className}`}>
      {/* Pulse ring for recording state */}
      {recordingState === 'recording' && (
        <div 
          ref={pulseRingRef}
          className={`absolute ${config.pulseSize} rounded-full border-4 border-red-500 -z-10`}
        />
      )}
      
      {/* Main button */}
      <Button
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled || recordingState === 'processing'}
        className={`${config.buttonSize} rounded-full ${getButtonColor()} transition-all duration-300 transform hover:scale-105 active:scale-95`}
        size="sm"
      >
        {getIcon()}
      </Button>
      
      {/* Status text */}
      {recordingState !== 'idle' && (
        <div className="text-center">
          <p className="text-xs font-medium">
            {recordingState === 'recording' && 'Recording...'}
            {recordingState === 'processing' && 'Processing...'}
            {recordingState === 'error' && 'Error'}
          </p>
          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>
      )}
      
      {/* Instructions tooltip */}
      {recordingState === 'idle' && (
        <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
          Click to start recording
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  )
}

// Compact version for mobile
export function SarvamVoiceCompact({ 
  onTranscript,
  language = 'hi'
}: Pick<SarvamVoiceButtonProps, 'onTranscript' | 'language'>) {
  return (
    <SarvamVoiceButton
      onTranscript={onTranscript}
      language={language}
      size="sm"
      className="mx-auto"
    />
  )
}

// Inline version for chat input
export function SarvamVoiceInline({ 
  onTranscript,
  language = 'hi'
}: Pick<SarvamVoiceButtonProps, 'onTranscript' | 'language'>) {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  
  return (
    <div className="flex items-center gap-2">
      <SarvamVoiceButton
        onTranscript={onTranscript}
        language={language}
        size="sm"
      />
      {recordingState === 'recording' && (
        <span className="text-xs text-red-500 animate-pulse">
          Recording...
        </span>
      )}
    </div>
  )
}
