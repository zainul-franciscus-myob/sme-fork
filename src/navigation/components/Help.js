import { Icons } from '@myob/myob-widgets';
import React from 'react';

const Help = ({ onMenuLinkClick }) => (
  <li className="flx-navbar__menu-item">
    <button
      type="button"
      className="flx-navbar__menu-link"
      onClick={onMenuLinkClick}
      style={{
        'border-left': 'none',
        'border-right': 'none',
        'border-top': 'none',
      }}
    >
      <Icons.Help />
    </button>
  </li>
);

export default Help;
