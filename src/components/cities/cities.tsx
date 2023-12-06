import { useCallback, useMemo, useState } from 'react';

import { OfferCity, OfferPreview } from '../../types/offers';
import { PlaceCard } from '../place-card/place-card';
import { Map } from '../map/map';
import { OffersSorting } from '../offers-sorting/offers-sorting';
import { SortTypeMap } from '../../const';
import { sortOffers } from '../../utils/offers';

type CitiesProps = {
  offers: OfferPreview[];
  city: OfferCity;
};

export function Cities({ offers, city }: CitiesProps) {
  const [hoveredOfferId, setHoveredOfferId] = useState<
    OfferPreview['id'] | null
  >(null);
  const [selectedSorting, setSelectedSorting] = useState<
    keyof typeof SortTypeMap
  >(SortTypeMap.Popular.key);
  const sortedOffers = useMemo(
    () => sortOffers[selectedSorting](offers),
    [offers, selectedSorting]
  );
  const points = offers.map(({ id, location }) => ({ offerId: id, location }));
  const { name: cityName, location: cityLocation } = city;

  const handleCardHover = useCallback((offerId: OfferPreview['id'] | null) => {
    setHoveredOfferId(offerId);
  }, []);

  function handleSortSelect(value: keyof typeof SortTypeMap) {
    setSelectedSorting(value);
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offers.length} places to stay in {cityName}
          </b>
          <OffersSorting
            onSelect={handleSortSelect}
            activeValue={selectedSorting}
          />
          <div className="cities__places-list places__list tabs__content">
            {sortedOffers.map((offer) => (
              <PlaceCard
                key={offer.id}
                offer={offer}
                onCardHover={handleCardHover}
              />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            points={points}
            location={cityLocation}
            selectedPoint={hoveredOfferId}
            className="cities__map"
          />
        </div>
      </div>
    </div>
  );
}
