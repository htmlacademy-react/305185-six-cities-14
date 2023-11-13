import { useState } from 'react';
import { OfferPreview } from '../../types/offers';
import { PlaceCard } from '../place-card/place-card';
import Map from '../map/map';
import { CityLocation } from '../../const';

type CitiesProps = {
  offers: OfferPreview[];
};

export function Cities({ offers }: CitiesProps) {
  const [hoveredOfferId, setHoveredOfferId] = useState<
    OfferPreview['id'] | null
  >(null);
  const points = offers.map(({ id, location }) => ({ offerId: id, location }));
  const currentCityLocation = CityLocation.Amsterdam;
  const currentCityName = 'Amsterdam';

  function cardHoverHandler(offerId: OfferPreview['id'] | null) {
    setHoveredOfferId(offerId);
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offers.length} places to stay in {currentCityName}
          </b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li
                className="places__option places__option--active"
                tabIndex={0}
              >
                Popular
              </li>
              <li className="places__option" tabIndex={0}>
                Price: low to high
              </li>
              <li className="places__option" tabIndex={0}>
                Price: high to low
              </li>
              <li className="places__option" tabIndex={0}>
                Top rated first
              </li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
              <PlaceCard
                key={offer.id}
                offer={offer}
                onCardHover={cardHoverHandler}
              />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            points={points}
            location={currentCityLocation}
            selectedPoint={hoveredOfferId}
            className="cities__map"
          />
        </div>
      </div>
    </div>
  );
}
