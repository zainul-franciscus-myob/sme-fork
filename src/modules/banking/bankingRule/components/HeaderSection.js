import { connect } from 'react-redux';
import React from 'react';

import {
  getBankTransactionSummaryHeader,
} from '../bankingRuleSelectors';
import SummaryHeader from '../../../../components/SummaryHeader/SummaryHeader';
import SummaryHeaderItem from '../../../../components/SummaryHeader/SummaryHeaderItem';
import styles from './HeaderSection.module.css';

const HeaderSection = ({
  summaryHeaderItems,
}) => (
  <SummaryHeader
    left={[
      <SummaryHeaderItem
        className={styles.date}
        label={summaryHeaderItems.date.label}
        value={summaryHeaderItems.date.value}
      />,
      <SummaryHeaderItem
        className={styles.account}
        label={summaryHeaderItems.account.label}
        value={summaryHeaderItems.account.value}
      />,
      <SummaryHeaderItem
        className={styles.description}
        label={summaryHeaderItems.description.label}
        value={summaryHeaderItems.description.value}
      />,
    ]}
    right={
      [
        <SummaryHeaderItem
          right
          className={styles.amount}
          label={summaryHeaderItems.amount.label}
          value={summaryHeaderItems.amount.value}
        />,
      ]
    }
  />
);

const mapStateToProps = state => ({
  summaryHeaderItems: getBankTransactionSummaryHeader(state),
});

export default connect(mapStateToProps)(HeaderSection);
