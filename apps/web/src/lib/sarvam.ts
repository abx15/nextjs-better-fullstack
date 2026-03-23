const SARVAM_BASE = 'https://api.sarvam.ai'

export const LANGUAGE_CODES: Record<string, string> = {
  hi: 'hi-IN',
  en: 'en-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  pa: 'pa-IN',
  or: 'or-IN',
}

export async function sarvamSTT(audioBlob: Blob, language: string = 'hi'): Promise<string> {
  const formData = new FormData()
  formData.append('file', audioBlob, 'recording.wav')
  formData.append('language_code', LANGUAGE_CODES[language] || 'hi-IN')
  formData.append('model', 'saaras:v3')

  const res = await fetch(`${SARVAM_BASE}/speech-to-text`, {
    method: 'POST',
    headers: { 'api-subscription-key': process.env.SARVAM_API_KEY! },
    body: formData,
  })

  if (!res.ok) throw new Error('STT failed')
  const data = await res.json()
  return data.transcript || ''
}

export async function sarvamTTS(text: string, language: string = 'hi'): Promise<string> {
  const res = await fetch(`${SARVAM_BASE}/text-to-speech`, {
    method: 'POST',
    headers: {
      'api-subscription-key': process.env.SARVAM_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: [text.slice(0, 500)],
      target_language_code: LANGUAGE_CODES[language] || 'hi-IN',
      speaker: 'meera',
      model: 'bulbul:v2',
      enable_preprocessing: true,
    }),
  })

  if (!res.ok) throw new Error('TTS failed')
  const data = await res.json()
  return data.audios?.[0] || ''
}
