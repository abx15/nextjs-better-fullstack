import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, target_language, source_language, voice, model, pitch, pace, loudness, speech_sample_rate, enable_preprocessing, output_format } = await request.json();

    // Get API key from environment variables
    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Sarvam API key not configured" },
        { status: 500 }
      );
    }

    // Call Sarvam TTS API
    const response = await fetch("https://api.sarvam.ai/speech_synthesize/v1/synthesize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": apiKey,
      },
      body: JSON.stringify({
        inputs: [
          {
            text: text,
            target_language: target_language,
            source_language: source_language,
            voice: voice,
            model: model,
            pitch: pitch,
            pace: pace,
            loudness: loudness,
            speech_sample_rate: speech_sample_rate,
            enable_preprocessing: enable_preprocessing,
            output_format: output_format,
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { 
          error: errorData.message || "Failed to synthesize speech",
          details: errorData 
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // Return the audio data
    return NextResponse.json(data);
  } catch (error) {
    console.error("Sarvam TTS API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
