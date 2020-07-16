import React, { useEffect, useState } from 'react';

import Tabs from '../../../components/Tabs/Tabs';
import styles from './TabsWithIcon.module.css';

const useWindowWidth = () => {
  const [width, setWidth] = useState(0);

  const onResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    onResize();

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return width;
};

const useMediaQuery = ({ minWidth }) => {
  const width = useWindowWidth();

  return width >= minWidth;
};

const TabsWithIcon = ({ items, selected, onSelected, icon }) => {
  // 768px and below, `Tabs` component renders a `<Select />`
  const isTabs = useMediaQuery({ minWidth: 768 });

  const iconId = 'ICON_ID';

  const newOnSelected = (id) => {
    if (id === iconId) {
      return;
    }

    onSelected(id);
  };

  const responsiveItems = isTabs
    ? [
        ...items,
        {
          id: iconId,
          label: icon,
        },
      ]
    : items;

  return (
    <div className={styles.tabsWithIcon}>
      <Tabs
        items={responsiveItems}
        selected={selected}
        onSelected={newOnSelected}
      />
    </div>
  );
};

export default TabsWithIcon;
