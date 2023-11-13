
import { Outlet } from 'react-router-dom';
import { HeaderLogo } from '../../components/header/header-logo/header-logo';

export function LoginLayout() {

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <HeaderLogo />
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
