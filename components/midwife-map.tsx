"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { ZoomIn, ZoomOut, RotateCcw, Loader2 } from "lucide-react"
import Image from "next/image"

// Import Leaflet types
import type { Map as LeafletMap, Marker, DivIcon } from "leaflet"

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
  const { t, language } = useLanguage()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)
  const markersRef = useRef<Marker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const initializeMap = async () => {
      if (!mapRef.current) return

      try {
        setIsLoading(true)
        setMapError(null)

        // Dynamic imports to avoid SSR issues
        const L = await import("leaflet")
        await import("leaflet/dist/leaflet.css")
        await import("@maptiler/leaflet-maptilersdk")

        // Fix for default markers in Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: '/marker-icon.png',
          iconUrl: '/marker-icon.png',
          shadowUrl: '/marker-icon.png',
        })

        if (!mounted) return

        // Calculate center and zoom based on midwives
        let center: [number, number] = [52.2297, 21.0122] // Warsaw default
        let zoom = 11

        if (midwives.length === 1) {
          center = [midwives[0].coordinates[1], midwives[0].coordinates[0]]
          zoom = 14
        } else if (midwives.length > 1) {
          // Calculate bounds
          const lats = midwives.map(m => m.coordinates[1])
          const lngs = midwives.map(m => m.coordinates[0])
          const avgLat = lats.reduce((sum, lat) => sum + lat, 0) / lats.length
          const avgLng = lngs.reduce((sum, lng) => sum + lng, 0) / lngs.length
          center = [avgLat, avgLng]
        }

        // Create map
        const map = L.map(mapRef.current, {
          center: L.latLng(center[0], center[1]),
          zoom: zoom,
          zoomControl: false, // We'll add custom controls
          attributionControl: true,
        })

        // Add MapTiler layer
        const mtLayer = new (L as any).maptiler.maptilerLayer({
          apiKey: "cM7IF9RAJLNUuMNpfjtq", // Free MapTiler API key
          style: "streets-v2", // You can change this to other styles
        }).addTo(map)

        mapInstanceRef.current = map

        // Add markers
        addMarkers(L, map)

        if (mounted) {
          setIsLoading(false)
        }

      } catch (error) {
        console.error("Failed to initialize map:", error)
        if (mounted) {
          setMapError("Failed to load map. Please try again.")
          setIsLoading(false)
        }
      }
    }

    const addMarkers = (L: any, map: LeafletMap) => {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []

      midwives.forEach((midwife, index) => {
        // Create custom marker icon
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="marker-container">
              <div class="marker-pin">
                <span class="marker-number">${index + 1}</span>
              </div>
              <div class="marker-shadow"></div>
            </div>
          `,
          iconSize: [30, 40],
          iconAnchor: [15, 40],
          popupAnchor: [0, -40]
        })

        // Create marker
        const marker = L.marker([midwife.coordinates[1], midwife.coordinates[0]], {
          icon: customIcon
        }).addTo(map)

        // Create popup content
        const popupContent = `
          <div class="midwife-popup">
            <div class="popup-header">
              <img src="${midwife.imageUrl}" alt="${midwife.name}" class="popup-avatar" />
              <div class="popup-info">
                <h3 class="popup-name">${midwife.name}</h3>
                <p class="popup-specialty">${midwife.specialty}</p>
                <div class="popup-rating">
                  <span class="rating-star">★</span>
                  <span class="rating-value">${midwife.rating}</span>
                  <span class="rating-count">(${midwife.reviewCount})</span>
                </div>
              </div>
            </div>
            <p class="popup-location">📍 ${midwife.location}</p>
            <button class="popup-cta" onclick="window.handleMarkerClick('${midwife.id}')">
              ${language === "pl" ? "Sprawdź usługi" : "Check Services"}
            </button>
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 280,
          className: 'custom-popup'
        })

        // Add click handler
        marker.on('click', () => {
          if (onMarkerClick) {
            onMarkerClick(midwife.id)
          }
        })

        markersRef.current.push(marker)
      })
    }

    // Global function for popup button clicks
    ;(window as any).handleMarkerClick = (midwifeId: string) => {
      if (onMarkerClick) {
        onMarkerClick(midwifeId)
      }
    }

    initializeMap()

    return () => {
      mounted = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      markersRef.current = []
      delete (window as any).handleMarkerClick
    }
  }, [midwives, onMarkerClick, language])

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut()
    }
  }

  const handleReset = () => {
    if (!mapInstanceRef.current) return

    if (midwives.length === 0) {
      mapInstanceRef.current.setView([52.2297, 21.0122], 11)
    } else if (midwives.length === 1) {
      mapInstanceRef.current.setView([midwives[0].coordinates[1], midwives[0].coordinates[0]], 14)
    } else {
      // Fit bounds to show all markers
      const group = new (window as any).L.featureGroup(markersRef.current)
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1))
    }
  }

  return (
    <>
      {/* Custom CSS for markers and popups */}
      <style jsx global>{`
        .custom-marker {
          background: none !important;
          border: none !important;
        }

        .marker-container {
          position: relative;
          width: 30px;
          height: 40px;
        }

        .marker-pin {
          width: 30px;
          height: 30px;
          background: #ec4899;
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
        }

        .marker-pin:hover {
          transform: rotate(-45deg) scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        .marker-number {
          color: white;
          font-weight: bold;
          font-size: 12px;
          transform: rotate(45deg);
        }

        .marker-shadow {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 8px;
          background: rgba(0,0,0,0.2);
          border-radius: 50%;
          filter: blur(2px);
        }

        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          border: none;
        }

        .custom-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }

        .midwife-popup {
          padding: 16px;
          min-width: 250px;
        }

        .popup-header {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .popup-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #f3f4f6;
        }

        .popup-info {
          flex: 1;
        }

        .popup-name {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #1f2937;
        }

        .popup-specialty {
          font-size: 12px;
          color: #6b7280;
          margin: 0 0 6px 0;
        }

        .popup-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
        }

        .rating-star {
          color: #fbbf24;
        }

        .rating-value {
          font-weight: 600;
          color: #1f2937;
        }

        .rating-count {
          color: #6b7280;
        }

        .popup-location {
          font-size: 12px;
          color: #6b7280;
          margin: 0 0 12px 0;
        }

        .popup-cta {
          width: 100%;
          background: #ec4899;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .popup-cta:hover {
          background: #db2777;
        }

        .leaflet-container {
          border-radius: 12px;
        }
      `}</style>

      <Card className={`overflow-hidden relative ${className}`}>
        <div className="relative w-full h-full min-h-[400px]">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading map...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {mapError && !isLoading && (
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
          <div ref={mapRef} className="w-full h-full min-h-[400px]" />

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/90 backdrop-blur-sm"
              onClick={handleZoomIn}
              disabled={isLoading}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/90 backdrop-blur-sm"
              onClick={handleZoomOut}
              disabled={isLoading}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/90 backdrop-blur-sm"
              onClick={handleReset}
              disabled={isLoading}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Legend */}
          {midwives.length > 0 && !isLoading && !mapError && (
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-xs z-[1000]">
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
                {midwives.length > 5 && (
                  <div className="text-xs text-gray-500">+{midwives.length - 5} more</div>
                )}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600 z-[1000]">
            <div>🖱️ {language === "pl" ? "Przeciągnij aby przesunąć" : "Drag to pan"}</div>
            <div>🔍 {language === "pl" ? "Scroll aby powiększyć" : "Scroll to zoom"}</div>
          </div>
        </div>
      </Card>
    </>
  )
}