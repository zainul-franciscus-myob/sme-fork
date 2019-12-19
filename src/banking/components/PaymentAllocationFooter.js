import { connect } from 'react-redux';
import React from 'react';

import { getIsOpenEntryCreating } from '../bankingSelectors';
import { getRemainingBalance } from '../bankingSelectors/paymentAllocationSelectors';
import styles from './BankingView.module.css';

const PaymentAllocationFooter = (props) => {
  const { isCreating, remainingBalance } = props;

  return (
    isCreating ? <div className={styles.paymentFooter}>{`Remaining balance: ${remainingBalance}`}</div> : null
  );
};

const mapStateToProps = state => ({
  isCreating: getIsOpenEntryCreating(state),
  remainingBalance: getRemainingBalance(state),
});

export default connect(mapStateToProps)(PaymentAllocationFooter);
