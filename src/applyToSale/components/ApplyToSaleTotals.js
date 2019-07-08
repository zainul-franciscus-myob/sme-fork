import { connect } from 'react-redux';
import React from 'react';

import { getTotalAmountApplied } from '../applyToSaleSelectors';
import styles from './ApplyToSaleTotals.css';

const ApplyToSaleTotals = ({ totalAmountApplied }) => (
  <div className={styles.totalAmountApplied}>
    {`Total Amount Applied: ${totalAmountApplied}`}
  </div>
);

const mapStateToProps = state => ({
  totalAmountApplied: getTotalAmountApplied(state),
});

export default connect(mapStateToProps)(ApplyToSaleTotals);
