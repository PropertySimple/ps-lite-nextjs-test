import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

/**
 * Mapbox Static API Proxy
 * Prevents exposing Mapbox token in client bundle
 * Allows server-side error handling and rate limiting
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');
  const zoom = searchParams.get('zoom') || '13';
  const width = searchParams.get('width') || '800';
  const height = searchParams.get('height') || '600';

  if (!lng || !lat) {
    return NextResponse.json(
      { error: 'Missing required parameters: lng and lat' },
      { status: 400 }
    );
  }

  // Validate coordinates
  const longitude = parseFloat(lng);
  const latitude = parseFloat(lat);

  if (isNaN(longitude) || isNaN(latitude)) {
    return NextResponse.json(
      { error: 'Invalid coordinates' },
      { status: 400 }
    );
  }

  if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
    return NextResponse.json(
      { error: 'Coordinates out of range' },
      { status: 400 }
    );
  }

  try {
    // Get Mapbox token from environment variable
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.MAPBOX_TOKEN;

    if (!mapboxToken) {
      logger.error('MAPBOX_TOKEN not configured');
      return NextResponse.json(
        { error: 'Map service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Build Mapbox Static API URL
    const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l-home+D2691E(${longitude},${latitude})/${longitude},${latitude},${zoom},0/${width}x${height}@2x?access_token=${mapboxToken}`;

    // Fetch map image from Mapbox
    const mapResponse = await fetch(mapboxUrl, {
      // Cache for 1 week (maps don't change often)
      next: { revalidate: 604800 },
    });

    if (!mapResponse.ok) {
      logger.error('Mapbox API error:', mapResponse.status, await mapResponse.text());
      return NextResponse.json(
        { error: 'Failed to fetch map' },
        { status: mapResponse.status }
      );
    }

    // Get image data
    const imageBuffer = await mapResponse.arrayBuffer();

    // Return image with appropriate headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800, immutable', // 1 week
      },
    });
  } catch (error) {
    logger.error('Map proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
