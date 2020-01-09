import { Icons, ToggleContent } from '@myob/myob-widgets';
import React from 'react';

import styles from './Collapsible.module.css';

const Collapsible = ({ title, content, visible }) => (
  <ToggleContent
    className={styles.collapsible}
    visible={visible}
    renderContent={({ show, toggle }) => (
      <button
        onClick={toggle}
        className={styles.collapsible__button}
        type="button"
      >
        <span className={styles.collapsible__header}>{title}</span>
        {show ? <Icons.DownChevron /> : <Icons.RightChevron />}
      </button>
    )}
  >
    <div className={styles.collapsible__content}>
      {content}
    </div>
  </ToggleContent>
);

export default Collapsible;
