import { NextResponse } from 'next/server';
import { generateSVG, Bounds, MapStyle, OSMElement } from '@/app/lib/svgGenerator';

export async function POST(req: Request) {
  try {
    const { bounds, style } = await req.json() as { bounds: Bounds, style: MapStyle };
    let queryBounds = bounds;

    // Auto-scale to 1.5km sq to prevent timeouts
    const latDiff = bounds.north - bounds.south;
    const lngDiff = bounds.east - bounds.west;
    if (latDiff > 0.015 || lngDiff > 0.015) {
      const cLat = (bounds.south + bounds.north) / 2;
      const cLng = (bounds.west + bounds.east) / 2;
      const off = 0.0075;
      queryBounds = { south: cLat - off, west: cLng - off, north: cLat + off, east: cLng + off };
    }

    const query = `
      [out:json][timeout:25];
      (
        way["building"](${queryBounds.south},${queryBounds.west},${queryBounds.north},${queryBounds.east});
        way["highway"](${queryBounds.south},${queryBounds.west},${queryBounds.north},${queryBounds.east});
        way["waterway"](${queryBounds.south},${queryBounds.west},${queryBounds.north},${queryBounds.east});
        way["natural"="water"](${queryBounds.south},${queryBounds.west},${queryBounds.north},${queryBounds.east});
        way["leisure"="park"](${queryBounds.south},${queryBounds.west},${queryBounds.north},${queryBounds.east});
      );
      out geom;
    `;

    const servers = ["https://overpass.kumi.systems/api/interpreter", "https://overpass-api.de/api/interpreter"];
    let elements: OSMElement[] = [];
    let fetched = false;

    for (const server of servers) {
      try {
        const res = await fetch(server, { method: "POST", body: query });
        if (res.ok) {
          elements = (await res.json()).elements || [];
          fetched = true;
          break;
        }
      } catch (e) { /* try next */ }
    }

    if (!fetched || elements.length === 0) return NextResponse.json({ error: "No data found in this area." }, { status: 400 });

    const svg = generateSVG(elements, queryBounds, style);
    return NextResponse.json({ svg });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}