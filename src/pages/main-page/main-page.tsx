import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Cities } from '../../components/cities/cities';
import { AppRoute, CityMap, RequestStatus } from '../../const';
import { CityTabs } from '../../components/city-tabs/city-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { getOffers } from '../../store/slices/offers-data/selectors';
import { fetchOffers } from '../../store/api-actions/offers';
import { OfferCity } from '../../types/offers';
import { capitalizeFirstLetter } from '../../utils/common';
import { Spinner } from '../../components/shared/spinner/spinner';
import { MainPageEmpty } from './components/main-page-empty.tsx/main-page-empty';
import classNames from 'classnames';

const cities = Object.values(CityMap);

export function MainPage() {
  const { cityName = CityMap.Paris.name } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: offers, status } = useAppSelector(getOffers);
  const [activeCity, setActiveCity] = useState(
    CityMap[capitalizeFirstLetter(cityName)]
  );
  const activeCityName = activeCity?.name;
  const offersByCity = useMemo(
    () => offers.filter((offer) => offer.city.name === activeCity?.name),
    [offers, activeCity]
  );
  const hasOffers = Boolean(offersByCity.length);
  const isLoading = status === RequestStatus.Pending;

  useEffect(() => {
    dispatch(fetchOffers());
  }, [cityName, dispatch]);

  function handleCityChange(city: OfferCity) {
    setActiveCity(city);
  }

  // if city name is not valid, redirect to root
  useEffect(() => {
    if (cityName && !CityMap[capitalizeFirstLetter(cityName)]) {
      navigate(AppRoute.NotFound, { replace: true });
    } else {
      setActiveCity(CityMap[capitalizeFirstLetter(cityName)]);
    }
  }, [cityName, navigate]);

  return (
    <main
      className={classNames('page__main page__main--index', {
        'page__main--index-empty': !hasOffers,
      })}
    >
      <h1 className="visually-hidden">Cities</h1>
      <CityTabs
        cities={cities}
        activeCityName={activeCityName}
        onChange={handleCityChange}
      />
      {isLoading && <Spinner />}
      {!isLoading && hasOffers && (
        <Cities offers={offersByCity} city={activeCity} />
      )}
      {!isLoading && !hasOffers && <MainPageEmpty cityName={cityName} />}
    </main>
  );
}
