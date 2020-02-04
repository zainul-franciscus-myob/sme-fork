import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import BankingView from '../BankingView';
import Store from '../../../../store/Store';
import bankingReducer from '../../bankingReducer';

describe('TransactionListView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(bankingReducer);

    const view = (
      <Provider store={store}>
        <BankingView
          onUpdateFilters={() => {}}
          onApplyFilter={() => {}}
          onSort={() => {}}
          onDismissAlert={() => {}}
          onAllocate={() => {}}
          onUnallocate={() => {}}
          onMatchedToBlur={() => {}}
          onMatchedToFocus={() => {}}
          onUnmatchedFocus={() => {}}
          onUnmatchedBlur={() => {}}
          onHeaderClick={() => {}}
          onTabChange={() => {}}
          onSaveSplitAllocation={() => {}}
          onCancelSplitAllocation={() => {}}
          onUnallocateSplitAllocation={() => {}}
          onUpdateSplitAllocationHeader={() => {}}
          onAddSplitAllocationLine={() => {}}
          onUpdateSplitAllocationLine={() => {}}
          onDeleteSplitAllocationLine={() => {}}
          onCancelModal={() => {}}
          onCloseModal={() => {}}
        />
      </Provider>
    );
    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
