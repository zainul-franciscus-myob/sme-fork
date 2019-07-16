import { Tooltip } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import style from './TabItem.module.css';

/* eslint-disable jsx-a11y/anchor-is-valid */
const TabItem = ({
  item, isActive, onSelected,
}) => {
  const onClick = (e) => {
    e.preventDefault();
    onSelected(item.id, e);
  };

  const activeClass = isActive && 'active';

  const tabLink = item.isDisabled
    ? (
      <div className={classnames('flx-tabs__link', style.disabled)} href="">
        {item.label}
      </div>
    )
    : (
      <a className="flx-tabs__link" href="" onClick={onClick}>
        {item.label}
      </a>
    );

  const tabItem = (
    <li className={classnames('flx-tabs__item', activeClass)}>
      {tabLink}
    </li>
  );

  if (item.toolTip) {
    return (
      <Tooltip
        triggerContent={tabItem}
        placement="bottom"
      >
        {item.toolTip}
      </Tooltip>
    );
  }

  return tabItem;
};

TabItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool,
  onSelected: PropTypes.func.isRequired,
};

TabItem.defaultProps = {
  isActive: false,
};

export default TabItem;
