/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import classNames from 'classnames';

import styles from './NavigationLink.module.css';

/**
 * Navigation.Link
 *
 * @visibleName
 */
const NavigationLink = ({ label, icon, url, disabled, active, onClick }) => {
  const wrapperClasses = classNames(
    'flx-navbar__menu-item',
    styles.customMenuItem,
    {
      active,
      disabled,
    }
  );
  return (
    <li className={wrapperClasses} onClick={onClick}>
      <a className="flx-navbar__menu-link" role="button" href={url}>
        {label} {icon}
      </a>
    </li>
  );
};

export default NavigationLink;
