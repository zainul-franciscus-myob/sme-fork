import React from 'react';
import BankingView from './BankingView';
import BankingReducer from './BankingReducer';
import Store from '../store/Store';
import { LOAD_TRANSACTIONS_AND_ACCOUNTS, ALLOCATE_ACCOUNT_FOR_TRANSACTION } from './BankingIntents';
import BankingTableRowView from "./BankingTableRowView";
import EmptyBankingRowView from "./EmptyBankingRowView";

export default class BankingModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(BankingReducer);
    this.setRootView = setRootView;
  }

  render = (state) => {
    const hasTransactionsToDisplay = state.transactions.length > 0;

    const renderBankTransactions = tableConfig => (
      <BankingTableRowView
        tableConfig={tableConfig}
        transactions={state.transactions}
        accounts={state.accounts}
        onAllocate={this.handleAllocate}
      />
    );

    const renderNoTransactions = () => <EmptyBankingRowView />;

    const renderRows = hasTransactionsToDisplay
      ? renderBankTransactions
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
          allocatedTransaction: allocatedTransaction.transaction
        })
      },
      () => console.error('Failure')
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
          accounts
        })
      },
      (error) => console.error(error)
    );
  }
}
