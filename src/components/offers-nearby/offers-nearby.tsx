import { OfferPreview } from '../../types/offers';
import { PlaceCard } from '../place-card/place-card';

type OffersNearbyProps = {
  offers: OfferPreview[];
};

export function OffersNearby({ offers }: OffersNearbyProps) {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            blockType='near-places'
            size='large'
          />
        ))}
      </div>
    </section>
  );
}
