import { Button } from '@myob/myob-widgets';
import React from 'react';

import styles from './MatchedRowItem.module.css';

const MatchedRowItem = ({ entry, onClick }) => (
  <div className={styles.matchInfo}>
    <Button type="link" onClick={onClick}>
      {entry.allocateOrMatch}
    </Button>
  </div>
);

export default MatchedRowItem;
