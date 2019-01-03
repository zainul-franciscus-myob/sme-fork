import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import SpendMoneyDetailView from '../SpendMoneyDetailView';
import Store from '../../../../store/Store';
import spendMoneyDetailReducer from '../../spendMoneyDetailReducer';

describe('SpendMoneyView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(spendMoneyDetailReducer);
    const view = (
      <Provider store={store}>
        <SpendMoneyDetailView
          headerOptions={{}}
          onUpdateHeaderOptions={() => {}}
          onSaveButtonClick={() => {}}
          onCancelButtonClick={() => {}}
          modal={() => {}}
          alertComponent={() => {}}
          isCreating
          lines={[]}
          newLineData={{}}
          onUpdateRow={() => {}}
          onAddRow={() => {}}
          onRemoveRow={() => {}}
          onRowInputBlur={() => {}}
          indexOfLastLine={-1}
          amountTotals={{}}
        />
      </Provider>
    );


    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
