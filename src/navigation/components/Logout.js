import { SignOutIcon } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './Logout.module.css';

const Logout = ({ onMenuLinkClick }) => (
  <div className={classNames(styles.menu)}>
    <li className="flx-navbar__menu-item">
      <button
        type="button"
        className="flx-navbar__menu-link"
        onClick={onMenuLinkClick}
      >
        Log out <SignOutIcon />
      </button>
    </li>
  </div>
);

export default Logout;
