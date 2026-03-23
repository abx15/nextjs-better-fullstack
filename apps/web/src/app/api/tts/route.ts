import { NextRequest, NextResponse } from 'next/server';
import { sarvamTTS } from '@/lib/sarvam';

export async function POST(req: NextRequest) {
  try {
    const { text, language } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const audioBase64 = await sarvamTTS(text, language || 'hi');
    
    return NextResponse.json({ audio: audioBase64 });
  } catch (error) {
    console.error('TTS failed:', error);
    return NextResponse.json({ 
      error: 'Failed to generate speech' 
    }, { status: 500 });
  }
}
