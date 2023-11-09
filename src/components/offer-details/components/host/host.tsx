import classNames from 'classnames';
import { Offer } from '../../../../types/offers';

type HostProps = {
  host: Offer['host'];
  description: Offer['description'];
};

export function Host({ host, description }: HostProps): JSX.Element {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div
          className={classNames(
            'offer__avatar-wrapper',
            'user__avatar-wrapper',
            { 'offer__avatar-wrapper--pro': host.isPro }
          )}
        >
          <img
            className="offer__avatar user__avatar"
            src="img/avatar-angelina.jpg"
            width="74"
            height="74"
            alt="Host avatar"
          />
        </div>
        <span className="offer__user-name">{host.name}</span>
        {host.isPro && <span className="offer__user-status">Pro</span>}
      </div>
      <div className="offer__description">
        <p className="offer__text">{description}</p>
      </div>
    </div>
  );
}
