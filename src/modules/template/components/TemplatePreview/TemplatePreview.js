import React from 'react';

import DocumentInfo from './DocumentInfo';
import ShippingInfo from './ShippingInfo';
import styles from './TemplatePreview.module.css';

const TemplatePreview = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.companyInfo}>
        <h3>Paradise Closet</h3>
        <p>Business name</p>
        <p>1 Yellowbrick Rd, Richmond VIC 3000, Australia</p>
        <p>Phone: 0123 456 789</p>
        <p>paradisecloset@myob.com</p>
        <p>paradisecloset</p>
      </div>
      <div className={styles.logo} />
      <DocumentInfo
        title="Tax invoice"
        items={[
          { name: 'Purchase order no', value: '123456789' },
          { name: 'Invoice number', value: 'IV00000195' },
          { name: 'Issue date', value: '12/09/2019' },
          { name: 'Due date', value: '12/10/2019' },
        ]}
      />
      <ShippingInfo />
    </div>
  </div>
);

export default TemplatePreview;
