import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { checkAuth, login } from '../../store/api-actions/user';
import { getUser } from '../../store/slices';
import { AppRoute, AuthorizationStatus, CityMap } from '../../const';

export function LoginPage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { authStatus } = useAppSelector(getUser);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authStatus, navigate]);

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const email = formRef.current?.elements.namedItem(
      'email'
    ) as HTMLInputElement;
    const password = formRef.current?.elements.namedItem(
      'password'
    ) as HTMLInputElement;

    if (email?.value && password?.value) {
      dispatch(login({ email: email.value, password: password.value }));
    }
  }

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            ref={formRef}
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
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
              />
            </div>
            <button className="login__submit form__submit button" type="submit">
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              to={`/${CityMap.Amsterdam.name.toLowerCase()}`}
            >
              <span>Amsterdam</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
