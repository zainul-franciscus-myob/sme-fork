import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import RecurringSpendMoneyView from '../RecurringSpendMoneyView';
import Store from '../../../../../store/Store';
import recurringSpendMoneyReducer from '../../RecurringSpendMoneyReducer';

describe('SpendMoneyView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(recurringSpendMoneyReducer);
    const view = (
      <Provider store={store}>
        <RecurringSpendMoneyView
          isCreating
          renderContactCombobox={() => {}}
          renderJobCombobox={() => {}}
          onUpdateHeaderOptions={() => {}}
          onSaveButtonClick={() => {}}
          onCancelButtonClick={() => {}}
          onDeleteButtonClick={() => {}}
          onCancelModal={() => {}}
          onDeleteModal={() => {}}
          onCloseModal={() => {}}
          onDismissAlert={() => {}}
          onUpdateRow={() => {}}
          onAddRow={() => {}}
          onRemoveRow={() => {}}
          onRowInputBlur={() => {}}
        />
      </Provider>
    );

    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
