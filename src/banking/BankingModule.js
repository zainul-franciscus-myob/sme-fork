import React from 'react';
import ReactDOM from 'react-dom';
import BankingView from './BankingView';
import BankingReducer from './BankingReducer';
import Store from '../store/Store';
import { LOAD_TRANSACTIONS } from './BankingIntents';
import BankingTableRowView from "./BankingTableRowView";
import EmptyBankingRowView from "./EmptyBankingRowView";

export default class BankingModule {
  constructor(integration, domElement) {
    this.integration = integration;
    this.store = new Store(BankingReducer);
    this.domElement = domElement;
  }

  render = (state) => {
    const hasTransactionsToDisplay = state.transactions.length > 0;

    const tableRowComponent = hasTransactionsToDisplay
      ? (tableConfig) => <BankingTableRowView tableConfig={tableConfig} transactions={state.transactions}/>
      : () => <EmptyBankingRowView/>;
    ReactDOM.render(<BankingView renderRows={tableRowComponent}/>, this.domElement);
  };

  run() {
    ReactDOM.render(<p>Loading...</p>, this.domElement);
    this.store.subscribe(this.render);
    this.integration.read(
      LOAD_TRANSACTIONS,
      ({ transactions }) => {
        this.store.publish({
          intent: LOAD_TRANSACTIONS,
          transactions
        })
      },
      (error) => console.error(error)
    );
  }
}
