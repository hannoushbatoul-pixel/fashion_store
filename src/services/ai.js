const POLLINATIONS_MODEL = 'community/JustScriptzz/flux-2-klein-9b'

export async function getImage(prompt) {
  if (!prompt || !prompt.trim()) {
    throw new Error('Please enter a design description.')
  }

  const apiKey = import.meta.env.VITE_POLLINATIONS_API_KEY

  if (!apiKey) {
    throw new Error('Pollinations API key is missing.')
  }

  const response = await fetch(
    `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?model=${encodeURIComponent(POLLINATIONS_MODEL)}&width=1024&height=1024`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Image generation failed: ${response.status} ${errorText}`)
  }

  const blob = await response.blob()
  return URL.createObjectURL(blob)
}
