"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, Loader2 } from "lucide-react"
import Image from "next/image"

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
  const [hoveredMidwife, setHoveredMidwife] = useState<string | null>(null)
  const [isLoadingMap, setIsLoadingMap] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<{ x: number; y: number; centerX: number; centerY: number } | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

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

  // Generate OpenStreetMap tile URL
  const generateTileUrl = (x: number, y: number, z: number) => {
    return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`
  }

  // Convert lat/lng to tile coordinates
  const latLngToTile = (lat: number, lng: number, zoom: number) => {
    const x = Math.floor(((lng + 180) / 360) * Math.pow(2, zoom))
    const y = Math.floor(
      ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
        Math.pow(2, zoom)
    )
    return { x, y }
  }

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
    setHoveredMidwife(null)
  }

  const handleMarkerClick = (midwifeId: string) => {
    setSelectedMidwife(selectedMidwife === midwifeId ? null : midwifeId)
    if (onMarkerClick) {
      onMarkerClick(midwifeId)
    }
  }

  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -1 : 1
    setZoom((prev) => Math.max(1, Math.min(18, prev + delta)))
  }

  // Handle mouse drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true)
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        centerX: center[0],
        centerY: center[1]
      })
    }
  }

  // Handle mouse drag
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && dragStart && mapRef.current) {
      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y
      
      // Convert pixel movement to coordinate movement
      const scale = Math.pow(2, zoom)
      const worldSize = 256 * scale
      const mapWidth = 800
      const mapHeight = 600
      
      const deltaLng = -(deltaX / mapWidth) * (360 / scale)
      const deltaLat = (deltaY / mapHeight) * (180 / scale)
      
      setCenter([
        dragStart.centerX + deltaLng,
        dragStart.centerY + deltaLat
      ])
    }
  }

  // Handle mouse drag end
  const handleMouseUp = () => {
    setIsDragging(false)
    setDragStart(null)
  }

  // Handle mouse leave to stop dragging
  const handleMouseLeave = () => {
    setIsDragging(false)
    setDragStart(null)
  }

  // Generate map tiles for display
  const generateMapTiles = () => {
    const tileSize = 256
    const mapWidth = 800
    const mapHeight = 600
    
    const centerTile = latLngToTile(center[1], center[0], zoom)
    const tilesX = Math.ceil(mapWidth / tileSize) + 1
    const tilesY = Math.ceil(mapHeight / tileSize) + 1
    
    const tiles = []
    
    for (let x = centerTile.x - Math.floor(tilesX / 2); x <= centerTile.x + Math.floor(tilesX / 2); x++) {
      for (let y = centerTile.y - Math.floor(tilesY / 2); y <= centerTile.y + Math.floor(tilesY / 2); y++) {
        if (x >= 0 && y >= 0 && x < Math.pow(2, zoom) && y < Math.pow(2, zoom)) {
          tiles.push({
            x,
            y,
            url: generateTileUrl(x, y, zoom),
            left: (x - centerTile.x) * tileSize + mapWidth / 2 - tileSize / 2,
            top: (y - centerTile.y) * tileSize + mapHeight / 2 - tileSize / 2,
          })
        }
      }
    }
    
    return tiles
  }

  const mapTiles = generateMapTiles()

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

        {/* Map Container */}
        <div 
          ref={mapRef}
          className={`absolute inset-0 overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ userSelect: 'none' }}
        >
          {/* Map Tiles */}
          {!isLoadingMap && !mapError && (
            <div className="absolute inset-0 overflow-hidden">
              {mapTiles.map((tile, index) => (
                <img
                  key={`${tile.x}-${tile.y}-${zoom}`}
                  src={tile.url}
                  alt=""
                  className="absolute pointer-events-none"
                  style={{
                    left: tile.left,
                    top: tile.top,
                    width: 256,
                    height: 256,
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                  draggable={false}
                />
              ))}
            </div>
          )}

          {/* Interactive Markers Overlay */}
          {!isLoadingMap && !mapError && (
            <div className="absolute inset-0 pointer-events-none">
              {midwives.map((midwife, index) => {
                const pixelPos = coordinateToPixel(midwife.coordinates)
                const isVisible = pixelPos.x >= -50 && pixelPos.x <= 850 && pixelPos.y >= -50 && pixelPos.y <= 650

                if (!isVisible) return null

                return (
                  <div key={midwife.id}>
                    {/* Marker */}
                    <button
                      className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200 hover:scale-110 pointer-events-auto ${
                        selectedMidwife === midwife.id ? "scale-110 z-20" : "z-10"
                      }`}
                      style={{
                        left: `${(pixelPos.x / 800) * 100}%`,
                        top: `${(pixelPos.y / 600) * 100}%`,
                      }}
                      onClick={() => handleMarkerClick(midwife.id)}
                      onMouseEnter={() => setHoveredMidwife(midwife.id)}
                      onMouseLeave={() => setHoveredMidwife(null)}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-500"></div>
                      </div>
                    </button>

                    {/* Hover Tooltip */}
                    {hoveredMidwife === midwife.id && (
                      <div
                        className="absolute z-40 bg-white rounded-lg shadow-xl border transform -translate-x-1/2 -translate-y-full mb-4 min-w-[280px] pointer-events-auto"
                        style={{
                          left: `${(pixelPos.x / 800) * 100}%`,
                          top: `${(pixelPos.y / 600) * 100}%`,
                        }}
                      >
                        <div className="p-4 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={midwife.imageUrl || "/placeholder.svg"}
                                alt={midwife.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm truncate">{midwife.name}</h3>
                              <p className="text-xs text-gray-600 truncate">{midwife.specialty}</p>
                              <div className="flex items-center mt-1">
                                <span className="text-yellow-500 text-sm">★</span>
                                <span className="text-xs ml-1">{midwife.rating}</span>
                                <span className="text-xs text-gray-500 ml-1">({midwife.reviewCount})</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            📍 {midwife.location}
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full text-xs h-8"
                            onClick={() => handleMarkerClick(midwife.id)}
                          >
                            {t("language") === "pl" ? "Sprawdź usługi" : "Check Services"}
                          </Button>
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                      </div>
                    )}

                    {/* Click Popup */}
                    {selectedMidwife === midwife.id && (
                      <div
                        className="absolute z-30 bg-white rounded-lg shadow-lg p-3 border transform -translate-x-1/2 -translate-y-full mb-2 min-w-[200px] pointer-events-auto"
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
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm pointer-events-auto"
            onClick={handleZoomIn}
            disabled={isLoadingMap || zoom >= 18}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm pointer-events-auto"
            onClick={handleZoomOut}
            disabled={isLoadingMap || zoom <= 1}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm pointer-events-auto"
            onClick={handleReset}
            disabled={isLoadingMap}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Legend */}
        {midwives.length > 0 && !isLoadingMap && !mapError && (
          <div className="absolute bottom-12 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-xs z-30">
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

        {/* Attribution */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded z-30">
          © OpenStreetMap contributors
        </div>

        {/* Instructions */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600 z-30">
          <div>🖱️ {t("language") === "pl" ? "Przeciągnij aby przesunąć" : "Drag to pan"}</div>
          <div>🔍 {t("language") === "pl" ? "Scroll aby powiększyć" : "Scroll to zoom"}</div>
        </div>
      </div>
    </Card>
  )
}