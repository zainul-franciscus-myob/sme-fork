import React from 'react';

import { PreviewType } from '../../templateOptions';
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

const shipToAddress = (
  <div className={styles.addressWithoutWindow}>
    <h5>Ship to</h5>
    <div className={styles['item--italic']}>Elizabeth Smith</div>
    <div className={styles['item--italic']}>A-Z Stationary Supplies</div>
    <div>5-7 Readen Road</div>
    <div>Bondi NSW 2026</div>
    <div>Australia</div>
  </div>
);
const ShippingInfo = ({ previewType, useAddressEnvelopePosition }) => (
  <div className={styles.container}>
    <div>
      {useAddressEnvelopePosition ? addressWithWindow : addressWithoutWindow}
    </div>
    <div>
      {previewType !== PreviewType.Statement && shipToAddress}
    </div>
  </div>
);

export default ShippingInfo;
