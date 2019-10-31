import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import PayItemListView from '../components/PayItemListView';
import Store from '../../../store/Store';
import payItemListReducer from '../payItemListReducer';

describe('PayItemListView', () => {
  const props = {
    listeners: {
      onTabSelected: () => {},
      onSortWagesList: () => {},
      onSortSuperannuationList: () => {},
      onSortLeaveList: () => {},
      onSortDeductionsList: () => {},
      onSortExpensesList: () => {},
      onDismissAlert: () => {},
      onCreatePayItemButtonClick: () => {},
      onSaveTaxPayItemButtonClick: () => {},
      onTaxDetailChange: () => {},
    },
  };

  it('renders when no modal', () => {
    const div = document.createElement('div');
    const store = new Store(payItemListReducer);

    const view = (
      <Provider store={store}>
        <PayItemListView
          {...props}
        />
      </Provider>
    );

    ReactDOM.render(view, div);

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders when modal', () => {
    const div = document.createElement('div');
    const store = new Store(payItemListReducer);
    const modifiedProps = {
      ...props,
      modal: { type: 'UNSAVED', url: '' },
    };
    const view = (
      <Provider store={store}>
        <PayItemListView
          {...modifiedProps}
        />
      </Provider>
    );

    ReactDOM.render(view, div);

    ReactDOM.unmountComponentAtNode(div);
  });
});
