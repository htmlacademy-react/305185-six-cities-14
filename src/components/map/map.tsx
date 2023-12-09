import { useRef, useEffect } from 'react';

import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { MAP_MARKER_URL } from '../../const';
import { useMap } from '../../hooks/use-map';
import { OfferLocation, OfferPreview } from '../../types/offers';
import { MapPoint } from '../../types/map';

type MapProps = {
  location: OfferLocation;
  points: MapPoint[];
  selectedPoint?: OfferPreview['id'] | null;
  className?: string;
};

const defaultIcon = new Icon({
  iconUrl: MAP_MARKER_URL.Default,
  iconSize: [28, 40],
  iconAnchor: [14, 20],
});

const currentIcon = new Icon({
  iconUrl: MAP_MARKER_URL.Current,
  iconSize: [28, 40],
  iconAnchor: [14, 20]
});

export function Map({ location, points, selectedPoint, className }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [map, location]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint && point.offerId === selectedPoint
              ? currentIcon
              : defaultIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <section className={`map ${className}`} ref={mapRef}></section>;
}
