"use client";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import CSS directly here
import "leaflet-draw/dist/leaflet.draw.css";

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapViewProps {
  onBoundsChange: (bounds: any) => void;
  isDark: boolean;
}

const MapView = forwardRef<any, MapViewProps>(({ onBoundsChange, isDark }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  useImperativeHandle(ref, () => ({
    flyTo: (lat: number, lng: number, zoom: number = 14) => {
      if (mapRef.current) {
        mapRef.current.flyTo([lat, lng], zoom, { duration: 1.5 });
      }
    }
  }));

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    
    const map = L.map(containerRef.current, { 
      center: [40.7128, -74.0060], 
      zoom: 13, 
      zoomControl: true 
    });
    mapRef.current = map;

    // Use OSM France - The most reliable server (Max Zoom 20)
    tileLayerRef.current = L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap France'
    }).addTo(map);

    drawnItemsRef.current = new L.FeatureGroup();
    map.addLayer(drawnItemsRef.current);

    import("leaflet-draw").then(() => {
      if (!mapRef.current) return;
      const drawControl = new (L as any).Control.Draw({
        position: "topright",
        draw: { 
          polygon: false, polyline: false, circle: false, marker: false, circlemarker: false, 
          rectangle: { 
            shapeOptions: { color: "#06b6d4", weight: 2, fillOpacity: 0.1 } 
          } 
        },
        edit: { featureGroup: drawnItemsRef.current }
      });
      mapRef.current.addControl(drawControl);

      mapRef.current.on((L as any).Draw.Event.CREATED, (e: any) => {
        drawnItemsRef.current?.clearLayers();
        drawnItemsRef.current?.addLayer(e.layer);
        onBoundsChange(e.layer.getBounds());
      });
    });

    // Fix map size after dynamic import
    setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 500);

  }, [onBoundsChange]);

  useEffect(() => {
    if (!mapRef.current) return;
    const container = mapRef.current.getContainer();
    if (isDark) {
      container.classList.add("dark-map-filter");
    } else {
      container.classList.remove("dark-map-filter");
    }
  }, [isDark]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" />;
});

MapView.displayName = "MapView";
export default MapView;