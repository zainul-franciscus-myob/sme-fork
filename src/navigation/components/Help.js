import { Icons } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './Help.module.css';

const Help = ({ onMenuLinkClick }) => (
  <li className={classNames('flx-navbar__menu-item', styles.help)}>
    <button
      type="button"
      className={classNames('flx-navbar__menu-link', styles.help__button)}
      onClick={onMenuLinkClick}
    >
      <span className={styles.help__text}>Help</span>
      <span className={styles.help__icon}><Icons.Help /></span>
    </button>
  </li>
);

export default Help;
