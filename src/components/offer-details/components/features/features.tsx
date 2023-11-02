import { Offer } from '../../../../types/offers';

type FeaturesProps = {
  type: Offer['type'];
  bedrooms: Offer['bedrooms'];
  maxAdults: Offer['maxAdults'];
};

function Features({ type, bedrooms, maxAdults }: FeaturesProps): JSX.Element {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {type}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedrooms} Bedrooms
      </li>
      <li className="offer__feature offer__feature--adults">
        Max {maxAdults} adults
      </li>
    </ul>
  );
}

export default Features;
