"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
// Import the Leaflet MapTiler Plugin
import "@maptiler/leaflet-maptilersdk"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { ZoomIn, ZoomOut, RotateCcw, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Fix for default markers in Leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

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
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMidwife, setSelectedMidwife] = useState<string | null>(null)

  // Create custom icon for midwife markers
  const createMidwifeIcon = (index: number) => {
    const iconHtml = `
      <div style="
        background-color: #ec4899;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        font-weight: bold;
        position: relative;
      ">
        ${index + 1}
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid #ec4899;
        "></div>
      </div>
    `

    return L.divIcon({
      html: iconHtml,
      className: "custom-midwife-marker",
      iconSize: [30, 38],
      iconAnchor: [15, 38],
      popupAnchor: [0, -38],
    })
  }

  // Create popup content for midwife
  const createPopupContent = (midwife: MidwifeLocation): string => {
    return `
      <div style="min-width: 280px; font-family: system-ui, -apple-system, sans-serif;">
        <div style="display: flex; gap: 12px; margin-bottom: 12px;">
          <img 
            src="${midwife.imageUrl}" 
            alt="${midwife.name}"
            style="
              width: 48px;
              height: 48px;
              border-radius: 50%;
              object-fit: cover;
              border: 2px solid #f3f4f6;
            "
          />
          <div style="flex: 1;">
            <h3 style="margin: 0 0 4px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
              ${midwife.name}
            </h3>
            <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px;">
              ${midwife.specialty}
            </p>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 12px;">
              <span style="color: #fbbf24;">★</span>
              <span style="font-weight: 600; color: #1f2937;">${midwife.rating}</span>
              <span style="color: #6b7280;">(${midwife.reviewCount})</span>
            </div>
          </div>
        </div>
        <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 12px;">
          📍 ${midwife.location}
        </p>
        <button 
          onclick="window.handleMidwifeClick('${midwife.id}')"
          style="
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
          "
          onmouseover="this.style.background='#db2777'"
          onmouseout="this.style.background='#ec4899'"
        >
          ${language === "pl" ? "Sprawdź usługi" : "Check Services"}
        </button>
      </div>
    `
  }

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    try {
      setIsLoading(true)
      setError(null)

      // Calculate center based on midwives
      let center: L.LatLngExpression = [52.2297, 21.0122] // Warsaw default
      let zoom = 11

      if (midwives.length === 1) {
        center = [midwives[0].coordinates[1], midwives[0].coordinates[0]]
        zoom = 14
      } else if (midwives.length > 1) {
        const lats = midwives.map(m => m.coordinates[1])
        const lngs = midwives.map(m => m.coordinates[0])
        const avgLat = lats.reduce((sum, lat) => sum + lat, 0) / lats.length
        const avgLng = lngs.reduce((sum, lng) => sum + lng, 0) / lngs.length
        center = [avgLat, avgLng]
      }

      // Initialize the map
      const map = L.map(mapRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false, // We'll add custom controls
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
      })

      // Create a MapTiler Layer inside Leaflet using the correct API
      const mtLayer = new (L as any).maptiler.maptilerLayer({
        apiKey: "cM7IF9RAJLNUuMNpfjtq",
      }).addTo(map)

      // Handle layer load events
      mtLayer.on("load", () => {
        setIsLoading(false)
      })

      mtLayer.on("error", (e: any) => {
        console.error("MapTiler layer error:", e)
        setError("Failed to load map tiles. Please check your connection.")
        setIsLoading(false)
      })

      mapInstanceRef.current = map

      // Add midwife markers to the map
      midwives.forEach((midwife, index) => {
        try {
          const marker = L.marker([midwife.coordinates[1], midwife.coordinates[0]], {
            icon: createMidwifeIcon(index),
          }).addTo(map)

          const popupContent = createPopupContent(midwife)
          marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: "custom-midwife-popup",
          })

          // Handle marker events
          marker.on("click", () => {
            setSelectedMidwife(midwife.id)
          })

          marker.on("popupclose", () => {
            setSelectedMidwife(null)
          })

          markersRef.current.push(marker)
        } catch (err) {
          console.error(`Error adding marker for ${midwife.name}:`, err)
        }
      })

      // Global function for popup button clicks
      ;(window as any).handleMidwifeClick = (midwifeId: string) => {
        if (onMarkerClick) {
          onMarkerClick(midwifeId)
        }
      }

      // Set loading to false after a short delay to ensure everything is rendered
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)

    } catch (err) {
      console.error("Error initializing map:", err)
      setError("Failed to initialize the map. Please try refreshing the page.")
      setIsLoading(false)
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        markersRef.current.forEach((marker) => marker.remove())
        markersRef.current = []
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      // Clean up global function
      delete (window as any).handleMidwifeClick
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
      const group = new L.featureGroup(markersRef.current)
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1))
    }
    setSelectedMidwife(null)
  }

  const flyToMidwife = (midwife: MidwifeLocation) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([midwife.coordinates[1], midwife.coordinates[0]], 16, {
        animate: true,
        duration: 1.5,
      })

      // Find and open the popup for this midwife
      const marker = markersRef.current.find((m, index) => midwives[index].id === midwife.id)
      if (marker) {
        marker.openPopup()
        setSelectedMidwife(midwife.id)
      }
    }
  }

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-[2000] flex items-center justify-center">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading midwives map...</span>
          </div>
        </div>
      )}

      {/* Map container */}
      <div ref={mapRef} className={`${className} rounded-lg border shadow-lg relative`} />

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

      {/* Midwives list */}
      {midwives.length > 0 && (
        <Card className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm shadow-lg max-w-xs">
          <div className="p-4">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              🩺 Midwives ({midwives.length})
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {midwives.map((midwife, index) => (
                <button
                  key={midwife.id}
                  onClick={() => flyToMidwife(midwife)}
                  className={`w-full text-left p-2 rounded text-xs hover:bg-gray-100 transition-colors ${
                    selectedMidwife === midwife.id ? "bg-pink-50 border border-pink-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{midwife.name}</div>
                      <div className="text-gray-500 truncate">{midwife.specialty}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600 z-[1000]">
        <div>🖱️ {language === "pl" ? "Przeciągnij aby przesunąć" : "Drag to pan"}</div>
        <div>🔍 {language === "pl" ? "Scroll aby powiększyć" : "Scroll to zoom"}</div>
      </div>

      {/* Custom CSS for popups */}
      <style jsx global>{`
        .custom-midwife-marker {
          background: none !important;
          border: none !important;
        }

        .custom-midwife-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          border: none;
        }

        .custom-midwife-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }

        .custom-midwife-popup .leaflet-popup-tip {
          background: white;
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .leaflet-container {
          border-radius: 12px;
        }
      `}</style>
    </div>
  )
}