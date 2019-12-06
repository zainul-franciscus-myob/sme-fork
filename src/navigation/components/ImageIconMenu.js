import { Navigation, Tooltip } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './ImageIconMenu.module.css';

const IconTooltip = ({ tooltip, children }) => (
  <Tooltip
    triggerContent={children}
    placement="bottom"
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
      <li className={classNames('flx-navbar__menu-item', styles.menuItem)}>
        <IconTooltip tooltip={tooltip}>
          <button type="button" className="flx-navbar__menu-link" onClick={onSelect}>
            <img className={styles.icon} src={image} alt={tooltip} />
          </button>
        </IconTooltip>
      </li>
    );
  }

  return (
    <Navigation.Menu
      label={(
        <IconTooltip tooltip={tooltip}>
          <img className={styles.icon} src={image} alt={tooltip} />
        </IconTooltip>
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
