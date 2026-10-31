"use client";
import { useState, useCallback, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import StudioPanel from "./components/StudioPanel";
import Sidebar from "./components/Sidebar";

const MapView = dynamic(() => import("./components/MapView"), { ssr: false });

export default function StudioDashboard() {
  const mapRef = useRef<any>(null);
  
  const [bounds, setBounds] = useState<any>(null);
  const [status, setStatus] = useState("Draw a rectangle around the area you want to export.");
  const [isExporting, setIsExporting] = useState(false);
  const [template, setTemplate] = useState("Dark Mode");

  const [styleConfig, setStyleConfig] = useState({
    bg: "#0f172a",
    buildings: "#1e293b",
    roads: "#334155",
    water: "#0c4a6e",
    land: "#14532d"
  });

  const applyTemplate = useCallback((tpl: string) => {
    setTemplate(tpl);
    if (tpl === "Dark Mode") {
      setStyleConfig({ bg: "#0f172a", buildings: "#1e293b", roads: "#334155", water: "#0c4a6e", land: "#14532d" });
    } else if (tpl === "Light Mode") {
      setStyleConfig({ bg: "#ffffff", buildings: "#f3f4f6", roads: "#e5e7eb", water: "#bfdbfe", land: "#d1fae5" });
    } else if (tpl === "Blueprint") {
      setStyleConfig({ bg: "#0b1f3a", buildings: "#1e3a8a", roads: "#3b82f6", water: "#1e40af", land: "#1e3a8a" });
    }
  }, []);

  const isDarkMode = styleConfig.bg !== "#ffffff";

  const handleBoundsChange = useCallback((b: any) => {
    setBounds(b);
    setStatus("Area selected. Ready to generate.");
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) return;
    setStatus("Searching location...");
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`);
      const data = await res.json();
      
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        if (mapRef.current) mapRef.current.flyTo(lat, lng, 14);
        setStatus("Location found. Draw your export area.");
      } else {
        setStatus("Location not found.");
      }
    } catch (e) {
      setStatus("Search failed.");
    }
  }, []);

  const handleExport = useCallback(async () => {
    if (!bounds) { 
      setStatus("Please draw a rectangle first."); 
      return; 
    }

    setIsExporting(true);
    setStatus("Fetching live map data & generating SVG...");

    try {
      const payload = {
        south: bounds.getSouth(), west: bounds.getWest(),
        north: bounds.getNorth(), east: bounds.getEast()
      };

      const res = await fetch("/api/generate-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bounds: payload, style: styleConfig }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const blob = new Blob([data.svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cartographix-${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus("✓ SVG downloaded successfully.");
    } catch (error: any) {
      setStatus(error.message);
    } finally {
      setIsExporting(false);
    }
  }, [bounds, styleConfig]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex min-w-0">
        <div className="flex-1 h-full relative bg-slate-900">
          <MapView 
            ref={mapRef} 
            onBoundsChange={handleBoundsChange} 
            isDark={isDarkMode}
          />
        </div>
        <StudioPanel
          status={status}
          onSearch={handleSearch}
          onExport={handleExport}
          isExporting={isExporting}
          styleConfig={styleConfig}
          setStyleConfig={setStyleConfig}
          setTemplate={applyTemplate}
        />
      </div>
    </div>
  );
}