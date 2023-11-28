import { useEffect, useMemo, useState } from 'react';

import { Cities } from '../../components/cities/cities';
import { AppRoute, CityMap } from '../../const';
import { CityTabs } from '../../components/city-tabs/city-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { Navigate, useParams } from 'react-router-dom';
import { getOffers } from '../../store/slices/offers-data/selectors';
import { fetchOffers } from '../../store/api-actions/offers';
import { OfferCity } from '../../types/offers';
import { capitalizeFirstLetter } from '../../utils/common';
import { Spinner } from '../../components/shared/spinner/spinner';

const cities = Object.values(CityMap);

export function MainPage() {
  const { cityName = CityMap.Paris.name } = useParams();
  const dispatch = useAppDispatch();
  const { data: offers, loading } = useAppSelector(getOffers);
  const [activeCity, setActiveCity] = useState(
    CityMap[capitalizeFirstLetter(cityName)]
  );
  const activeCityName = activeCity?.name;
  const offersByCity = useMemo(
    () => offers.filter((offer) => offer.city.name === activeCity?.name),
    [offers, activeCity]
  );

  useEffect(() => {
    dispatch(fetchOffers());
  }, [cityName, dispatch]);

  function onCityChangeHandler(city: OfferCity) {
    setActiveCity(city);
  }

  if (cityName && !CityMap[capitalizeFirstLetter(cityName)]) {
    return <Navigate to={AppRoute.Root} />;
  }


  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CityTabs
        cities={cities}
        activeCityName={activeCityName}
        onChange={onCityChangeHandler}
      />
      {loading && <Spinner />}
      {(!loading && offersByCity && <Cities offers={offersByCity} city={activeCity} />)}
    </main>
  );
}
