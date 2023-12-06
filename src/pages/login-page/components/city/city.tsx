import { Link } from 'react-router-dom';

type CityProps = {
  cityName: string;
};

export function City({ cityName }: CityProps) {
  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          className="locations__item-link"
          to={`/${cityName.toLowerCase()}`}
        >
          <span>{cityName}</span>
        </Link>
      </div>
    </section>
  );
}
