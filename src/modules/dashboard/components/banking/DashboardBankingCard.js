import { PageState, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import Icons from '@myob/myob-widgets/lib/components/Icons';
import React from 'react';

import {
  getAddBankFeedUrl,
  getBalanceDateText,
  getBankFeedAccounts,
  getBankLatestClosingBalance,
  getCurrentBalance,
  getHasError,
  getIsBankFeedAvailable,
  getIsLoading,
  getLastReconcileDate,
  getSelectedBankFeedAccount,
} from '../../selectors/DashboardBankingSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import CardView from '../../../../components/CardView/CardView';
import DashboardCardHeader from '../DashboardCardHeader';
import DashboardTotalSummary from '../DashboardTotalSummary';
import DashboardUnallocations from './DashboardBankingUnallocations';
import EmptyStatesBankFeeds from './dashboard-empty-state-bank-feeds.svg';
import ErrorCard from '../ErrorCard';
import LinkButton from '../../../../components/Button/LinkButton';
import styles from './DashboardBankingCard.module.css';

const DashboardBankingCard = ({
  onReload,
  onBankFeedAccountChange,
  onLinkClick,
  hasError,
  isLoading,
  bankFeedsAccounts,
  selectedBankFeedAccount,
  bankBalanceDateText,
  lastReconcileDate,
  isBankFeedAvailable,
  bankFeedBalance,
  ledgerBalance,
  addBankFeedUrl,
}) => {
  if (hasError) return <ErrorCard onTry={onReload} />;

  const emptyView = (
    <PageState
      title="Manage your day-to-day"
      actions={[
        <LinkButton href={addBankFeedUrl} isOpenInNewTab icon={<Icons.Add />}>
          Add bank feed
        </LinkButton>,
      ]}
      description="Automatically and securely import your bank and credit card transactions with bank feeds."
      image={<img src={EmptyStatesBankFeeds} alt="no bankfeeds" style={{ width: '50%' }} />}
    >
    </PageState>
  );

  const bankingView = (
    <div className={styles.container}>
      <DashboardCardHeader title="Manage your day-to-day" />

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
          { title: 'Bank feed balance', content: bankFeedBalance, labelAccessory: (<Tooltip>{bankBalanceDateText}</Tooltip>) },
          { title: 'Calculated balance', content: ledgerBalance },
        ]}
      />

      <DashboardUnallocations onLinkClick={onLinkClick} />
    </div>
  );

  const view = isBankFeedAvailable ? bankingView : emptyView;

  return <CardView isLoading={isLoading} view={view} />;
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
  bankBalanceDateText: getBalanceDateText(state),
  addBankFeedUrl: getAddBankFeedUrl(state),

});

export default connect(mapStateToProps)(DashboardBankingCard);
