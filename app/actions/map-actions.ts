"use server"

interface MidwifeLocation {
  id: string
  name: string
  specialty: string
  rating: number
  reviewCount: number
  location: string
  imageUrl: string
  coordinates: [number, number] // [longitude, latitude]
}

export async function generateMapUrl(
  center: [number, number],
  zoom: number,
  midwives: MidwifeLocation[],
): Promise<string> {
  const width = 800
  const height = 600
  const style = "outdoor-v2"

  // Use the server-side environment variable (without NEXT_PUBLIC_ prefix)
  const apiKey = process.env.MAPTILER_KEY

  if (!apiKey) {
    console.error("MapTiler API key is not set. Please set MAPTILER_KEY environment variable.")
    throw new Error("Map service unavailable")
  }

  // Create markers parameter for static map
  let markersParam = ""
  if (midwives.length > 0) {
    const markers = midwives
      .map((midwife, index) => `pin-s-${index + 1}+ff69b4(${midwife.coordinates[0]},${midwife.coordinates[1]})`)
      .join(",")
    markersParam = `&markers=${encodeURIComponent(markers)}`
  }

  return `https://api.maptiler.com/maps/${style}/static/${center[0]},${center[1]},${zoom}/${width}x${height}.png?key=${apiKey}${markersParam}`
}
