import {
  PageHead, PageState, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankBalanceDate,
  getBankFeedAccounts,
  getBankLatestClosingBalance,
  getCurrentBalance,
  getHasError,
  getIsBankFeedAvailable,
  getIsLoading,
  getLastReconcileDate,
  getSelectedBankFeedAccount,
} from '../../selectors/DashboardBankingSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import CardView from '../../../components/CardView/CardView';
import DashboardTotalSummary from '../DashboardTotalSummary';
import DashboardUnallocations from './DashboardBankingUnallocations';
import ErrorCard from '../ErrorCard';
import styles from './DashboardBankingCard.module.css';

const DashboardBankingCard = ({
  onReload,
  onBankFeedAccountChange,
  onLinkClick,
  hasError,
  isLoading,
  bankFeedsAccounts,
  selectedBankFeedAccount,
  bankBalanceDate,
  lastReconcileDate,
  isBankFeedAvailable,
  bankFeedBalance,
  ledgerBalance,
}) => {
  if (hasError) return <ErrorCard onTry={onReload} />;

  const tooltipText = `Closing account balance as of ${bankBalanceDate}`;

  const emptyView = (
    <PageState
      title="Manage your day-to-day"
      description="Automatically and securely import your bank and credit card transactions with bank feeds."
    />
  );

  const bankingView = (
    <div className={styles.container}>
      <PageHead title="Manage your day-to-day" />
      <hr />
      <AccountCombobox
        label="Bank account"
        items={bankFeedsAccounts}
        selectedId={selectedBankFeedAccount}
        onChange={onBankFeedAccountChange}
      />
      <div>
        Last reconciled
        <span className={styles.reconcileDate}>{lastReconcileDate}</span>
      </div>
      <DashboardTotalSummary
        className={styles.balances}
        items={[
          { title: 'Bank feed balance', content: bankFeedBalance, labelAccessory: (<Tooltip>{tooltipText}</Tooltip>) },
          { title: 'Ledger balance', content: ledgerBalance },
        ]}
      />
      <DashboardUnallocations onLinkClick={onLinkClick} />
    </div>
  );

  const view = isBankFeedAvailable ? bankingView : emptyView;

  return (
    <CardView isLoading={isLoading} view={view} />
  );
};

const mapStateToProps = state => ({
  hasError: getHasError(state),
  isLoading: getIsLoading(state),
  isBankFeedAvailable: getIsBankFeedAvailable(state),
  bankFeedsAccounts: getBankFeedAccounts(state),
  selectedBankFeedAccount: getSelectedBankFeedAccount(state),
  lastReconcileDate: getLastReconcileDate(state),
  bankFeedBalance: getBankLatestClosingBalance(state),
  ledgerBalance: getCurrentBalance(state),
  bankBalanceDate: getBankBalanceDate(state),
});

export default connect(mapStateToProps)(DashboardBankingCard);
