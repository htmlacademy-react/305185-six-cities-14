import PlaceCard from '../../components/place-card/place-card';
import { Offer } from '../../types/offers';

type FavoritesPageProps = {
  offers: Offer[];
}

function FavoritesPage({ offers }: FavoritesPageProps) {
  // normalizes offers by city key
  const getOffersByCityKey = (favOffers: Offer[]) => {
    const offersByCityKey: Record<string, Offer[]> = {};

    favOffers.forEach((favorite) => {
      const { city } = favorite;
      offersByCityKey[city.name] = offersByCityKey[city.name] || [];
      offersByCityKey[city.name].push(favorite);
    });

    // and sorts them alphabetically
    const sortedKeys = Object.keys(offersByCityKey).sort();
    const sortedOffersByCityKey: Record<string, Offer[]> = {};
    sortedKeys.forEach((key) => {
      sortedOffersByCityKey[key] = offersByCityKey[key];
    });

    return sortedOffersByCityKey;
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(getOffersByCityKey(offers)).map(([city, cityOffers]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <PlaceCard
                        key={offer.id}
                        offer={offer}
                        size='small'
                        blockType='favorites'
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
