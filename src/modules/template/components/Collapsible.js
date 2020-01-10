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
        className={styles.collapsibleButton}
        type="button"
      >
        <span className={styles.collapsibleHeader}>{title}</span>
        {show ? <Icons.DownChevron /> : <Icons.RightChevron />}
      </button>
    )}
  >
    <div className={styles.collapsibleContent}>
      {content}
    </div>
  </ToggleContent>
);

export default Collapsible;
