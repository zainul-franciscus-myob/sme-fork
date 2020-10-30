import { CloudDisconnectedIcon, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBankfeedAmount } from '../selectors/DashboardBankingSelectors';
import styles from './DashboardHeader.module.css';

const BankFeedBalanceAndImage = ({ bankFeedBalance, isLoading }) => {
  const balance = bankFeedBalance ? (
    <h1>{bankFeedBalance}</h1>
  ) : (
    <CloudDisconnectedIcon />
  );

  return (
    <div className={styles.bankFeed}>
      <h2>Equity</h2>
      {isLoading ? <Spinner size="small" /> : balance}
    </div>
  );
};

const mapStateToProps = (state) => getBankfeedAmount(state);

export default connect(mapStateToProps)(BankFeedBalanceAndImage);
