import React from 'react';

import styles from './ShippingInfo.module.css';

const addressWithWindow = (
  <div className={styles.addressWithWindow}>
    <div className={styles.addressWithWindowItems}>
      <div className={styles['item--italic']}>John Smith</div>
      <div className={styles['item--italic']}>A-Z Stationary Supplies</div>
      <div>50 Street Name</div>
      <div>Suburb NSW 2000</div>
      <div>Australia</div>
    </div>
  </div>
);

const addressWithoutWindow = (
  <div className={styles.addressWithoutWindow}>
    <h5>Bill to</h5>
    <div className={styles['item--italic']}>John Smith</div>
    <div className={styles['item--italic']}>A-Z Stationary Supplies</div>
    <div>5-7 Readen Road</div>
    <div>Bondi NSW 2026</div>
    <div>Australia</div>
  </div>
);

const ShippingInfo = ({ useAddressEnvelopePosition }) => (
  <div className={styles.container}>
    {useAddressEnvelopePosition ? addressWithWindow : addressWithoutWindow}
    <div className={styles.addressWithoutWindow}>
      <h5>Ship to</h5>
      <div className={styles['item--italic']}>Elizabeth Smith</div>
      <div className={styles['item--italic']}>A-Z Stationary Supplies</div>
      <div>5-7 Readen Road</div>
      <div>Bondi NSW 2026</div>
      <div>Australia</div>
    </div>
  </div>
);

export default ShippingInfo;
