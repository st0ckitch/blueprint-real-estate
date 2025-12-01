import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface MapProps {
  height?: string;
  showTokenInput?: boolean;
}

const Map = ({ height = "h-[500px]", showTokenInput = false }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet) return;

    // Initialize map
    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [44.8007, 41.7225], // თემქა coordinates
      zoom: 14,
      pitch: 50,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add marker for office location in თემქა
    new mapboxgl.Marker({ color: 'hsl(var(--primary))' })
      .setLngLat([44.8007, 41.7225])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML('<div class="p-2"><h3 class="font-semibold">ModX Office</h3><p>თემქა, თბილისი</p></div>')
      )
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, token]);

  const handleSetToken = () => {
    if (token.trim()) {
      setIsTokenSet(true);
    }
  };

  if (showTokenInput && !isTokenSet) {
    return (
      <div className={`${height} flex items-center justify-center bg-muted rounded-xl`}>
        <div className="max-w-md w-full px-6">
          <h3 className="text-lg font-semibold mb-2 text-center">Enter Your Mapbox Token</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Get your free public token at{' '}
            <a 
              href="https://mapbox.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="pk.eyJ1..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSetToken}>Load Map</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${height} w-full`}>
      <div ref={mapContainer} className="absolute inset-0 rounded-xl shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-xl" />
    </div>
  );
};

export default Map;
