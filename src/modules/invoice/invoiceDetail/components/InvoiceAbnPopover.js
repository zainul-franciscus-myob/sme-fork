import { Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAbn,
  getAbnLink,
  getCustomerLink,
  getIsAbnLoading,
} from '../selectors/invoiceDetailSelectors';
import AbnPopover from '../../../../components/autoFormatter/AbnInput/AbnPopover';
import styles from './InvoiceAbnPopover.module.css';

const InvoiceAbnPopover = ({ abn, abnLink, customerUrl, isAbnLoading }) => {
  const abnSpinner = (
    <div className={styles.spinner}>
      <Spinner size="small" />
    </div>
  );

  const abnPopover = abn ? (
    <AbnPopover {...abn} abnLink={abnLink} editContactUrl={customerUrl} />
  ) : null;

  return isAbnLoading ? abnSpinner : abnPopover;
};

const mapStateToProps = (state) => ({
  isAbnLoading: getIsAbnLoading(state),
  abn: getAbn(state),
  abnLink: getAbnLink(state),
  customerUrl: getCustomerLink(state),
});

export default connect(mapStateToProps)(InvoiceAbnPopover);
