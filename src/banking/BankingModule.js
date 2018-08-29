import React from 'react';

import { ALLOCATE_ACCOUNT_FOR_TRANSACTION, LOAD_TRANSACTIONS_AND_ACCOUNTS } from './BankingIntents';
import BankingReducer from './BankingReducer';
import BankingTableRowView from './BankingTableRowView';
import BankingView from './BankingView';
import EmptyBankingRowView from './EmptyBankingRowView';
import Store from '../store/Store';

export default class BankingModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(BankingReducer);
    this.setRootView = setRootView;
  }

  renderBankTransactions = ({ state, onAllocate }) => tableConfig => (
    <BankingTableRowView
      tableConfig={tableConfig}
      transactions={state.transactions}
      accounts={state.accounts}
      onAllocate={onAllocate}
    />
  );

  render = (state) => {
    const hasTransactionsToDisplay = state.transactions.length > 0;

    const renderNoTransactions = () => <EmptyBankingRowView />;

    const renderRows = hasTransactionsToDisplay
      ? this.renderBankTransactions({ state, onAllocate: this.handleAllocate })
      : renderNoTransactions;

    this.setRootView(<BankingView renderRows={renderRows} />);
  };

  handleAllocate = (transaction, account) => {
    this.integration.write(
      ALLOCATE_ACCOUNT_FOR_TRANSACTION,
      { transaction, accountId: account.id },
      (allocatedTransaction) => {
        this.store.publish({
          intent: ALLOCATE_ACCOUNT_FOR_TRANSACTION,
          allocatedTransaction: allocatedTransaction.transaction,
        });
      },
      () => console.error('Failure'),
    );
  };

  run = () => {
    this.store.subscribe(this.render);
    this.integration.read(
      LOAD_TRANSACTIONS_AND_ACCOUNTS,
      ({ transactions, accounts }) => {
        this.store.publish({
          intent: LOAD_TRANSACTIONS_AND_ACCOUNTS,
          transactions,
          accounts,
        });
      },
      error => console.error(error),
    );
  }
}
