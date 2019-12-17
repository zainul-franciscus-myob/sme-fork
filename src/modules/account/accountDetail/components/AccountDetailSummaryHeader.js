import { connect } from 'react-redux';
import React from 'react';

import {
  getCurrentBalance,
  getLinkedAccountsForDisplay,
} from '../accountDetailSelectors';
import SummaryHeader from '../../../../components/SummaryHeader/SummaryHeader';
import SummaryHeaderItem from '../../../../components/SummaryHeader/SummaryHeaderItem';

const AccountDetailActions = ({ linkedAccounts, currentBalance }) => (
  <SummaryHeader
    left={
      <SummaryHeaderItem label="Linked account for" value={linkedAccounts} />
    }
    right={
      <SummaryHeaderItem label="Current balance" value={currentBalance} right />
    }
  />
);

const mapStateToProps = state => ({
  linkedAccounts: getLinkedAccountsForDisplay(state),
  currentBalance: getCurrentBalance(state),
});

export default connect(mapStateToProps)(AccountDetailActions);
