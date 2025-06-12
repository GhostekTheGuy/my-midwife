"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, Loader2 } from "lucide-react"
import { generateMapUrl } from "@/app/actions/map-actions"

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

interface MidwifeMapProps {
  midwives: MidwifeLocation[]
  onMarkerClick?: (midwifeId: string) => void
  className?: string
}

export function MidwifeMap({ midwives, onMarkerClick, className = "" }: MidwifeMapProps) {
  const { t } = useLanguage()
  const [zoom, setZoom] = useState(11)
  const [center, setCenter] = useState<[number, number]>([21.0122, 52.2297]) // Warsaw default
  const [selectedMidwife, setSelectedMidwife] = useState<string | null>(null)
  const [mapUrl, setMapUrl] = useState<string>("")
  const [isLoadingMap, setIsLoadingMap] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  // Calculate bounds and center from midwives
  useEffect(() => {
    if (midwives.length === 0) return

    if (midwives.length === 1) {
      setCenter(midwives[0].coordinates)
      setZoom(14)
    } else {
      // Calculate center point
      const avgLng = midwives.reduce((sum, m) => sum + m.coordinates[0], 0) / midwives.length
      const avgLat = midwives.reduce((sum, m) => sum + m.coordinates[1], 0) / midwives.length
      setCenter([avgLng, avgLat])
      setZoom(11)
    }
  }, [midwives])

  // Generate map URL when center, zoom, or midwives change
  useEffect(() => {
    const fetchMapUrl = async () => {
      setIsLoadingMap(true)
      setMapError(null)

      try {
        const url = await generateMapUrl(center, zoom, midwives)
        setMapUrl(url)
      } catch (error) {
        console.error("Failed to generate map URL:", error)
        setMapError("Failed to load map")
        setMapUrl("/map-error.png")
      } finally {
        setIsLoadingMap(false)
      }
    }

    fetchMapUrl()
  }, [center, zoom, midwives])

  // Convert coordinates to pixel position on the map
  const coordinateToPixel = (coord: [number, number]) => {
    const mapWidth = 800
    const mapHeight = 600

    // Simple mercator projection approximation
    const scale = Math.pow(2, zoom)
    const worldSize = 256 * scale

    const x = ((coord[0] + 180) / 360) * worldSize
    const y =
      ((1 - Math.log(Math.tan((coord[1] * Math.PI) / 180) + 1 / Math.cos((coord[1] * Math.PI) / 180)) / Math.PI) / 2) *
      worldSize

    const centerX = ((center[0] + 180) / 360) * worldSize
    const centerY =
      ((1 - Math.log(Math.tan((center[1] * Math.PI) / 180) + 1 / Math.cos((center[1] * Math.PI) / 180)) / Math.PI) /
        2) *
      worldSize

    return {
      x: x - centerX + mapWidth / 2,
      y: y - centerY + mapHeight / 2,
    }
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 18))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 1))
  }

  const handleReset = () => {
    if (midwives.length === 0) {
      setCenter([21.0122, 52.2297])
      setZoom(11)
    } else if (midwives.length === 1) {
      setCenter(midwives[0].coordinates)
      setZoom(14)
    } else {
      const avgLng = midwives.reduce((sum, m) => sum + m.coordinates[0], 0) / midwives.length
      const avgLat = midwives.reduce((sum, m) => sum + m.coordinates[1], 0) / midwives.length
      setCenter([avgLng, avgLat])
      setZoom(11)
    }
    setSelectedMidwife(null)
  }

  const handleMarkerClick = (midwifeId: string) => {
    setSelectedMidwife(selectedMidwife === midwifeId ? null : midwifeId)
    if (onMarkerClick) {
      onMarkerClick(midwifeId)
    }
  }

  return (
    <Card className={`overflow-hidden relative ${className}`}>
      <div className="relative w-full h-full min-h-[400px]">
        {/* Loading State */}
        {isLoadingMap && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading map...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {mapError && !isLoadingMap && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
            <div className="text-center text-gray-600">
              <p className="mb-2">{mapError}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Map Image */}
        {mapUrl && !isLoadingMap && (
          <img
            src={mapUrl || "/placeholder.svg"}
            alt="Map showing midwife locations"
            className="w-full h-full object-cover"
            style={{ maxWidth: "100%", height: "auto", minHeight: "400px" }}
            onError={() => {
              setMapError("Failed to load map image")
              setMapUrl("/map-error.png")
            }}
          />
        )}

        {/* Interactive Markers Overlay */}
        {!isLoadingMap && !mapError && (
          <div className="absolute inset-0">
            {midwives.map((midwife, index) => {
              const pixelPos = coordinateToPixel(midwife.coordinates)
              const isVisible = pixelPos.x >= 0 && pixelPos.x <= 800 && pixelPos.y >= 0 && pixelPos.y <= 600

              if (!isVisible) return null

              return (
                <div key={midwife.id}>
                  {/* Marker */}
                  <button
                    className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200 hover:scale-110 ${
                      selectedMidwife === midwife.id ? "scale-110 z-20" : "z-10"
                    }`}
                    style={{
                      left: `${(pixelPos.x / 800) * 100}%`,
                      top: `${(pixelPos.y / 600) * 100}%`,
                    }}
                    onClick={() => handleMarkerClick(midwife.id)}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-500"></div>
                    </div>
                  </button>

                  {/* Popup */}
                  {selectedMidwife === midwife.id && (
                    <div
                      className="absolute z-30 bg-white rounded-lg shadow-lg p-3 border transform -translate-x-1/2 -translate-y-full mb-2 min-w-[200px]"
                      style={{
                        left: `${(pixelPos.x / 800) * 100}%`,
                        top: `${(pixelPos.y / 600) * 100}%`,
                      }}
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium text-sm">{midwife.name}</h3>
                        <p className="text-xs text-gray-600">{midwife.specialty}</p>
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-sm">★</span>
                          <span className="text-xs ml-1">{midwife.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({midwife.reviewCount})</span>
                        </div>
                        <p className="text-xs text-gray-500">{midwife.location}</p>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm"
            onClick={handleZoomIn}
            disabled={isLoadingMap}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm"
            onClick={handleZoomOut}
            disabled={isLoadingMap}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm"
            onClick={handleReset}
            disabled={isLoadingMap}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Legend */}
        {midwives.length > 0 && !isLoadingMap && !mapError && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-xs">
            <h4 className="font-medium text-sm mb-2">Midwives ({midwives.length})</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {midwives.slice(0, 5).map((midwife, index) => (
                <div key={midwife.id} className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="truncate">{midwife.name}</span>
                </div>
              ))}
              {midwives.length > 5 && <div className="text-xs text-gray-500">+{midwives.length - 5} more</div>}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
