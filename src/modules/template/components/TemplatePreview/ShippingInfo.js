import React from 'react';

import styles from './ShippingInfo.module.css';

const ShippingInfo = () => (
  <div className={styles.container}>
    <div className={styles.fromAddress}>
      <div className={styles.fromAddress__items}>
        <p className={styles['item--italic']}>John Smith</p>
        <p className={styles['item--italic']}>A-Z Stationary Supplies</p>
        <p>50 Street Name</p>
        <p>Suburb NSW 2000</p>
        <p>Australia</p>
      </div>
    </div>
    <div className={styles.toAddress}>
      <h5>Ship to</h5>
      <p className={styles['item--italic']}>Elizabeth Smith</p>
      <p className={styles['item--italic']}>A-Z Stationary Supplies</p>
      <p>100 Shipping Address</p>
      <p>Suburb NSW 2000</p>
      <p>Australia</p>
    </div>
  </div>
);

export default ShippingInfo;
