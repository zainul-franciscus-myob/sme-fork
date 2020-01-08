import React from 'react';

import styles from './StpNotifyAto.module.css';

const SoftwareDetailView = ({ DetailIcon, heading, detail }) => (
  <div className={styles.imageAndText}>
    <DetailIcon set="lg" />
    <div>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.text}>{detail}</div>
    </div>
  </div>
);

export default SoftwareDetailView;
