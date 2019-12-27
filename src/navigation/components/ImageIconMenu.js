import { Navigation, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import styles from './ImageIconMenu.module.css';

const IconTooltip = ({ image, tooltip }) => (
  <Tooltip
    triggerContent={(
      <img src={image} alt={tooltip} />
    )}
    placement="bottom"
    className={styles.icon}
  >
    {tooltip}
  </Tooltip>
);

const getMenu = ({
  image,
  tooltip,
  items = [],
  onSelect,
}) => {
  if (!items.length) {
    return (
      <li className="flx-navbar__menu-item">
        <button type="button" className="flx-navbar__menu-link" onClick={onSelect}>
          <IconTooltip tooltip={tooltip} image={image} />
        </button>
      </li>
    );
  }

  return (
    <Navigation.Menu
      label={(
        <IconTooltip tooltip={tooltip} image={image} />
      )}
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
