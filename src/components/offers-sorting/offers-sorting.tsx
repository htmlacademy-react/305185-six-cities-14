import { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { SortTypeMap } from '../../const';

type OffersSortingProps = {
  onSelect: (value: keyof typeof SortTypeMap) => void;
  activeValue: (typeof SortTypeMap)[keyof typeof SortTypeMap]['key'];
};

export function OffersSorting({ activeValue, onSelect }: OffersSortingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  function onToggle() {
    setIsOpen((prevState) => !prevState);
  }

  const handleSelect = useCallback(
    (value: keyof typeof SortTypeMap) => {
      onSelect(value);
      onToggle();
    },
    [onSelect]
  );

  const handleKeyDownSelect = useCallback(
    (evt: React.KeyboardEvent<HTMLSpanElement>, callback: () => void) => {
      if (evt.key === 'Enter' && isOpen) {
        callback();
      }
    },
    [isOpen]
  );

  const handleKeyDownClose = useCallback(
    (evt: React.KeyboardEvent<HTMLSpanElement>) => {
      if (evt.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  function handleClickOutside(evt: MouseEvent) {
    if (ref.current && !ref.current.contains(evt.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form
      ref={ref}
      className="places__sorting"
      action="#"
      method="get"
      onKeyDown={handleKeyDownClose}
    >
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span className="places__sorting-type" tabIndex={0} onClick={onToggle}>
        {SortTypeMap[activeValue].label}{' '}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames('places__options places__options--custom', {
          'places__options--opened': isOpen,
        })}
      >
        {Object.values(SortTypeMap).map(({ label, key }) => (
          <li
            key={key}
            className={classNames('places__option', {
              'places__option--active': key === activeValue,
            })}
            tabIndex={0}
            onClick={() => handleSelect(key)}
            onKeyDown={(evt) =>
              handleKeyDownSelect(evt, () => handleSelect(key))}
          >
            {label}
          </li>
        ))}
      </ul>
    </form>
  );
}
