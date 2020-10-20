import { Icons, Popover } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getArePaymentDetailsComplete,
  getIsSupplierLoading,
  getSupplierLink,
} from '../BillPaymentDetailSelectors';
import LinkButton from '../../../../components/Button/LinkButton';
import styles from './SupplierPaymentDetailsStatus.module.css';

const SupplierPaymentDetailsStatus = ({
  editSupplierUrl,
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
      <LinkButton href={editSupplierUrl} iconRight>
        Edit supplier
      </LinkButton>
    </>
  );

  const invalidStatus = (
    <Popover
      closeOnOuterAction
      body={<Popover.Body child={popoverChild} />}
      place="below"
    >
      <div className={`${styles.status} ${styles.popoverLink}`}>
        <span className={`${styles.icon} ${styles.iconInvalid}`}>
          <Icons.Warning />
        </span>

        <span className={styles.popoverLinkText}>Missing bank details</span>
      </div>
    </Popover>
  );

  const validStatus = (
    <div className={styles.statusWrapper}>
      <div className={styles.status}>
        <span className={`${styles.icon} ${styles.iconActive}`}>
          <Icons.Success />
        </span>

        <span>Valid bank details</span>
      </div>
    </div>
  );

  return arePaymentDetailsComplete ? validStatus : invalidStatus;
};

const mapStateToProps = (state) => ({
  editSupplierUrl: getSupplierLink(state),
  arePaymentDetailsComplete: getArePaymentDetailsComplete(state),
  isSupplierLoading: getIsSupplierLoading(state),
});

export default connect(mapStateToProps)(SupplierPaymentDetailsStatus);
