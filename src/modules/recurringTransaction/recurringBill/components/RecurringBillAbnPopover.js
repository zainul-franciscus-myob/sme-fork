import { Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAbn,
  getAbnLink,
  getIsAbnLoading,
  getSupplierLink,
} from '../selectors/RecurringBillSelectors';
import AbnPopover from '../../../../components/autoFormatter/AbnInput/AbnPopover';
import styles from './RecurringBillAbnPopover.module.css';

const RecurringBillAbnPopover = ({
  abn,
  abnLink,
  supplierUrl,
  isAbnLoading,
}) => {
  const abnSpinner = (
    <div className={styles.spinner}>
      <Spinner size="small" />
    </div>
  );

  const abnPopover = abn ? (
    <AbnPopover {...abn} abnLink={abnLink} editContactUrl={supplierUrl} />
  ) : null;

  return isAbnLoading ? abnSpinner : abnPopover;
};

const mapStateToProps = (state) => ({
  isAbnLoading: getIsAbnLoading(state),
  abn: getAbn(state),
  abnLink: getAbnLink(state),
  supplierUrl: getSupplierLink(state),
});

export default connect(mapStateToProps)(RecurringBillAbnPopover);
