import React from 'react';

import BankingIntents from './BankingIntents';
import BankingTableRow from './components/BankingTableRow';
import BankingTransactionsView from './components/BankingTransactionsView';
import EmptyBankingRow from './components/EmptyBankingRow';
import Store from '../store/Store';
import bankingReducer from './bankingReducer';

export default class BankingModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(bankingReducer);
    this.setRootView = setRootView;
  }

  renderBankTransactions = ({ state, onAllocate }) => tableConfig => (
    <BankingTableRow
      tableConfig={tableConfig}
      transactions={state.transactions}
      accounts={state.accounts}
      onAllocate={onAllocate}
    />
  );

  render = (state) => {
    const hasTransactionsToDisplay = state.transactions.length > 0;

    const renderNoTransactions = () => <EmptyBankingRow />;

    const renderRows = hasTransactionsToDisplay
      ? this.renderBankTransactions({ state, onAllocate: this.handleAllocate })
      : renderNoTransactions;

    this.setRootView(<BankingTransactionsView renderRows={renderRows} />);
  };

  allocateAccountForTransaction = (transaction, account) => {
    const intent = BankingIntents.ALLOCATE_ACCOUNT_FOR_TRANSACTION;

    const onSuccess = (allocatedTransaction) => {
      this.store.publish({
        intent,
        allocatedTransaction: allocatedTransaction.transaction,
      });
    };

    const onFailure = () => console.error('Failure');

    this.integration.write({
      intent,
      params: { transaction, accountId: account.id },
      onSuccess,
      onFailure,
    });
  };

  loadTransactionsAndAccounts = () => {
    const intent = BankingIntents.LOAD_TRANSACTIONS_AND_ACCOUNTS;

    const onSuccess = ({ transactions, accounts }) => {
      this.store.publish({
        intent,
        transactions,
        accounts,
      });
    };

    const onFailure = (error) => {
      console.log(error);
    };

    this.integration.read({
      intent,
      onSuccess,
      onFailure,
    });
  };

  run = () => {
    this.store.subscribe(this.render);
    this.loadTransactionsAndAccounts();
  }
}
