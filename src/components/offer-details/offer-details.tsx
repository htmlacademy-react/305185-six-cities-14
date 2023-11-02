import { Offer } from '../../types/offers';
import { capitalizeFirstLetter } from '../../utils/common';
import { getRatingInPercent } from '../../utils/offers';
import Gallery from './components/gallery/gallery';
import Features from './components/features/features';
import Goods from './components/goods/goods';
import Host from './components/host/host';
import Reviews from './components/reviews/reviews';

type OfferDetailsProps = {
  offer: Offer;
};

function OfferDetails({ offer }: OfferDetailsProps) {
  const {
    isPremium,
    images,
    price,
    rating,
    title,
    type,
    bedrooms,
    maxAdults,
    goods,
    host,
    description,
  } = offer;
  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <Gallery imageUrls={images} />
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{title}</h1>
            <button className="offer__bookmark-button button" type="button">
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: getRatingInPercent(rating) }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>
          <Features type={capitalizeFirstLetter(type)} bedrooms={bedrooms} maxAdults={maxAdults} />
          <div className="offer__price">
            <b className="offer__price-value">&euro;{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <Goods goods={goods} />
          <Host host={host} description={description} />
          <Reviews />
        </div>
      </div>
      <section className="offer__map map"></section>
    </section>
  );
}

export default OfferDetails;
