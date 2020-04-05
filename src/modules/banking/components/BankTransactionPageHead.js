import {
  Button, Icons, PageHead, Tooltip, TotalsHeader,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankAccount, getBankAccounts, getDisplayBalances,
} from '../bankingSelectors';
import { getBankReconciliationUrl } from '../bankingSelectors/redirectSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import LinkButton from '../../../components/Button/LinkButton';
import styles from './BankTransactionPageHead.module.css';

const onComboBoxChange = onBankAccountChange => (item) => {
  const { id } = item;
  onBankAccountChange({ value: id });
};

const BankTransactionPageHead = ({
  bankReconciliationUrl,
  bankAccount,
  bankAccounts,
  balances: {
    bankBalance,
    myobBalance,
    unallocated,
    balanceTooltip,
  },
  onBankAccountChange,
  onImportStatementButtonClick,
}) => {
  const totalItems = [
    <Tooltip>{balanceTooltip}</Tooltip>,
    <TotalsHeader.TotalItem
      key="bank-feed-balance"
      label="Bank feed balance"
      count={bankBalance}
    />,
    <TotalsHeader.TotalItem
      key="calculated-balance"
      label="Calculated balance"
      count={myobBalance}
    />,
    <TotalsHeader.TotalItem
      key="out-of-balance"
      label="Out of balance"
      count={unallocated}
    />,
  ];

  const actions = [
    <AccountCombobox
      items={bankAccounts}
      selectedId={bankAccount}
      onChange={onComboBoxChange(onBankAccountChange)}
      label="Bank account"
      hideLabel={false}
    />,
    <LinkButton
      className={styles.reconcileLink}
      href={bankReconciliationUrl}
      icon={<Icons.Compliance />}
    >
      Reconcile
    </LinkButton>,
  ];

  return (
    <div className={styles.pageHead}>
      <PageHead title="Bank transactions">
        <Button type="secondary" onClick={onImportStatementButtonClick}>Import statement</Button>
      </PageHead>
      <TotalsHeader
        actions={actions}
        totalItems={totalItems}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  bankAccount: getBankAccount(state),
  bankAccounts: getBankAccounts(state),
  balances: getDisplayBalances(state),
  bankReconciliationUrl: getBankReconciliationUrl(state),
});

export default connect(mapStateToProps)(BankTransactionPageHead);
