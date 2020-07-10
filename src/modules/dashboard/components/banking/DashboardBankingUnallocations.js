import { Button, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankingLink,
  getUnallocatedTransactionsTotal,
} from '../../selectors/DashboardBankingSelectors';
import foldersImage from '../folders-papers.svg';
import styles from './DashboardBankingUnallocations.module.css';

const handleLinkClick = (handler, link) => () => {
  handler(link);
};

const DashboardUnallocations = ({ count, bankingLink, onLinkClick }) => (
  <div className={styles.container}>
    <img src={foldersImage} alt="" />
    <div>
      <h4 className={styles.title}>Unallocated transactions</h4>
      <h1 className={styles.transactionCount}>{count}</h1>
      <Button
        type="link"
        icon={<Icons.ArrowRight />}
        onClick={handleLinkClick(onLinkClick, bankingLink)}
      >
        Allocate transactions
      </Button>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  count: getUnallocatedTransactionsTotal(state),
  bankingLink: getBankingLink(state),
});

export default connect(mapStateToProps)(DashboardUnallocations);
