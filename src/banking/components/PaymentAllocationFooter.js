import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getIsOpenEntryCreating } from '../bankingSelectors';
import { getRemainingBalance } from '../bankingSelectors/paymentAllocationSelectors';
import style from './BankingView.css';

const PaymentAllocationFooter = (props) => {
  const { isCreating, remainingBalance } = props;

  return (
    isCreating ? <div className={style.paymentFooter}>{`Remaining balance: ${remainingBalance}`}</div> : null
  );
};

PaymentAllocationFooter.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  remainingBalance: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isCreating: getIsOpenEntryCreating(state),
  remainingBalance: getRemainingBalance(state),
});

export default connect(mapStateToProps)(PaymentAllocationFooter);
