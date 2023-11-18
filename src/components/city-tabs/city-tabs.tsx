import { Link } from 'react-router-dom';

import classNames from 'classnames';

import { CityMap } from '../../const';
import { OfferCity } from '../../types/offers';
import { useAppDispatch } from '../../hooks/store';
import { setActiveCity } from '../../store/actions';

type LocationTabsProps = {
  cities: OfferCity[];
  activeCityName?: string;
};

export function CityTabs({
  cities,
  activeCityName = CityMap.Paris.name,
}: LocationTabsProps) {

  const dispatch = useAppDispatch();

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
                  onClick={() => dispatch(setActiveCity(city))}
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
