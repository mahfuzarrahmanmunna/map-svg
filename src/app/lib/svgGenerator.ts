export interface Bounds {
  south: number; west: number; north: number; east: number;
}

export interface MapStyle {
  bg: string; buildings: string; roads: string; water: string; land: string;
}

export interface OSMElement {
  type: string;
  tags?: Record<string, string>;
  geometry?: { lat: number; lon: number }[];
}

export function generateSVG(elements: OSMElement[], bounds: Bounds, style: MapStyle): string {
  const width = 3000;
  const height = 2200;

  const project = (lat: number, lng: number) => {
    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * width;
    const y = (1 - ((lat - bounds.south) / (bounds.north - bounds.south))) * height;
    return { x, y };
  };

  let buildings = "", roads = "", water = "", parks = "";

  for (const element of elements) {
    if (!element.geometry) continue;
    const tags = element.tags || {};

    if (tags.building) {
      const points = element.geometry.map(p => project(p.lat, p.lon));
      const dx = 7, dy = 13;
      let walls = "";
      for (let i = 0; i < points.length; i++) {
        const a = points[i], b = points[(i + 1) % points.length];
        walls += `<polygon points="${a.x},${a.y} ${b.x},${b.y} ${b.x + dx},${b.y + dy} ${a.x + dx},${a.y + dy}" fill="${style.buildings}80" />`;
      }
      const top = points.map(p => `${p.x},${p.y}`).join(" ");
      buildings += walls + `<polygon points="${top}" fill="${style.buildings}" stroke="${style.buildings}" stroke-width="0.65" />`;
      continue;
    }

    if (tags.highway) {
      const path = element.geometry.map((p, i) => `${i === 0 ? 'M' : 'L'} ${project(p.lat, p.lon).x.toFixed(2)} ${project(p.lat, p.lon).y.toFixed(2)}`).join(" ");
      roads += `<path d="${path}" fill="none" stroke="${style.roads}" stroke-width="4" stroke-linecap="round" />`;
      continue;
    }

    if (tags.waterway || tags.natural === "water") {
      const poly = element.geometry.map(p => `${project(p.lat, p.lon).x},${project(p.lat, p.lon).y}`).join(" ");
      water += `<polygon points="${poly}" fill="${style.water}" />`;
      continue;
    }

    if (tags.leisure === "park" || tags.landuse === "grass" || tags.landuse === "forest") {
      const poly = element.geometry.map(p => `${project(p.lat, p.lon).x},${project(p.lat, p.lon).y}`).join(" ");
      parks += `<polygon points="${poly}" fill="${style.land}" />`;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${style.bg}" />
  <g id="parks">${parks}</g>
  <g id="water">${water}</g>
  <g id="roads">${roads}</g>
  <g id="buildings">${buildings}</g>
</svg>`;
}