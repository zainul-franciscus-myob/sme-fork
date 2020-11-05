import { Button, Icons, Popover } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getArePaymentDetailsComplete } from '../selectors/BillRecordPaymentSelectors';
import styles from './SupplierPaymentDetailsStatus.module.css';

const SupplierPaymentDetailsStatus = ({
  onEditSupplierClick,
  arePaymentDetailsComplete,
}) => {
  const popoverChild = (
    <>
      <div>
        Supplier bank details are required to
        <br />
        record an electronic payment
      </div>
      <br />
      <Button type="link" onClick={onEditSupplierClick}>
        Edit supplier
      </Button>
    </>
  );

  const invalidStatus = (
    <Popover
      appendTarget=".payment-modal"
      closeOnOuterAction
      body={<Popover.Body child={popoverChild} />}
      place="below"
    >
      <div className={`${styles.status} ${styles.popoverLink}`}>
        <span className={`${styles.icon} ${styles.iconInvalid}`}>
          <Icons.Warning />
        </span>

        <span className={styles.popoverLinkText}>
          Missing supplier bank details
        </span>
      </div>
    </Popover>
  );

  const validStatus = (
    <div>
      <div className={styles.status}>
        <span className={`${styles.icon} ${styles.iconActive}`}>
          <Icons.Success />
        </span>

        <span>Valid supplier bank details</span>
      </div>
    </div>
  );

  return arePaymentDetailsComplete ? validStatus : invalidStatus;
};

const mapStateToProps = (state) => ({
  arePaymentDetailsComplete: getArePaymentDetailsComplete(state),
});

export default connect(mapStateToProps)(SupplierPaymentDetailsStatus);
