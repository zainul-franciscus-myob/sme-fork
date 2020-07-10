import React from 'react';

import { PreviewType } from '../../templateOptions';
import styles from './ShippingInfo.module.css';

const addressWithWindow = (
  <div className={styles.addressWithWindow}>
    <div className={styles.addressWithWindowItems}>
      <div className={styles['item--italic']}>Customer name</div>
      <div>1 Example St</div>
      <div>Suburb State 1234</div>
      <div>Country</div>
    </div>
  </div>
);

const addressWithoutWindow = (
  <div className={styles.addressWithoutWindow}>
    <h5>Bill to</h5>
    <div className={styles['item--italic']}>Customer name</div>
    <div>1 Example St</div>
    <div>Suburb State 1234</div>
    <div>Country</div>
  </div>
);

const shipToAddress = (
  <div className={styles.addressWithoutWindow}>
    <h5>Ship to</h5>
    <div className={styles['item--italic']}>Customer name</div>
    <div>1 Example St</div>
    <div>Suburb State 1234</div>
    <div>Country</div>
  </div>
);
const ShippingInfo = ({ previewType, useAddressEnvelopePosition }) => (
  <div className={styles.container}>
    <div>
      {useAddressEnvelopePosition ? addressWithWindow : addressWithoutWindow}
    </div>
    <div>{previewType !== PreviewType.Statement && shipToAddress}</div>
  </div>
);

export default ShippingInfo;
