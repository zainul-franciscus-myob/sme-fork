import { Navigation } from '@myob/myob-widgets';
import React from 'react';

import styles from './ImageIconMenu.module.css';

const getMenu = ({
  image,
  items = [],
  onSelect,
}) => {
  if (!items.length) {
    return (
      <li className="flx-navbar__menu-item">
        <button type="button" className="flx-navbar__menu-link" onClick={onSelect}>
          <img className={styles.icon} src={image} alt="" />
        </button>
      </li>
    );
  }

  return (
    <Navigation.Menu
      label={<img className={styles.icon} src={image} alt="" />}
      onSelect={onSelect}
      items={items}
    />
  );
};

const ImageIconMenu = props => (
  <div className={styles.menu}>
    { getMenu(props)}
  </div>
);

export default ImageIconMenu;
