import { ArrowRightIcon } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankingLink,
  getUnallocatedTransactionsTotal,
} from '../../selectors/DashboardBankingSelectors';
import LinkButton from '../../../../components/Button/LinkButton';
import foldersImage from '../folders-papers.svg';
import styles from './DashboardBankingUnallocations.module.css';

const DashboardUnallocations = ({ count, bankingLink }) => (
  <div className={styles.container}>
    <img src={foldersImage} alt="" />
    <div>
      <h4 className={styles.title}>Unallocated transactions</h4>
      <h1 className={styles.transactionCount}>{count}</h1>
      <LinkButton icon={<ArrowRightIcon />} href={bankingLink}>
        Allocate transactions
      </LinkButton>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  count: getUnallocatedTransactionsTotal(state),
  bankingLink: getBankingLink(state),
});

export default connect(mapStateToProps)(DashboardUnallocations);
