import React from 'react';
import classNames from 'classnames';

/**
 * Navigation.Link
 *
 * @visibleName
 */
const NavigationLink = ({
  label, icon, url, disabled, active, onClick,
}) => {
  const wrapperClasses = classNames('flx-navbar__menu-item', {
    active,
    disabled,
  });
  return (
    <li className={wrapperClasses} onClick={onClick}>
      <a className="flx-navbar__menu-link" role="button" href={url}>
        {label} {icon}
      </a>
    </li>
  );
};

export default NavigationLink;
