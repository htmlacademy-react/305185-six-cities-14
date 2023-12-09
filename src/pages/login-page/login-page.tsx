import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { login } from '../../store/api-actions/user';
import { getUser } from '../../store/slices';
import {
  AppRoute,
  AuthorizationStatus,
  CityMap,
  RequestStatus,
} from '../../const';
import { City } from './components/city/city';

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.([0-9]{1,3}|[a-zA-Z]{2})\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/;

export function LoginPage() {
  const randomCity = useMemo(
    () =>
      Object.values(CityMap)[
        Math.floor(Math.random() * Object.values(CityMap).length)
      ],
    []
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authStatus, status } = useAppSelector(getUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = Boolean(
    email &&
      password &&
      PASSWORD_PATTERN.test(password) &&
      EMAIL_PATTERN.test(email)
  );

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authStatus, navigate]);

  const handleEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!isValid) {
      return;
    }

    dispatch(login({ email, password }));
  }

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleFormSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
              disabled={!isValid || status === RequestStatus.Pending}
            >
              Sign in
            </button>
          </form>
        </section>
        <City cityName={randomCity.name} />
      </div>
    </main>
  );
}
