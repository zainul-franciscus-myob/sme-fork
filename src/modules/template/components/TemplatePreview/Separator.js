import React from 'react';

import styles from './Separator.module.css';

const Separator = ({ featureColour }) => (
  <div
    className={styles.separator}
    style={{ backgroundColor: featureColour }}
  />
);

export default Separator;
