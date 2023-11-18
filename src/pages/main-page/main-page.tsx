import { useEffect } from 'react';

import { Cities } from '../../components/cities/cities';
import { CityMap } from '../../const';
import { CityTabs } from '../../components/city-tabs/city-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchOffers, setActiveCity } from '../../store/actions';
import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/common';

const cities = Object.values(CityMap);

export function MainPage() {
  const { cityName } = useParams();
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.activeCity);
  const offersByCity = offers.filter(
    (offer) => offer.city.name === activeCity?.name
  );

  useEffect(() => {
    dispatch(fetchOffers());
    if (cityName) {
      const capitalizedCityName = capitalizeFirstLetter(cityName);
      dispatch(setActiveCity(CityMap[capitalizedCityName]));
    }
  }, [cityName, dispatch]);

  if (!offers) {
    return 'Loading...';
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CityTabs cities={cities} activeCityName={activeCity.name} />
      <Cities offers={offersByCity} city={activeCity} />
    </main>
  );
}
