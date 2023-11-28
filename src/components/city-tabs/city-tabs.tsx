import { Link } from 'react-router-dom';

import classNames from 'classnames';

import { CityMap } from '../../const';
import { OfferCity } from '../../types/offers';

type LocationTabsProps = {
  cities: OfferCity[];
  activeCityName?: string;
  onChange: (city: OfferCity) => void;
};

export function CityTabs({
  cities,
  activeCityName = CityMap.Paris.name,
  onChange,
}: LocationTabsProps) {

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city: OfferCity) => {
            const { name } = city;
            return (
              <li className="locations__item" key={name}>
                <Link
                  className={classNames('locations__item-link tabs__item', {
                    'tabs__item--active': name === activeCityName,
                  })}
                  to={name.toLowerCase()}
                  onClick={() => onChange(city)}
                >
                  <span>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
