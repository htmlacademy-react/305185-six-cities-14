import { useRef, useEffect } from 'react';

import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { useMap } from '../../hooks/use-map';
import { OfferLocation, OfferPreview } from '../../types/offers';
import { MapPoint } from '../../types/map';

type MapProps = {
  location: OfferLocation;
  points: MapPoint[];
  selectedPoint: OfferPreview['id'] | null;
  className?: string;
};

const defaultIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
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

export default Map;
