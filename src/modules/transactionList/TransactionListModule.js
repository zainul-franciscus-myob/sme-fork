import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { SET_ALERT, SET_TAB } from './TransactionListIntents';
import { SUCCESSFULLY_DELETED_APPLY_TO_SALE } from '../applyToSale/ApplyToSaleMessageType';
import { SUCCESSFULLY_DELETED_BILL_PAYMENT, SUCCESSFULLY_SAVED_BILL_PAYMENT } from '../billPayment/BillPaymentMessageTypes';
import { SUCCESSFULLY_DELETED_ELECTRONIC_PAYMENT } from '../electronicPayments/electronicPaymentMesssageTypes';
import { SUCCESSFULLY_DELETED_EMPLOYEE_PAY_TRANSACTION } from '../employeePay/EmployeePayMessageTypes';
import { SUCCESSFULLY_DELETED_GENERAL_JOURNAL, SUCCESSFULLY_SAVED_GENERAL_JOURNAL } from '../generalJournal/GeneralJournalMessageTypes';
import { SUCCESSFULLY_DELETED_INVOICE_PAYMENT, SUCCESSFULLY_SAVED_INVOICE_PAYMENT } from '../invoicePayment/InvoicePaymentMessageTypes';
import { SUCCESSFULLY_DELETED_PAY_REFUND } from '../payRefund/PayRefundMessageTypes';
import { SUCCESSFULLY_DELETED_PURCHASE_RETURN } from '../supplierReturnPurchase/SupplierReturnPurchaseMessageTypes';
import { SUCCESSFULLY_DELETED_RECEIVE_MONEY, SUCCESSFULLY_SAVED_RECEIVE_MONEY } from '../receiveMoney/receiveMoneyMessageTypes';
import { SUCCESSFULLY_DELETED_RECEIVE_REFUND } from '../receiveRefund/ReceiveRefundMessageTypes';
import { SUCCESSFULLY_DELETED_SPEND_MONEY, SUCCESSFULLY_SAVED_SPEND_MONEY } from '../spendMoney/spendMoneyMessageTypes';
import { SUCCESSFULLY_DELETED_TRANSFER_MONEY, SUCCESSFULLY_SAVED_TRANSFER_MONEY } from '../transferMoney/transferMoneyMessageTypes';
import { getActiveTab } from './transactionListSelectors';
import { tabItemIds } from './tabItems';
import CreditsAndDebitsModule from './creditAndDebitTransactions/CreditsAndDebitsModule';
import JournalTransactionModule from './journalTransaction/JournalTransactionModule';
import Store from '../../store/Store';
import TransactionListView from './components/TransactionListView';
import transactionListReducer from './transactionListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_GENERAL_JOURNAL, SUCCESSFULLY_SAVED_GENERAL_JOURNAL,
  SUCCESSFULLY_DELETED_RECEIVE_MONEY, SUCCESSFULLY_SAVED_RECEIVE_MONEY,
  SUCCESSFULLY_DELETED_SPEND_MONEY, SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_TRANSFER_MONEY, SUCCESSFULLY_DELETED_TRANSFER_MONEY,
  SUCCESSFULLY_DELETED_INVOICE_PAYMENT, SUCCESSFULLY_SAVED_INVOICE_PAYMENT,
  SUCCESSFULLY_SAVED_BILL_PAYMENT, SUCCESSFULLY_DELETED_BILL_PAYMENT,
  SUCCESSFULLY_DELETED_RECEIVE_REFUND, SUCCESSFULLY_DELETED_PURCHASE_RETURN,
  SUCCESSFULLY_DELETED_PAY_REFUND, SUCCESSFULLY_DELETED_APPLY_TO_SALE,
  SUCCESSFULLY_DELETED_ELECTRONIC_PAYMENT,
  SUCCESSFULLY_DELETED_EMPLOYEE_PAY_TRANSACTION,
];

export default class TransactionListModule {
  constructor({
    integration, setRootView, popMessages, replaceURLParams,
  }) {
    this.integration = integration;
    this.store = new Store(transactionListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.replaceURLParams = replaceURLParams;
    this.subModules = {
      [tabItemIds.debitsAndCredits]: new CreditsAndDebitsModule({
        integration,
        setAlert: this.setAlert,
        store: this.store,
        replaceURLParams,
      }),
      [tabItemIds.journal]: new JournalTransactionModule({
        integration,
        setAlert: this.setAlert,
        store: this.store,
        replaceURLParams,
      }),
    };
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);
    if (successMessage) {
      const {
        content: message,
      } = successMessage;
      this.setAlert({
        type: 'success',
        message,
      });
    }
  }

  setAlert = ({ message, type }) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type,
      },
    });
  }

  setTab = (tabId) => {
    const state = this.store.getState();
    const activeTabId = getActiveTab(state);

    const filterOptions = this.subModules[activeTabId].getFilterOptions();
    this.subModules[tabId].replaceFilterOptions(filterOptions);

    this.store.dispatch({
      intent: SET_TAB,
      tabId,
    });
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <TransactionListView
          tabViews={this.subModules}
          onTabSelected={this.setTab}
          pageHeadTitle="Find transactions"
        />
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    this.setInitialState(context);
    Object.values(this.subModules).forEach(
      subModule => subModule.run(context),
    );
    this.render();
    this.readMessages();
  }

  resetState() {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }
}
